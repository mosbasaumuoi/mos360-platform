// ============================================
// MOS360 AUTHORING TEMPLATES
// AI-assisted semantic lesson authoring
// ============================================

// ============================================
// VIDEO TEMPLATE
// ============================================

export function createVideoTemplate({

    title = "",
    videoUrl = ""

} = {}) {

    return {

        type:
            "video",

        priority:
            "critical",

        title,

        videoUrl
    };
}

// ============================================
// TEXT TEMPLATE
// ============================================

export function createTextTemplate({

    content = ""

} = {}) {

    return {

        type:
            "text",

        priority:
            "primary",

        content
    };
}

// ============================================
// WORKFLOW TEMPLATE
// ============================================

export function createWorkflowTemplate({

    title = "Workflow thực hành",
    steps = []

} = {}) {

    return {

        type:
            "workflow",

        priority:
            "primary",

        title,

        steps
    };
}

// ============================================
// CALLOUT TEMPLATE
// ============================================

export function createCalloutTemplate({

    variant = "tip",
    title = "",
    content = ""

} = {}) {

    return {

        type:
            "callout",

        priority:
            "secondary",

        variant,

        title,

        content
    };
}

// ============================================
// PRACTICE TEMPLATE
// ============================================

export function createPracticeTemplate({

    title = "Áp dụng ngay",
    content = ""

} = {}) {

    return {

        type:
            "practice",

        priority:
            "primary",

        title,

        content
    };
}

// ============================================
// RESOURCE TEMPLATE
// ============================================

export function createResourceTemplate({

    resources = []

} = {}) {

    return {

        type:
            "resource",

        priority:
            "optional",

        resources
    };
}

// ============================================
// CHECKPOINT TEMPLATE
// ============================================

export function createCheckpointTemplate({

    title =
    "Tiếp tục duy trì momentum học tập",

    message =
    "Kỹ năng được xây dựng tốt nhất thông qua luyện tập đều đặn."

} = {}) {

    return {

        type:
            "checkpoint",

        priority:
            "reinforcement",

        title,

        message
    };
}

// ============================================
// LESSON TEMPLATE
// ============================================

export function createLessonTemplate({

    id = "",
    title = "",
    description = "",
    blocks = []

} = {}) {

    return {

        id,

        title,

        description,

        blocks
    };
}