import {

    analyzeLessonFlow

}

    from "./runtimeLessonFlowAnalyzer";

// ============================================
// CREATE FLOW SUMMARY
// ============================================

export function createLessonFlowSummary(

    lesson = {}

) {

    const analysis =

        analyzeLessonFlow(
            lesson
        );

    const completedSteps =

        analysis.filter(

            (step) => step.completed
        ).length;

    const totalSteps =
        analysis.length;

    const progression =

        Math.round(

            (completedSteps / totalSteps) * 100
        );

    return {

        totalSteps,

        completedSteps,

        progression,

        readyForRuntime:

            progression >= 60,

        analysis
    };
}