// ============================================
// LESSON BLOCK FILTER ENGINE
// Smart adaptive lesson block runtime
// ============================================

// ============================================
// PRIORITY WEIGHTS
// ============================================

const PRIORITY_WEIGHTS = {

    critical:
        1,

    primary:
        2,

    secondary:
        3,

    reinforcement:
        4,

    optional:
        5
};

// ============================================
// CHECK CONDITIONS
// ============================================

function checkBlockConditions(

    block,
    runtime = {}

) {

    // ========================================
    // NO CONDITIONS
    // ========================================

    if (!block.conditions) {

        return true;
    }

    // ========================================
    // MIN PROGRESS
    // ========================================

    if (

        typeof block.conditions.minProgress
        ===
        "number"

    ) {

        if (

            (runtime.progressPercent || 0)

            <

            block.conditions.minProgress

        ) {

            return false;
        }
    }

    // ========================================
    // REQUIRE ENROLLED
    // ========================================

    if (

        block.conditions.requireEnrolled
        ===
        true

    ) {

        if (!runtime.isEnrolled) {

            return false;
        }
    }

    return true;
}

// ============================================
// SORT BLOCKS
// ============================================

function sortBlocks(

    blocks = []

) {

    return [...blocks]

        .sort(

            (
                a,
                b
            ) => {

                const aWeight =

                    PRIORITY_WEIGHTS[
                    a.priority
                    ] || 999;

                const bWeight =

                    PRIORITY_WEIGHTS[
                    b.priority
                    ] || 999;

                return (
                    aWeight - bWeight
                );
            }
        );
}

// ============================================
// FILTER BLOCKS
// ============================================

export function filterLessonBlocks(

    blocks = [],
    runtime = {}

) {

    // ========================================
    // CONDITIONS
    // ========================================

    const filteredBlocks =

        blocks.filter(

            block =>

                checkBlockConditions(

                    block,
                    runtime
                )
        );

    // ========================================
    // SORT
    // ========================================

    return sortBlocks(
        filteredBlocks
    );
}