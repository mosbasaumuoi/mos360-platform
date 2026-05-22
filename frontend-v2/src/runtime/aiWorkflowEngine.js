// ============================================
// MOS360 AI WORKFLOW ENGINE
// AI-assisted semantic content workflows
// ============================================

import {

    createLessonDraft,

    addTextBlock,

    addWorkflowBlock,

    addPracticeBlock,

    addCheckpointBlock

}
    from "./semanticAuthoringEngine.js";

import {

    validateAILesson,

    sanitizeAILesson

}
    from "./aiSafetyEngine.js";

// ============================================
// GENERATE LESSON SCAFFOLD
// ============================================

export function generateLessonScaffold({

    id = "",
    title = "",
    description = ""

} = {}) {

    let lesson =

        createLessonDraft({

            id,
            title,
            description
        });

    // ========================================
    // INTRODUCTION
    // ========================================

    lesson = addTextBlock({

        lesson,

        content: `

<h2>

    ${title}

</h2>

<p>

    ${description}

</p>

        `
    });

    // ========================================
    // WORKFLOW
    // ========================================

    lesson = addWorkflowBlock({

        lesson,

        title:
            "Workflow thực hành",

        steps: [

            "Làm quen workflow",

            "Thực hành thao tác chính",

            "Áp dụng vào tình huống thực tế"
        ]
    });

    // ========================================
    // PRACTICE
    // ========================================

    lesson = addPracticeBlock({

        lesson,

        title:
            "Áp dụng ngay",

        content:
            "Thực hành trực tiếp để củng cố workflow và kỹ năng."
    });

    // ========================================
    // CONTINUITY
    // ========================================

    lesson = addCheckpointBlock({

        lesson,

        title:
            "Tiếp tục duy trì momentum học tập",

        message:
            "Kỹ năng được xây dựng tốt nhất thông qua luyện tập đều đặn từng bước nhỏ."
    });

    // ========================================
    // SAFETY
    // ========================================

    lesson = sanitizeAILesson(
        lesson
    );

    return lesson;
}

// ============================================
// GENERATE WORKFLOW-FIRST LESSON
// ============================================

export function generateWorkflowLesson({

    id = "",
    title = "",
    workflowSteps = []

} = {}) {

    let lesson =

        createLessonDraft({

            id,
            title
        });

    lesson = addWorkflowBlock({

        lesson,

        title:
            "Workflow thực hành",

        steps:
            workflowSteps
    });

    lesson = addPracticeBlock({

        lesson,

        title:
            "Áp dụng workflow",

        content:
            "Thực hành toàn bộ workflow để hình thành kỹ năng thực tế."
    });

    lesson = addCheckpointBlock({

        lesson,

        title:
            "Hoàn thành thêm một bước thực hành",

        message:
            "Workflow rõ ràng sẽ giúp bạn xây dựng kỹ năng nhanh và ổn định hơn."
    });

    return sanitizeAILesson(
        lesson
    );
}

// ============================================
// VALIDATE AI WORKFLOW
// ============================================

export function validateAIWorkflow({

    lesson = {}

}) {

    return validateAILesson(
        lesson
    );
}

// ============================================
// GENERATE AI WORKFLOW REPORT
// ============================================

export function generateAIWorkflowReport({

    lesson = {}

}) {

    const validation =

        validateAIWorkflow({
            lesson
        });

    return {

        lessonId:
            lesson.id,

        valid:
            validation.valid,

        issues:
            validation.issues,

        totalBlocks:
            lesson.blocks
                ?.length || 0,

        aiReady:
            validation.valid
    };
}