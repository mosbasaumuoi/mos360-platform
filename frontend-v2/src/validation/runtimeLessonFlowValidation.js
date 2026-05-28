import {

    createDefaultLessonFlow,

    RUNTIME_LESSON_FLOW_TYPES

}

    from "../contracts/runtimeLessonFlowContract";

// ============================================
// VALIDATE LESSON FLOW STRUCTURE
// ============================================

export function validateLessonFlowStructure(

    lesson = {}

) {

    const errors = [];

    // ========================================
    // BLOCKS
    // ========================================

    const lessonBlocks =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks

            : [];

    // ========================================
    // EMPTY
    // ========================================

    if (

        lessonBlocks.length === 0

    ) {

        return {

            valid: false,

            errors: [
                "Lesson requires runtime blocks"
            ]
        };
    }

    // ========================================
    // FLOW STRUCTURE
    // ========================================

    const flowStructure =

        createDefaultLessonFlow();

    // ========================================
    // FLOW DISTRIBUTION
    // ========================================

    const flowMap = {};

    lessonBlocks.forEach((block) => {

        const flowType =

            block.lessonFlow;

        if (!flowType) {

            errors.push(

                `Block ${block.id} missing lessonFlow`
            );

            return;
        }

        // ====================================
        // INVALID FLOW TYPE
        // ====================================

        if (

            !RUNTIME_LESSON_FLOW_TYPES.includes(
                flowType
            )

        ) {

            errors.push(

                `Invalid lessonFlow: ${flowType}`
            );

            return;
        }

        // ====================================
        // DISTRIBUTION
        // ====================================

        if (!flowMap[flowType]) {

            flowMap[flowType] = [];
        }

        flowMap[flowType].push(block);
    });

// ========================================
// REQUIRED FLOW STEPS
// Semantic runtime convergence
// ========================================

flowStructure.forEach(

    (flowStep) => {

        const matchedBlocks =

            flowMap[
                flowStep.type
            ] || [];

        // ====================================
        // RUNTIME BRIDGE BYPASS
        // ====================================

        const runtimeLesson =

            lesson?.runtimeBridge
            ||
            lesson?.runtimeImported;

        // ====================================
        // LIGHTWEIGHT SEMANTIC MODE
        // ====================================

        if (runtimeLesson) {

            return;
        }

        // ====================================
        // STATIC GOVERNANCE MODE
        // ====================================

        if (

            flowStep.required &&

            matchedBlocks.length <

            flowStep.minimumBlocks

        ) {

            errors.push(

                `Missing required flow step: ${ flowStep.type } `
            );
        }
    }
);

    // ========================================
    // FLOW ORDER VALIDATION
    // ========================================

    const orderedFlows =

        lessonBlocks.map(
            block => block.lessonFlow
        );

    const introIndex =

        orderedFlows.indexOf(
            "intro"
        );

    const learningIndex =

        orderedFlows.indexOf(
            "learning"
        );

    if (

        introIndex > learningIndex &&

        learningIndex !== -1

    ) {

        errors.push(

            "Intro flow must appear before learning flow"
        );
    }

    // ========================================
    // PRACTICE CONTINUITY
    // ========================================

    const practiceCount =

        flowMap.practice
            ?.length || 0;

    const learningCount =

        flowMap.learning
            ?.length || 0;

    if (

        practiceCount > 0 &&

        learningCount === 0

    ) {

        errors.push(

            "Practice flow requires learning flow"
        );
    }

    // ========================================
    // CHECKPOINT CONTINUITY
    // ========================================

    const checkpointCount =

        flowMap.checkpoint
            ?.length || 0;

    if (

        checkpointCount > 0 &&

        lessonBlocks.length < 2

    ) {

        errors.push(

            "Checkpoint flow requires lesson continuity"
        );
    }

    // ========================================
    // REFLECTION CONTINUITY
    // ========================================

    const reflectionCount =

        flowMap.reflection
            ?.length || 0;

    if (

        reflectionCount > 0 &&

        learningCount === 0

    ) {

        errors.push(

            "Reflection flow requires learning flow"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors,

        analysis: {

            totalBlocks:
                lessonBlocks.length,

            flowDistribution:
                Object.fromEntries(

                    Object.entries(flowMap)

                        .map(

                            ([key, value]) => [

                                key,

                                value.length
                            ]
                        )
                )
        }
    };
}