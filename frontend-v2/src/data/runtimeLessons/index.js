import {

    demoLesson

}

    from "./demoLesson";

// ============================================
// RUNTIME LESSON REGISTRY
// ============================================

export const runtimeLessons = [

    demoLesson
];

// ============================================
// FIND LESSON
// ============================================

export function findRuntimeLesson(

    lessonId

) {

    return runtimeLessons.find(

        (lesson) =>

            lesson.id === lessonId
    );
}