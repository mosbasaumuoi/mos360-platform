// ============================================
// MOS360 LEARN ACTION ENGINE
// Learning flow action runtime
// ============================================

import {
    navigate
}
    from "../core/router.js";

import {
    bindClick
}
    from "../core/uiActions.js";

import {
    completeCourse
}
    from "./courseCompletionEngine.js";

// ============================================
// GET ACTION TYPE
// ============================================

export function getLessonAction({

    lessonCompleted,
    nextLesson,
    courseCompleted

}) {

    // ========================================
    // PLAY
    // ========================================

    if (!lessonCompleted) {

        return {
            type: "play"
        };
    }

    // ========================================
    // NEXT LESSON
    // ========================================

    if (nextLesson) {

        return {
            type: "next"
        };
    }

    // ========================================
    // COMPLETE COURSE
    // ========================================

    if (!courseCompleted) {

        return {
            type: "complete-course"
        };
    }

    // ========================================
    // COURSE COMPLETED
    // ========================================

    return {
        type: "completed"
    };
}

// ============================================
// RENDER ACTION
// ============================================

export function renderLessonAction({

    action

}) {

    // ========================================
    // PLAY
    // ========================================

    if (action.type === "play") {

        return `

      <button
        class="lesson-action-btn primary"
        id="playLessonActionBtn"
      >

        ▶ Bắt đầu bài học

      </button>

    `;
    }

    // ========================================
    // NEXT LESSON
    // ========================================

    if (action.type === "next") {

        return `

      <button
        class="lesson-action-btn primary"
        id="nextLessonBtn"
      >

        Tiếp tục bài tiếp theo →

      </button>

    `;
    }

    // ========================================
    // COMPLETE COURSE
    // ========================================

    if (
        action.type ===
        "complete-course"
    ) {

        return `

      <button
        class="lesson-action-btn success"
        id="completeCourseBtn"
      >

        🎉 Hoàn thành khóa học

      </button>

    `;
    }

    // ========================================
    // COMPLETED
    // ========================================

    return `

    <button
      class="lesson-action-btn secondary"
      disabled
    >

      ✅ Khóa học đã hoàn thành

    </button>

  `;
}

// ============================================
// BIND ACTIONS
// ============================================

export function bindLessonActions({

    action,
    courseId,
    nextLesson,
    course,
    completedLessons

}) {

    // ========================================
    // PLAY
    // ========================================

    if (action.type === "play") {

        bindClick(

            "#playLessonActionBtn",

            () => {

                document
                    .querySelector(
                        "#playVideoBtn"
                    )
                    ?.click();

            }

        );

        return;
    }

    // ========================================
    // NEXT LESSON
    // ========================================

    if (
        action.type === "next"
        &&
        nextLesson
    ) {

        bindClick(

            "#nextLessonBtn",

            () => {

                navigate(

                    `/learn/${courseId}/${nextLesson.id}`

                );

            }

        );

        return;
    }

    // ========================================
    // COMPLETE COURSE
    // ========================================

    if (
        action.type ===
        "complete-course"
    ) {

        bindClick(

            "#completeCourseBtn",

            () => {

                const result =

                    completeCourse({

                        courseId,

                        course,

                        completedLessons

                    });

                if (!result.ok) {

                    alert(
                        result.message
                    );

                    return;
                }

                navigate(
                    "/dashboard"
                );

            }

        );
    }
}