import {

    validateRuntimeBlocks

}

    from "./runtimeBlockValidation";

import {

    RUNTIME_LESSON_STATUSES

}

    from "../contracts/runtimeLessonContract";

import {

    validateLessonFlowStructure

}

    from "./runtimeLessonFlowValidation";

// ============================================
// VALIDATE RUNTIME LESSON
// ============================================

export function validateRuntimeLesson(

    lesson = {}

) {

    const errors = [];

    // ========================================
    // LESSON OBJECT
    // ========================================

    if (

        !lesson ||

        typeof lesson !== "object"

    ) {

        return {

            valid: false,

            errors: [
                "Lesson must be object"
            ]
        };
    }

    // ========================================
    // ID
    // ========================================

    if (

        typeof lesson.id !== "string" ||

        !lesson.id.trim()

    ) {

        errors.push(
            "Lesson id is required"
        );
    }

    // ========================================
    // TITLE
    // ========================================

    if (

        typeof lesson.title !== "string" ||

        !lesson.title.trim()

    ) {

        errors.push(
            "Lesson title is required"
        );
    }

    // ========================================
    // COURSE ID
    // ========================================

    if (

        typeof lesson.courseId !== "string" ||

        !lesson.courseId.trim()

    ) {

        errors.push(
            "Lesson courseId is required"
        );
    }

    // ========================================
    // STATUS
    // ========================================

    if (

        !RUNTIME_LESSON_STATUSES.includes(
            lesson.status
        )

    ) {

        errors.push(

            `Invalid lesson status: ${lesson.status}`
        );
    }

    // ========================================
    // BLOCKS
    // ========================================

    if (

        !Array.isArray(
            lesson.blocks
        )

    ) {

        errors.push(
            "Lesson blocks must be array"
        );

    } else {

        // ====================================
        // EMPTY BLOCKS
        // ====================================

        if (

            lesson.blocks.length === 0

        ) {

            errors.push(
                "Lesson requires at least 1 block"
            );
        }

        // ====================================
        // BLOCK VALIDATION
        // ====================================

        const blockResults =

            validateRuntimeBlocks(
                lesson.blocks
            );

        blockResults.forEach(

            (result, index) => {

                if (!result.valid) {

                    errors.push(

                        `Block ${index}: ${result.errors.join(", ")}`
                    );
                }
            }
        );
    }

    // ========================================
    // FLOW VALIDATION
    // ========================================

    const flowValidation =

        validateLessonFlowStructure(
            lesson
        );

    errors.push(

        ...flowValidation.errors
    );

    // ========================================
    // DUPLICATE BLOCK IDS
    // ========================================

    const blockIds =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks.map(
                block => block.id
            )

            : [];

    const duplicatedIds =

        blockIds.filter(

            (id, index) =>

                blockIds.indexOf(id)
                !==
                index
        );

    if (

        duplicatedIds.length > 0

    ) {

        errors.push(
            "Duplicate block ids detected"
        );
    }

    // ========================================
    // VERSION
    // ========================================

    if (

        lesson.semanticVersion &&

        typeof lesson.semanticVersion !== "string"

    ) {

        errors.push(
            "semanticVersion must be string"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

// ============================================
// VALIDATE LESSON COLLECTION
// ============================================

export function validateRuntimeLessons(

    lessons = []

) {

    if (!Array.isArray(lessons)) {

        return [

            {

                valid: false,

                errors: [
                    "Lessons must be array"
                ]
            }
        ];
    }

    return lessons.map(

        validateRuntimeLesson
    );
}