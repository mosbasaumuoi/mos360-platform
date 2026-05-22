// ============================================
// MOS360 CONTENT GOVERNANCE
// Semantic runtime governance layer
// ============================================

import {

    BLOCK_REGISTRY,

    getBlockConfig

}
    from "./contentRegistry.js";

// ============================================
// VALID PRIORITIES
// ============================================

const VALID_PRIORITIES = [

    "critical",
    "primary",
    "secondary",
    "reinforcement",
    "optional"
];

// ============================================
// VALIDATE BLOCK TYPE
// ============================================

export function validateBlockType(

    block = {}

) {

    return Boolean(

        BLOCK_REGISTRY[
        block.type
        ]
    );
}

// ============================================
// VALIDATE BLOCK PRIORITY
// ============================================

export function validateBlockPriority(

    block = {}

) {

    return VALID_PRIORITIES.includes(

        block.priority
    );
}

// ============================================
// GOVERN BLOCK
// ============================================

export function governBlock(

    block = {}

) {

    // ========================================
    // INVALID TYPE
    // ========================================

    if (

        !validateBlockType(
            block
        )

    ) {

        console.warn(

            "[MOS360:GOVERNANCE] invalid block type",

            block
        );

        return null;
    }

    // ========================================
    // REGISTRY CONFIG
    // ========================================

    const config =

        getBlockConfig(
            block.type
        );

    // ========================================
    // AUTO PRIORITY
    // ========================================

    const priority =

        validateBlockPriority(
            block
        )

            ? block.priority

            : config.priority;

    return {

        ...block,

        priority
    };
}

// ============================================
// GOVERN BLOCKS
// ============================================

export function governBlocks(

    blocks = []

) {

    return blocks

        .map(
            governBlock
        )

        .filter(Boolean);
}

// ============================================
// RUNTIME CONTENT REPORT
// ============================================

export function generateContentReport(

    blocks = []

) {

    const report = {

        totalBlocks:
            blocks.length,

        cinematicBlocks:
            0,

        interactiveBlocks:
            0,

        reinforcementBlocks:
            0,

        invalidBlocks:
            0
    };

    blocks.forEach(block => {

        const config =

            getBlockConfig(
                block.type
            );

        // ====================================
        // INVALID
        // ====================================

        if (!config) {

            report.invalidBlocks++;
            return;
        }

        // ====================================
        // CINEMATIC
        // ====================================

        if (config.cinematic) {

            report.cinematicBlocks++;
        }

        // ====================================
        // INTERACTIVE
        // ====================================

        if (config.interactive) {

            report.interactiveBlocks++;
        }

        // ====================================
        // REINFORCEMENT
        // ====================================

        if (config.reinforcement) {

            report.reinforcementBlocks++;
        }
    });

    return report;
}