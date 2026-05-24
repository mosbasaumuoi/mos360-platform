/**
 * MOS360
 * Block Editing Engine
 *
 * RESPONSIBILITY:
 * - semantic block editing
 * - runtime-safe mutations
 * - block property editing
 * - lightweight editing flow
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - bypass validation
 * - overwrite lessons directly
 */

// ============================================
// UPDATE BLOCK FIELD
// ============================================

export function updateBlockField({

    blocks = [],

    index,

    field,

    value

}) {

    return blocks.map(
        (block, i) => {

            if (i !== index) {

                return block;
            }

            return {

                ...block,

                [field]:
                    value
            };
        }
    );
}

// ============================================
// UPDATE BLOCK
// ============================================

export function updateBlock({

    blocks = [],

    index,

    nextBlock

}) {

    return blocks.map(
        (block, i) => {

            if (i !== index) {

                return block;
            }

            return {

                ...block,

                ...nextBlock
            };
        }
    );
}

// ============================================
// CREATE EMPTY BLOCK
// ============================================

export function createEmptyBlock(
    type = "text"
) {

    return {

        type,

        priority:
            "normal"
    };
}

// ============================================
// DUPLICATE BLOCK
// ============================================

export function duplicateBlock({

    blocks = [],

    index

}) {

    const target =
        blocks[index];

    if (!target) {

        return blocks;
    }

    const updated =
        [...blocks];

    updated.splice(
        index + 1,
        0,
        {

            ...target,

            duplicated: true
        }
    );

    return updated;
}