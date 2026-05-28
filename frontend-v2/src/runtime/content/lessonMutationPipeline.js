/**
 * MOS360
 * Lesson Mutation Engine
 *
 * RESPONSIBILITY:
 * - safe lesson overwrite
 * - compatibility-safe mutation
 * - lesson evolution safety
 * - mutation strategy
 *
 * MUST NOT:
 * - render UI
 * - hydrate runtime
 * - mutate renderer
 */

import {

    registerLessonEvolution

}

    from "../import/importRegistry";

// ============================================
// SAFE OVERWRITE LESSONS
// ============================================

export function safelyMergeLessons({

    existingLessons = [],

    importedLessons = []

} = {}) {

    const existingMap =
        new Map();

    existingLessons.forEach(
        lesson => {

            const key =
                `${lesson.courseId}-${lesson.id}`;

            existingMap.set(
                key,
                lesson
            );
        }
    );

    importedLessons.forEach(
        lesson => {

            const key =
                `${lesson.courseId}-${lesson.id}`;

            // ================================
            // EXISTING LESSON
            // ================================

            if (
                existingMap.has(key)
            ) {

                const previousLesson =
                    existingMap.get(key);

                registerLessonEvolution({

                    lessonId:
                        lesson.id,

                    courseId:
                        lesson.courseId,

                    mutationType:
                        "overwrite",

                    previousVersion:
                        previousLesson.version,

                    nextVersion:
                        lesson.version
                });
            }

            existingMap.set(
                key,
                lesson
            );
        }
    );

    return Array.from(
        existingMap.values()
    );
}