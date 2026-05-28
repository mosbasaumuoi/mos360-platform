// ============================================
// MOS360 COMPOSITION ENGINE
// Adaptive semantic lesson orchestration
// ============================================

import {

    governBlocks

}
    from "../semantic/contentValidationService.js";

// ============================================
// GROUP BLOCKS
// ============================================

function groupBlocks(

    blocks = []

) {

    const groups = {

        critical: [],
        primary: [],
        secondary: [],
        reinforcement: [],
        optional: []
    };

    blocks.forEach(block => {

        const priority =

            block.priority ||
            "secondary";

        if (!groups[priority]) {

            groups.secondary.push(
                block
            );

            return;
        }

        groups[priority].push(
            block
        );
    });

    return groups;
}

// ============================================
// REDUCE FATIGUE
// ============================================

function reduceFatigue(

    blocks = []

) {

    const composed = [];

    let previousType = null;

    blocks.forEach(block => {

        // ====================================
        // AVOID REPETITION
        // ====================================

        if (

            previousType ===
            "callout"

            &&

            block.type ===
            "callout"

        ) {

            composed.push({

                type:
                    "checkpoint",

                priority:
                    "reinforcement",

                title:
                    "Tiếp tục từng bước nhỏ",

                message:
                    "Hãy tập trung hoàn thành từng workflow nhỏ để duy trì momentum."
            });
        }

        composed.push(block);

        previousType =
            block.type;
    });

    return composed;
}

// ============================================
// CREATE FLOW
// ============================================

function createFlow(

    groups = {}

) {

    return [

        // ====================================
        // CRITICAL FIRST
        // ====================================

        ...groups.critical,

        // ====================================
        // PRIMARY LEARNING
        // ====================================

        ...groups.primary,

        // ====================================
        // SECONDARY SUPPORT
        // ====================================

        ...groups.secondary,

        // ====================================
        // REINFORCEMENT
        // ====================================

        ...groups.reinforcement,

        // ====================================
        // OPTIONAL LAST
        // ====================================

        ...groups.optional
    ];
}

// ============================================
// COMPOSE LESSON
// ============================================

export function composeLesson(

    blocks = []

) {

    // ========================================
    // GOVERNANCE
    // ========================================

    const governed =

        governBlocks(
            blocks
        );

    // ========================================
    // GROUPING
    // ========================================

    const groups =

        groupBlocks(
            governed
        );

    // ========================================
    // FLOW
    // ========================================

    const flow =

        createFlow(
            groups
        );

    // ========================================
    // FATIGUE REDUCTION
    // ========================================

    return reduceFatigue(
        flow
    );
}