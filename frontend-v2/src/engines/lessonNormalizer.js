// ============================================
// LESSON NORMALIZER
// Semantic cinematic runtime
// ============================================

// ============================================
// CREATE VIDEO BLOCK
// ============================================

function createVideoBlock(
    lesson
) {

    const resources =
        lesson.resources || [];

    const video =

        resources.find(

            resource =>

                resource.type === "video"
        );

    if (!video) {
        return null;
    }

    return {

        type:
            "video",

        priority:
            "critical",

        title:
            video.title ||

            lesson.title,

        videoUrl:
            video.url
    };
}

// ============================================
// CREATE TEXT BLOCK
// ============================================

function createTextBlock(
    lesson
) {

    if (

        !lesson.content
        &&
        !lesson.description

    ) {

        return null;
    }

    return {

        type:
            "text",

        priority:
            "primary",

        content:

            lesson.content ||

            `

<h2>

    ${lesson.title}

</h2>

<p>

    ${lesson.description || ""}

</p>

            `
    };
}

// ============================================
// CREATE WORKFLOW BLOCK
// ============================================

function createWorkflowBlock(
    lesson
) {

    if (

        !Array.isArray(
            lesson.workflowSteps
        )

        ||

        !lesson.workflowSteps.length

    ) {

        return null;
    }

    return {

        type:
            "workflow",

        priority:
            "primary",

        title:
            "Workflow thực hành",

        steps:
            lesson.workflowSteps
    };
}

// ============================================
// CREATE CALLOUT BLOCKS
// ============================================

function createCalloutBlocks(
    lesson
) {

    if (

        !Array.isArray(
            lesson.tips
        )

        ||

        !lesson.tips.length

    ) {

        return [];
    }

    return lesson.tips.map(

        tip => ({

            type:
                "callout",

            priority:
                "secondary",

            variant:
                "tip",

            title:
                "Mẹo thực hành",

            content:
                tip
        })
    );
}

// ============================================
// CREATE PRACTICE BLOCK
// ============================================

function createPracticeBlock(
    lesson
) {

    if (

        !lesson.practicalContent

        &&

        !(

            Array.isArray(
                lesson.practicalNotes
            )

            &&

            lesson.practicalNotes.length
        )

    ) {

        return null;
    }

    return {

        type:
            "practice",

        priority:
            "primary",

        title:
            "Áp dụng ngay",

        content:

            lesson.practicalContent ||

            lesson.practicalNotes.join(
                "<br>"
            )
    };
}

// ============================================
// CREATE RESOURCE BLOCK
// ============================================

function createResourceBlock(
    lesson
) {

    if (

        !Array.isArray(
            lesson.resources
        )

        ||

        !lesson.resources.length

    ) {

        return null;
    }

    const nonVideoResources =

        lesson.resources.filter(

            resource =>

                resource.type !== "video"
        );

    if (

        !nonVideoResources.length

    ) {

        return null;
    }

    return {

        type:
            "resource",

        priority:
            "optional",

        resources:
            nonVideoResources
    };
}

// ============================================
// CREATE CONTINUITY BLOCK
// ============================================

function createContinuityBlock(

    lesson = {}

) {

    // ========================================
    // PRACTICE HEAVY
    // ========================================

    if (

        lesson.practicalContent
        ||

        (
            Array.isArray(
                lesson.practicalNotes
            )
            &&
            lesson.practicalNotes.length
        )

    ) {

        return {

            type:
                "checkpoint",

            priority:
                "reinforcement",

            title:
                "Hoàn thành thêm một bước thực hành",

            message:
                "Kỹ năng Office được xây dựng tốt nhất thông qua luyện tập đều đặn từng bước nhỏ."
        };
    }

    // ========================================
    // WORKFLOW HEAVY
    // ========================================

    if (

        Array.isArray(
            lesson.workflowSteps
        )

        &&

        lesson.workflowSteps.length >= 4

    ) {

        return {

            type:
                "checkpoint",

            priority:
                "reinforcement",

            title:
                "Tiếp tục duy trì workflow học tập",

            message:
                "Workflow rõ ràng sẽ giúp bạn hình thành kỹ năng nhanh và ổn định hơn."
        };
    }

    // ========================================
    // DEFAULT
    // ========================================

    return {

        type:
            "checkpoint",

        priority:
            "reinforcement",

        title:
            "Tiếp tục duy trì momentum học tập",

        message:
            "Chỉ cần học tập đều đặn mỗi ngày, kỹ năng sẽ phát triển tự nhiên theo thời gian."
    };
}

// ============================================
// CREATE SEMANTIC BLOCKS
// ============================================

function createSemanticBlocks(
    lesson
) {

    const blocks = [];

    // ========================================
    // VIDEO
    // ========================================

    const videoBlock =
        createVideoBlock(
            lesson
        );

    if (videoBlock) {

        blocks.push(
            videoBlock
        );
    }

    // ========================================
    // TEXT
    // ========================================

    const textBlock =
        createTextBlock(
            lesson
        );

    if (textBlock) {

        blocks.push(
            textBlock
        );
    }

    // ========================================
    // WORKFLOW
    // ========================================

    const workflowBlock =
        createWorkflowBlock(
            lesson
        );

    if (workflowBlock) {

        blocks.push(
            workflowBlock
        );
    }

    // ========================================
    // CALLOUTS
    // ========================================

    blocks.push(

        ...createCalloutBlocks(
            lesson
        )
    );

    // ========================================
    // PRACTICE
    // ========================================

    const practiceBlock =
        createPracticeBlock(
            lesson
        );

    if (practiceBlock) {

        blocks.push(
            practiceBlock
        );
    }

    // ========================================
    // RESOURCE
    // ========================================

    const resourceBlock =
        createResourceBlock(
            lesson
        );

    if (resourceBlock) {

        blocks.push(
            resourceBlock
        );
    }

    // ========================================
    // CONTINUITY
    // ========================================

    blocks.push(
        createContinuityBlock(
            lesson
        )
    );

    return blocks;
}

// ============================================
// NORMALIZE LESSON
// ============================================

export function normalizeLesson(
    lesson = {}
) {

    // ========================================
    // BLOCK-NATIVE
    // ========================================

    if (

        Array.isArray(
            lesson.blocks
        )

        &&

        lesson.blocks.length

    ) {

        return lesson;
    }

    // ========================================
    // LEGACY → CANONICAL
    // ========================================

    return {

        ...lesson,

        blocks:
            createSemanticBlocks(
                lesson
            )
    };
}