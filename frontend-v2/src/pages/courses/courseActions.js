// ============================================
// MOS360 COURSE ACTIONS
// Courses interaction runtime
// ============================================

import {
    navigate
}
    from "../../core/router.js";

import {
    getStorage,
    setStorage
}
    from "../../utils/localStorageHelpers.js";

import {
    STORAGE_KEYS
}
    from "../../constants/storageKeys.js";

// ============================================
// COURSE CARDS
// ============================================

export function bindCourseCards() {

    document
        .querySelectorAll(
            ".course-card"
        )
        .forEach((card) => {

            card.onclick = () => {

                navigate(

                    `/courses/${card.dataset.id}`

                );
            };
        });
}

// ============================================
// LESSON ITEMS
// ============================================

export function bindLessonItems({

    course

}) {

    document
        .querySelectorAll(
            ".lesson-item"
        )
        .forEach((item) => {

            item.onclick = () => {

                navigate(

                    `/learn/${course.id
                    }/${item.dataset.lessonId
                    }`

                );
            };
        });
}

// ============================================
// ENROLL COURSE
// ============================================

export function enrollCourse({

    courseId

}) {

    const enrolledCourses =

        getStorage(

            STORAGE_KEYS.ENROLLED_COURSES,

            []

        );

    // ========================================
    // ALREADY ENROLLED
    // ========================================

    if (

        enrolledCourses.includes(
            courseId
        )

    ) {

        return enrolledCourses;
    }

    const updatedCourses = [

        ...enrolledCourses,

        courseId

    ];

    setStorage(

        STORAGE_KEYS.ENROLLED_COURSES,

        updatedCourses

    );

    return updatedCourses;
}

// ============================================
// START LEARNING
// ============================================

export function startLearning({

    course,

    isEnrolled,

    onEnroll

}) {

    // ========================================
    // ENROLL FIRST
    // ========================================

    if (!isEnrolled) {

        enrollCourse({

            courseId:
                course.id
        });

        alert(
            "Enroll success!"
        );

        onEnroll();

        return;
    }

    // ========================================
    // FIRST LESSON
    // ========================================

    const firstLesson =

        course.lessons?.[0];

    if (!firstLesson) {

        alert(
            "No lessons found."
        );

        return;
    }

    navigate(

        `/learn/${course.id
        }/${firstLesson.id
        }`

    );
}

// ============================================
// CONTINUE LEARNING
// ============================================

export function continueLearning({

    course

}) {

    const lastLessonId =

        localStorage.getItem(

            STORAGE_KEYS.LAST_LESSON_PREFIX
            + course.id

        );

    const firstLesson =

        course.lessons?.[0];

    const targetLessonId =

        lastLessonId
        ||
        firstLesson?.id;

    if (!targetLessonId) {

        alert(
            "No lessons found."
        );

        return;
    }

    navigate(

        `/learn/${course.id
        }/${targetLessonId
        }`

    );
}