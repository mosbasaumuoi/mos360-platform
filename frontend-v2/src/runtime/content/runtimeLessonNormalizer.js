import {

    normalizeRuntimeBlocks

}

    from "../../contracts/runtimeBlockContract";

import {

    normalizeRuntimeLessonShape

}

    from "../../contracts/runtimeLessonContract";
    
import {

    RUNTIME_LESSON_STATUSES

}

    from "../../contracts/runtimeLessonContract";   
    
import {

    mapLessonBlocksToFlow

}

    from "./runtimeLessonFlowMapper";    

// ============================================
// NORMALIZE LESSON
// ============================================

export function normalizeRuntimeLesson(

    lesson = {}

) {

    return normalizeRuntimeLessonShape({

        id:

            typeof lesson.id ===
                "string"

                ? lesson.id

                : crypto.randomUUID(),
        title:

            typeof lesson.title ===
                "string"

                ? lesson.title

                : "",

        description:

            typeof lesson.description ===
                "string"

                ? lesson.description

                : "",

        courseId:

            typeof lesson.courseId ===
                "string"

                ? lesson.courseId

                : null,

        semanticVersion:

            typeof lesson.semanticVersion ===
                "string"

                ? lesson.semanticVersion

                : "phase-h2",

        status:

            RUNTIME_LESSON_STATUSES.includes(
                lesson.status
            )

                ? lesson.status

                : "draft",

        blocks:

            mapLessonBlocksToFlow(

                normalizeRuntimeBlocks(

                    Array.isArray(
                        lesson.blocks
                    )

                        ? lesson.blocks

                        : []
                )
            ),

        quiz:

            Array.isArray(
                lesson.quiz
            )

                ? lesson.quiz

                : [],

        createdAt:

            typeof lesson.createdAt ===
                "number"

                ? lesson.createdAt

                : Date.now(),

        updatedAt:

            typeof lesson.updatedAt ===
                "number"

                ? lesson.updatedAt

                : Date.now()
    });
}

// ============================================
// NORMALIZE LESSON COLLECTION
// ============================================

export function normalizeRuntimeLessons(

    lessons = []

) {

    return lessons.map(

        normalizeRuntimeLesson
    );
}