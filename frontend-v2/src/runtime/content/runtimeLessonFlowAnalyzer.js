import {

    createDefaultLessonFlow

}

    from "../../contracts/runtimeLessonFlowContract";

// ============================================
// ANALYZE LESSON FLOW
// ============================================

export function analyzeLessonFlow(

    lesson = {}

) {

    const blocks =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks

            : [];

    const flowSteps =

        createDefaultLessonFlow();

    return flowSteps.map(

        (step) => {

            const matchedBlocks =

                blocks.filter(

                    (block) =>

                        block.lessonFlow ===
                        step.type
                );

            return {

                type:
                    step.type,

                required:
                    step.required,

                minimumBlocks:
                    step.minimumBlocks,

                totalBlocks:
                    matchedBlocks.length,

                completed:

                    matchedBlocks.length >=
                    step.minimumBlocks
            };
        }
    );
}