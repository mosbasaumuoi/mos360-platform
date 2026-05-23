// ============================================
// BLOCK PRESETS
// Canonical semantic lesson blocks
// ============================================

// ============================================
// TEXT BLOCK
// ============================================

export function createTextBlock({

    title = "",

    content = "",

    priority = "primary"

}) {

    return {

        type:
            "text",

        priority,

        content:

            `

            <h2>

                ${title}

            </h2>

            <p>

                ${content}

            </p>

            `
    };
}

// ============================================
// WORKFLOW BLOCK
// ============================================

export function createWorkflowBlock({

    title = "Workflow thực hành",

    steps = [],

    priority = "primary"

}) {

    return {

        type:
            "workflow",

        priority,

        title,

        steps
    };
}

// ============================================
// CALLOUT BLOCK
// ============================================

export function createTipsBlock({

    title = "Mẹo thực hành",

    items = [],

    priority = "secondary"

}) {

    return {

        type:
            "callout",

        priority,

        variant:
            "tip",

        title,

        content:

            items.join("<br>")
    };
}

// ============================================
// PRACTICE BLOCK
// ============================================

export function createPracticalBlock({

    content = "",

    priority = "secondary"

}) {

    return {

        type:
            "practice",

        priority,

        title:
            "Áp dụng ngay",

        tasks:

            content

                .split("\n")

                .filter(Boolean)
    };
}

// ============================================
// CHECKPOINT BLOCK
// ============================================

export function createCheckpointBlock({

    title = "Checkpoint",

    message = "",

    priority = "reinforcement"

}) {

    return {

        type:
            "checkpoint",

        priority,

        title,

        content:
            message
    };
}

// ============================================
// REINFORCEMENT BLOCK
// ============================================

export function createReinforcementBlock({

    title = "Củng cố workflow",

    points = [],

    priority = "reinforcement"

}) {

    return {

        type:
            "reinforcement",

        priority,

        title,

        points
    };
}

// ============================================
// QUIZ BLOCK
// ============================================

export function createQuizBlock({

    question = "",

    options = [],

    correctAnswer = 0

}) {

    return {

        question,

        options,

        correctAnswer
    };
}

// ============================================
// RESOURCE BLOCK
// ============================================

export function createResourceBlock({

    resources = [],

    priority = "primary"

}) {

    return {

        type:
            "resource",

        priority,

        resources
    };
}