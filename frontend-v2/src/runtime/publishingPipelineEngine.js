// ============================================
// MOS360 PUBLISHING PIPELINE ENGINE
// Enterprise semantic publishing runtime
// ============================================

import {

    validateAILesson

}
    from "./aiSafetyEngine.js";

import {

    generateRuntimeReport

}
    from "./runtimeIntegrityEngine.js";

import {

    previewComposition

}
    from "./semanticComposerEngine.js";

import {

    publishCMSEntity

}
    from "./cmsRuntimeEngine.js";

// ============================================
// VALIDATE PUBLISHING
// ============================================

export function validatePublishingPipeline(

    entity = {}

) {

    const issues = [];
    const warnings = [];

    // ========================================
    // AI SAFETY
    // ========================================

    const aiValidation =

        validateAILesson(
            entity
        );

    if (!aiValidation.valid) {

        issues.push(

            ...aiValidation.issues
        );
    }

    // ========================================
    // RUNTIME REPORT
    // ========================================

    const runtimeReport =

        generateRuntimeReport(
            entity
        );

    if (!runtimeReport.valid) {

        issues.push(

            ...runtimeReport.issues
        );
    }

    warnings.push(

        ...(runtimeReport.warnings || [])
    );

    // ========================================
    // COMPOSITION PREVIEW
    // ========================================

    const preview =

        previewComposition(
            entity
        );

    if (

        !preview.previewBlocks
            ?.length

    ) {

        issues.push(
            "empty_preview_runtime"
        );
    }

    // ========================================
    // RESULT
    // ========================================

    return {

        valid:
            issues.length === 0,

        issues,

        warnings
    };
}

// ============================================
// PUBLISH ENTITY SAFELY
// ============================================

export function publishEntitySafely({

    entity = {}

}) {

    const validation =

        validatePublishingPipeline(
            entity
        );

    // ========================================
    // BLOCK PUBLISH
    // ========================================

    if (!validation.valid) {

        return {

            success:
                false,

            published:
                false,

            validation
        };
    }

    // ========================================
    // SAFE PUBLISH
    // ========================================

    const publishedEntity =

        publishCMSEntity({

            entity
        });

    return {

        success:
            true,

        published:
            true,

        validation,

        entity:
            publishedEntity
    };
}

// ============================================
// GENERATE PUBLISH REPORT
// ============================================

export function generatePublishReport({

    entity = {}

}) {

    const validation =

        validatePublishingPipeline(
            entity
        );

    return {

        lessonId:
            entity.id,

        publishReady:
            validation.valid,

        issueCount:
            validation.issues.length,

        warningCount:
            validation.warnings.length,

        issues:
            validation.issues,

        warnings:
            validation.warnings
    };
}