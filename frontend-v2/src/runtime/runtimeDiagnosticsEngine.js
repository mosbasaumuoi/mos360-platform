// ============================================
// MOS360 RUNTIME DIAGNOSTICS ENGINE
// Semantic runtime observability layer
// ============================================

import {

    generateRuntimeReport,

    checkRuntimeHealth

}
    from "./runtimeIntegrityEngine.js";

// ============================================
// ANALYZE BLOCK DISTRIBUTION
// ============================================

export function analyzeBlockDistribution(

    lessons = []

) {

    const distribution = {};

    lessons.forEach(lesson => {

        (lesson.blocks || [])

            .forEach(block => {

                if (

                    !distribution[
                    block.type
                    ]

                ) {

                    distribution[
                        block.type
                    ] = 0;
                }

                distribution[
                    block.type
                ]++;
            });
    });

    return distribution;
}

// ============================================
// ANALYZE PRIORITY DISTRIBUTION
// ============================================

export function analyzePriorityDistribution(

    lessons = []

) {

    const distribution = {

        critical: 0,
        primary: 0,
        secondary: 0,
        reinforcement: 0,
        optional: 0
    };

    lessons.forEach(lesson => {

        (lesson.blocks || [])

            .forEach(block => {

                const priority =

                    block.priority ||
                    "secondary";

                if (

                    distribution[
                    priority
                    ] === undefined

                ) {

                    return;
                }

                distribution[
                    priority
                ]++;
            });
    });

    return distribution;
}

// ============================================
// DETECT ENTROPY
// ============================================

export function detectRuntimeEntropy(

    lessons = []

) {

    const warnings = [];

    lessons.forEach(lesson => {

        const blocks =
            lesson.blocks || [];

        // ====================================
        // TOO MANY BLOCKS
        // ====================================

        if (

            blocks.length > 12

        ) {

            warnings.push({

                lessonId:
                    lesson.id,

                type:
                    "lesson_overload"
            });
        }

        // ====================================
        // TOO MANY CALLOUTS
        // ====================================

        const callouts =

            blocks.filter(

                block =>

                    block.type ===
                    "callout"
            );

        if (

            callouts.length > 3

        ) {

            warnings.push({

                lessonId:
                    lesson.id,

                type:
                    "callout_overload"
            });
        }
    });

    return warnings;
}

// ============================================
// GENERATE DIAGNOSTICS REPORT
// ============================================

export function generateDiagnosticsReport(

    lessons = []

) {

    const runtimeHealth =

        checkRuntimeHealth(
            lessons
        );

    return {

        generatedAt:
            Date.now(),

        runtimeHealth,

        blockDistribution:

            analyzeBlockDistribution(
                lessons
            ),

        priorityDistribution:

            analyzePriorityDistribution(
                lessons
            ),

        entropyWarnings:

            detectRuntimeEntropy(
                lessons
            )
    };
}

// ============================================
// LOG DIAGNOSTICS
// ============================================

export function logDiagnostics(

    lessons = []

) {

    const diagnostics =

        generateDiagnosticsReport(
            lessons
        );

    console.group(

        "[MOS360:RUNTIME_DIAGNOSTICS]"
    );

    console.log(
        diagnostics
    );

    console.groupEnd();

    return diagnostics;
}