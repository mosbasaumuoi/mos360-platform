// ============================================
// MOS360 RELEASE RUNTIME ENGINE
// Evolution-safe semantic publishing runtime
// ============================================

import {

    generatePublishReport,

    publishEntitySafely

}
    from "./publishingPipelineEngine.js";

// ============================================
// CREATE RELEASE SNAPSHOT
// ============================================

export function createReleaseSnapshot({

    entity = {}

}) {

    return {

        snapshotId:

            `snapshot_${Date.now()}`,

        lessonId:
            entity.id,

        createdAt:
            Date.now(),

        version:
            entity.cms?.version || 1,

        state:
            entity.cms?.state || "draft",

        entity
    };
}

// ============================================
// VALIDATE RELEASE
// ============================================

export function validateRelease({

    entity = {}

}) {

    const publishReport =

        generatePublishReport({
            entity
        });

    return {

        valid:
            publishReport.publishReady,

        issues:
            publishReport.issues,

        warnings:
            publishReport.warnings
    };
}

// ============================================
// RELEASE ENTITY
// ============================================

export function releaseEntity({

    entity = {}

}) {

    // ========================================
    // VALIDATION
    // ========================================

    const validation =

        validateRelease({
            entity
        });

    // ========================================
    // BLOCK RELEASE
    // ========================================

    if (!validation.valid) {

        return {

            released:
                false,

            validation
        };
    }

    // ========================================
    // SNAPSHOT
    // ========================================

    const snapshot =

        createReleaseSnapshot({
            entity
        });

    // ========================================
    // PUBLISH
    // ========================================

    const publishResult =

        publishEntitySafely({
            entity
        });

    return {

        released:
            publishResult.success,

        snapshot,

        entity:
            publishResult.entity,

        validation
    };
}

// ============================================
// GENERATE RELEASE REPORT
// ============================================

export function generateReleaseReport({

    entity = {}

}) {

    const validation =

        validateRelease({
            entity
        });

    return {

        lessonId:
            entity.id,

        releaseReady:
            validation.valid,

        issues:
            validation.issues,

        warnings:
            validation.warnings,

        generatedAt:
            Date.now()
    };
}

// ============================================
// ROLLBACK SNAPSHOT
// ============================================

export function rollbackSnapshot({

    snapshot = {}

}) {

    return snapshot.entity || null;
}