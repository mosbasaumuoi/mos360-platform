// ============================================
// BLOCK PRESETS
// Reusable semantic lesson blocks
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
// TIPS BLOCK
// ============================================

export function createTipsBlock({

    title = "Mẹo thực hành",

    items = [],

    priority = "secondary"

}) {

    return {

        type:
            "tips",

        priority,

        title,

        items
    };
}

// ============================================
// PRACTICAL BLOCK
// ============================================

export function createPracticalBlock({

    content = "",

    priority = "secondary"

}) {

    return {

        type:
            "practical",

        priority,

        content
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