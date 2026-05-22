// ============================================
// MOS360 VIDEO PLAYER ENGINE
// Lesson completion runtime
// ============================================

import {

    completeLesson

}

from "./lessonCompletionEngine.js";

// ============================================
// BIND VIDEO PLAYER
// ============================================

export async function bindVideoPlayer({

    lesson,
    course,
    lessonId,
    courseId,
    completedLessons,
    onComplete

}) {

    // ========================================
    // VIDEO STATUS
    // ========================================

    const videoStatus =

        document.querySelector(
            "#videoStatus"
        );

    if (!videoStatus) {
        return;
    }

    // ========================================
    // QUIZ MODE
    // ========================================

    const hasQuiz =

        lesson.quiz &&
        lesson.quiz.length > 0;

    // ========================================
    // REQUIRE QUIZ COMPLETION
    // ========================================

    if (hasQuiz) {

        videoStatus.innerText =

            "Hoàn thành quiz để kết thúc bài học";

        console.log(

            "[MOS360:VIDEO] quiz required for completion"
        );

        return;
    }

    // ========================================
    // VIDEO ONLY LESSON
    // ========================================

    videoStatus.innerText =

        "Xem video để hoàn thành bài học";

    // ========================================
    // AUTO COMPLETE DELAY
    // ========================================

    setTimeout(async () => {

        // ====================================
        // FIRST COMPLETION ONLY
        // ====================================

        const firstCompletion =

            !completedLessons.includes(
                lessonId
            );

        if (!firstCompletion) {
            return;
        }

        // ====================================
        // COMPLETE LESSON
        // ====================================

        completedLessons =

            await completeLesson({

                lesson,

                course,

                lessonId,

                courseId
            });

        // ====================================
        // UPDATE STATUS
        // ====================================

        videoStatus.innerText =

            "✅ Đã hoàn thành bài học";

        console.log(

            "[MOS360:VIDEO] lesson completed"
        );

        // ====================================
        // RERENDER
        // ====================================

        if (onComplete) {

            onComplete();
        }

    }, 30000);
}