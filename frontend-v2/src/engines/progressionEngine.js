// ============================================
// MOS360 PROGRESSION ENGINE
// Learning progression runtime
// ============================================

// ============================================
// STORAGE KEYS
// ============================================

function getCompletedLessonsKey(

    courseId

) {

    return `

    mos360_completed_lessons_${courseId}

  `.trim();
}

// ============================================
// GET COMPLETED LESSONS
// ============================================

export function getCompletedLessons(

    courseId

) {

    return JSON.parse(

        localStorage.getItem(

            getCompletedLessonsKey(
                courseId
            )

        ) || "[]"

    );
}

// ============================================
// SAVE COMPLETED LESSON
// ============================================

export function saveCompletedLesson({

    courseId,
    lessonId

}) {

    const completedLessons =

        getCompletedLessons(
            courseId
        );

    if (

        completedLessons.includes(
            lessonId
        )

    ) {

        return completedLessons;
    }

    const updatedLessons = [

        ...completedLessons,

        lessonId

    ];

    localStorage.setItem(

        getCompletedLessonsKey(
            courseId
        ),

        JSON.stringify(
            updatedLessons
        )

    );

    return updatedLessons;
}

// ============================================
// CHECK LESSON COMPLETED
// ============================================

export function isLessonCompleted({

    courseId,
    lessonId

}) {

    return getCompletedLessons(
        courseId
    )

        .includes(
            lessonId
        );
}

// ============================================
// SAVE LAST LESSON
// ============================================

export function saveLastLesson({

    courseId,
    lessonId

}) {

    localStorage.setItem(

        `mos360_last_lesson_${courseId}`,

        lessonId

    );
}

// ============================================
// GET PROGRESS PERCENT
// ============================================

export function getProgressPercent({

    completedLessons,
    totalLessons

}) {

    if (!totalLessons) {
        return 0;
    }

    return Math.round(

        (
            completedLessons.length
            /
            totalLessons
        ) * 100

    );
}