// ============================================
// CONTENT FACTORY
// Semantic course generation runtime
// ============================================

import {
    createLessonTemplate
}
    from "./createLessonTemplate.js";

// ============================================
// CREATE COURSE MANIFEST
// ============================================

function createCourseManifest(

    blueprint,
    lessons

) {

    return {

        id:
            blueprint.id,

        slug:
            blueprint.slug,

        title:
            blueprint.title,

        description:
            blueprint.description,

        category:
            blueprint.category,

        level:
            blueprint.level,

        duration:
            blueprint.duration,

        difficulty:
            blueprint.difficulty,

        xpReward:
            blueprint.xpReward,

        tags:
            blueprint.tags,

        lessons:

            lessons.map(

                (
                    lesson,
                    index
                ) => ({

                    id:
                        lesson.id,

                    title:
                        lesson.title,

                    order:
                        index + 1,

                    duration:
                        lesson.duration,

                    xpReward:
                        lesson.xpReward
                })
            )
    };
}

// ============================================
// CREATE COURSE CONTENT
// ============================================

export function createCourseContent(

    blueprint

) {

    // ========================================
    // LESSONS
    // ========================================

    const lessons =

        blueprint.lessonBlueprints.map(

            (
                lessonBlueprint,
                index
            ) =>

                createLessonTemplate({

                    id:
                        lessonBlueprint.id,

                    courseId:
                        blueprint.id,

                    title:
                        lessonBlueprint.title,

                    description:
                        lessonBlueprint.description,

                    workflowSteps:
                        lessonBlueprint.workflowSteps,

                    order:
                        index + 1
                })
        );

    // ========================================
    // MANIFEST
    // ========================================

    const manifest =

        createCourseManifest(

            blueprint,
            lessons
        );

    return {

        manifest,

        lessons
    };
}