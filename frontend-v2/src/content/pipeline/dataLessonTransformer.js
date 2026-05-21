// ============================================
// DATA LESSON TRANSFORMER
// JSON -> semantic lesson runtime
// ============================================

import {
    validateDataLesson
}
    from "../../contracts/dataLesson.contract.js";

import {
    createLessonTemplate
}
    from "../templates/createLessonTemplate.js";

import {
    createQuizBlock
}
    from "../templates/blockPresets.js";

// ============================================
// TRANSFORM DATA LESSON
// ============================================

export function transformDataLesson(

    lesson

) {

    // ========================================
    // VALIDATE
    // ========================================

    const valid =

        validateDataLesson(
            lesson
        );

    if (!valid) {

        return {

            ok: false,

            type:
                "invalid-data-lesson"
        };
    }

    // ========================================
    // QUIZ
    // ========================================

    const quiz =

        (lesson.quiz || [])
            .map(

                item =>

                    createQuizBlock({

                        question:
                            item.question,

                        options:
                            item.options,

                        correctAnswer:
                            item.correctAnswer
                    })
            );

    // ========================================
    // TEMPLATE
    // ========================================

    const transformedLesson =

        createLessonTemplate({

            id:
                lesson.id,

            courseId:
                lesson.courseId,

            title:
                lesson.title,

            description:
                lesson.description,

            duration:
                lesson.duration,

            difficulty:
                lesson.difficulty,

            workflowSteps:
                lesson.workflowSteps,

            tips:
                lesson.tips,

            practicalContent:
                lesson.practicalContent,

            resources:
                lesson.resources || [],

            quiz
        });

    return {

        ok: true,

        data:
            transformedLesson
    };
}