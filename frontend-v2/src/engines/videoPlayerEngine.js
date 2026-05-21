// ============================================
// MOS360 VIDEO PLAYER ENGINE
// Lesson video runtime
// ============================================

import {
    completeLesson
}
    from "./lessonCompletionEngine.js";

// ============================================
// BIND VIDEO PLAYER
// ============================================

export function bindVideoPlayer({

    lesson,
    course,
    lessonId,
    courseId,
    completedLessons,
    onComplete

}) {

    const playBtn =

        document.querySelector(
            "#playVideoBtn"
        );

    const videoStatus =

        document.querySelector(
            "#videoStatus"
        );

    const progressFill =

        document.querySelector(
            ".video-progress-fill"
        );

    if (

        !playBtn
        ||
        !videoStatus
        ||
        !progressFill

    ) {

        return;
    }

    let playing = false;

    let progress = 0;

    playBtn.onclick = async () => {

        // ======================================
        // PREVENT DOUBLE PLAY
        // ======================================

        if (playing) {
            return;
        }

        playing = true;

        progress = 0;

        // ======================================
        // RESET UI
        // ======================================

        progressFill.style.width =
            "0%";

        videoStatus.innerText =
            "Playing lesson...";

        playBtn.innerHTML =
            "⏸";

        // ======================================
        // VIDEO LOOP
        // ======================================

        const interval =

            setInterval(async () => {

                progress += 1;

                progressFill.style.width =

                    `${progress}%`;

                // ==================================
                // FINISH
                // ==================================

                if (progress >= 100) {

                    clearInterval(
                        interval
                    );

                    // ================================
                    // REPLAY MODE
                    // ================================

                    playBtn.innerHTML =
                        "↻";

                    videoStatus.innerText =

                        "✅ Hoàn thành bài học • Bạn đang tiến bộ rất tốt";

                    // ================================
                    // FIRST COMPLETION ONLY
                    // ================================

                    const firstCompletion =

                        !completedLessons.includes(
                            lessonId
                        );

                    if (firstCompletion) {

                        completedLessons =

                            await completeLesson({

                                lesson,

                                course,

                                lessonId,

                                courseId

                            });
                    }

                    playing = false;

                    // ================================
                    // RERENDER PAGE
                    // ================================

                    if (onComplete) {

                        onComplete();

                    }
                }

            }, 60);
    };
}