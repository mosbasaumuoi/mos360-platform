import {

    getImportedLessons

}

    from "../../engines/runtimeImportEngine.js";

import {

    evaluateLessonRuntimeReadiness

}

    from "./runtimeLessonReadinessEngine";

import {

    buildSemanticComposition

}

    from "../semantic/semanticComposerEngine.js";

// ============================================
// GET ALL RUNTIME LESSONS
// ============================================

export function getRuntimeLessons() {

    const lessons =

        getImportedLessons();

    if (!Array.isArray(lessons)) {
        return [];
    }

    return lessons;
}

// ============================================
// GET RUNTIME LESSON
// ============================================

export function getRuntimeLesson(

    lessonId,

    options = {}

) {

    if (!lessonId) {
        return null;
    }

    const lesson =

        getRuntimeLessons()

            .find(

                lesson =>

                    lesson.id === lessonId ||

                    lesson.lessonId === lessonId
            ) || null;

    if (!lesson) {
        return null;
    }

    // ========================================
    // LEGACY SAFE MODE
    // ========================================

    if (

        options.semanticRuntime === false

    ) {

        return lesson;
    }

    // ========================================
    // CANONICAL SEMANTIC RUNTIME
    // ========================================

    const semanticRuntime =

        buildSemanticComposition({

            lesson,

            telemetry:

                options.telemetry || {}
        });

    return {

        ...lesson,

        semanticRuntime,

        runtimeAuthority:
            "semantic-composer",

        runtimeActivated:
            true,

        runtimeType:
            "canonical-semantic-runtime"
    };
}

// ============================================
// GET LESSON READINESS
// ============================================

export function getRuntimeLessonReadiness(

    lessonId

) {

    const lesson =

        getRuntimeLesson(
            lessonId,

            {

                semanticRuntime:
                    false
            }
        );

    if (!lesson) {

        return {

            valid: false,

            readyForRuntime: false,

            progression: 0,

            validationErrors: [

                "Lesson not found"
            ],

            scores: {

                structure: 0,

                flow: 0,

                blockQuality: 0
            },

            flow: {}
        };
    }

    return evaluateLessonRuntimeReadiness(
        lesson
    );
}

// ============================================
// GET COURSE LESSONS
// ============================================

export function getRuntimeCourseLessons(

    courseId,

    options = {}

) {

    if (!courseId) {
        return [];
    }

    return getRuntimeLessons()

        .filter(

            lesson =>

                lesson.courseId === courseId
        )

        .map(

            lesson =>

                getRuntimeLesson(

                    lesson.id,

                    options
                )
        );
}

// ============================================
// GET READY LESSONS
// ============================================

export function getRuntimeReadyLessons() {

    return getRuntimeLessons()

        .filter((lesson) => {

            const readiness =

                evaluateLessonRuntimeReadiness(
                    lesson
                );

            return readiness.readyForRuntime;
        });
}

// ============================================
// GET LESSON FLOW SUMMARY
// ============================================

export function getRuntimeLessonFlowSummary(

    lessonId

) {

    const lesson =

        getRuntimeLesson(

            lessonId,

            {

                semanticRuntime:
                    false
            }
        );

    if (!lesson) {

        return {

            valid: false,

            flow: {}
        };
    }

    const readiness =

        evaluateLessonRuntimeReadiness(
            lesson
        );

    return {

        valid:
            readiness.valid,

        flow:
            readiness.flow
    };
}

// ============================================
// GET LESSON STATISTICS
// ============================================

export function getRuntimeLessonStatistics() {

    const lessons =

        getRuntimeLessons();

    const readyLessons =

        getRuntimeReadyLessons();

    return {

        totalLessons:
            lessons.length,

        readyLessons:
            readyLessons.length,

        readinessRate:

            lessons.length > 0

                ? Math.round(

                    (
                        readyLessons.length
                        /
                        lessons.length
                    ) * 100
                )

                : 0
    };
}
