import {
  apiGet
}
from "../../services/api.js";

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

import {
  navigate
}
from "../../core/router.js";

export async function renderLearnPage() {

  // ========================================
  // URL PARTS
  // ========================================

  const parts =

    window.location.pathname
      .split("/");

  const courseId =
    Number(parts[2]);

  const lessonId =
    Number(parts[3]);

  // ========================================
  // LOAD COURSE
  // ========================================

  const courseResult =

    await apiGet(

      `/courses/${courseId}`,

      {
        silent: true
      }

    );

  if (!courseResult.ok) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <h1>
          Course not found
        </h1>

      `);

    return;
  }

  const course =
    courseResult.data;

  // ========================================
  // LOAD LESSON
  // ========================================

  const lessonResult =

    await apiGet(

      `/learn/${courseId}/${lessonId}`,

      {
        silent: true
      }

    );

  if (!lessonResult.ok) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <h1>
          Lesson not found
        </h1>

      `);

    return;
  }

  const lesson =
    lessonResult.data.lesson;

  // ========================================
  // SAVE LAST LESSON
  // ========================================

  localStorage.setItem(

    `last_lesson_${courseId}`,

    lessonId

  );

  // ========================================
  // STREAK
  // ========================================

  const today =

    new Date()
      .toDateString();

  const lastDate =

    localStorage.getItem(
      "last_learning_date"
    );

  let streak =

    Number(

      localStorage.getItem(
        "learning_streak"
      ) || 0

    );

  if (lastDate !== today) {

    streak += 1;

    localStorage.setItem(
      "learning_streak",
      streak
    );

    localStorage.setItem(
      "last_learning_date",
      today
    );
  }

  // ========================================
  // PROGRESS
  // ========================================

  const progressKey =

    `course_progress_${courseId}`;

  let completedLessons =

    JSON.parse(

      localStorage.getItem(
        progressKey
      ) || "[]"

    );

  // ========================================
  // LESSON STATE
  // ========================================

  const lessonCompleted =

    completedLessons.includes(
      lessonId
    );

  // ========================================
  // LESSONS SIDEBAR
  // ========================================

  const lessonsHtml =

    course.lessons.map(
      (item) => {

        const active =

          item.id === lessonId;

        const completed =

          completedLessons.includes(
            item.id
          );

        return `

          <div

            class="
              lesson-sidebar-item
              ${
                active
                  ? "active"
                  : ""
              }
            "

            data-lesson-id="${item.id}"

          >

            <span>

              ${
                completed
                  ? "✅"
                  : "📘"
              }

            </span>

            <span>

              ${item.title}

            </span>

          </div>

        `;
      }
    ).join("");

  // ========================================
  // NEXT LESSON
  // ========================================

  const currentIndex =

    course.lessons.findIndex(
      item =>
        item.id === lessonId
    );

  const nextLesson =

    course.lessons[
      currentIndex + 1
    ];

  // ========================================
  // COURSE COMPLETED
  // ========================================

  const courseCompleted =

    localStorage.getItem(

      `course_completed_${courseId}`

    ) === "true";

  // ========================================
  // ACTION BUTTON
  // ========================================

  let actionButton = "";

  // ========================================
  // NEXT LESSON
  // ========================================

  if (nextLesson) {

    actionButton = `

      <button
        id="nextLessonBtn"
        class="next-btn"
      >

        Next Lesson →

      </button>

    `;
  }

  // ========================================
  // FINAL LESSON
  // ========================================

  else {

    if (courseCompleted) {

      actionButton = `

        <button
          class="completed-btn"
          disabled
        >

          🏆 Course Completed

        </button>

        <p class="review-note">

          You can review lessons anytime.

        </p>

      `;
    }

    else {

      actionButton = `

        <button
          id="completeCourseBtn"
          class="complete-course-btn"
        >

          🎉 Complete Course

        </button>

      `;
    }
  }

  // ========================================
  // PAGE CONTENT
  // ========================================

  const content = `

    <div class="learn-layout">

      <!-- SIDEBAR -->

      <div class="learn-sidebar">

        <h2>

          Lessons

        </h2>

        ${lessonsHtml}

      </div>

      <!-- CONTENT -->

      <div class="learn-content">

        <h1>

          ${course.title}

        </h1>

        <h2>

          ${lesson.title}

        </h2>

        <!-- VIDEO -->

        <div class="video-player">

          <div
            class="video-overlay"
            id="playVideoBtn"
          >

            ${
              lessonCompleted
                ? "↻"
                : "▶"
            }

          </div>

          <div class="video-info">

            <h3>

              ${lesson.title}

            </h3>

            <p>

              ${
                lesson.duration
                || "10:00"
              }

            </p>

          </div>

          <div
            class="video-status"
            id="videoStatus"
          >

            ${
              lessonCompleted

                ? "✅ Completed • Click to Review"

                : "Ready to play"
            }

          </div>

          <div class="video-progress">

            <div
              class="video-progress-fill"
              style="
                width:
                ${
                  lessonCompleted
                    ? "100%"
                    : "0%"
                }
              "
            ></div>

          </div>

        </div>

        <!-- DESCRIPTION -->

        <div class="lesson-content-box">

          ${lesson.content}

        </div>

        <!-- ACTIONS -->

        <div class="lesson-actions">

          ${actionButton}

        </div>

      </div>

    </div>

  `;

  // ========================================
  // RENDER
  // ========================================

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(
      content
    );

  // ========================================
  // SIDEBAR CLICK
  // ========================================

  document
    .querySelectorAll(
      ".lesson-sidebar-item"
    )
    .forEach((item) => {

      item.onclick = () => {

        navigate(

          `/learn/${
            courseId
          }/${
            item.dataset.lessonId
          }`

        );
      };
    });

  // ========================================
  // NEXT LESSON
  // ========================================

  if (nextLesson) {

    document.querySelector(
      "#nextLessonBtn"
    ).onclick = () => {

      navigate(

        `/learn/${
          courseId
        }/${
          nextLesson.id
        }`

      );
    };
  }

  // ========================================
  // COMPLETE COURSE
  // ========================================

  const completeBtn =

    document.querySelector(
      "#completeCourseBtn"
    );

  if (completeBtn) {

    completeBtn.onclick = () => {

      // ====================================
      // CHECK ALL LESSONS
      // ====================================

      if (

        completedLessons.length
        <
        course.lessons.length

      ) {

        alert(

          "Please complete all lessons first."

        );

        return;
      }

      // ====================================
      // SAVE COMPLETED
      // ====================================

      localStorage.setItem(

        `course_completed_${
          courseId
        }`,

        "true"

      );

      // ====================================
      // CERTIFICATE
      // ====================================

      let certificates =

        JSON.parse(

          localStorage.getItem(
            "certificates"
          ) || "[]"

        );

      const exists =

        certificates.find(
          item =>
            item.courseId === courseId
        );

      if (!exists) {

        certificates.push({

          courseId,

          title:
            course.title,

          date:
            new Date()
              .toLocaleDateString()

        });

        localStorage.setItem(

          "certificates",

          JSON.stringify(
            certificates
          )

        );
      }

      // ====================================
      // XP
      // ====================================

      let xp =

        Number(

          localStorage.getItem(
            "xp"
          ) || 0

        );

      xp += 300;

      localStorage.setItem(
        "xp",
        xp
      );

      // ====================================
      // RELOAD
      // ====================================

      renderLearnPage();
    };
  }

  // ========================================
  // VIDEO PLAYER
  // ========================================

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

  let playing = false;

  playBtn.onclick = () => {

    if (playing) {
      return;
    }

    playing = true;

    playBtn.innerHTML =
      "⏸";

    videoStatus.innerText =
      "Playing lesson...";

    let progress = 0;

    progressFill.style.width =
      "0%";

    const interval =

      setInterval(() => {

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

          playBtn.innerHTML =
            "↻";

          videoStatus.innerText =

            "✅ Completed • Click to Review";

          // ================================
          // FIRST TIME ONLY
          // ================================

          const firstCompletion =

            !completedLessons.includes(
              lessonId
            );

          if (firstCompletion) {

            completedLessons.push(
              lessonId
            );

            localStorage.setItem(

              progressKey,

              JSON.stringify(
                completedLessons
              )

            );

            // ==============================
            // WATCHED LESSONS
            // ==============================

            let watchedLessons =

              Number(

                localStorage.getItem(
                  "watched_lessons_today"
                ) || 0

              );

            watchedLessons += 1;

            localStorage.setItem(

              "watched_lessons_today",

              watchedLessons

            );
          }

          playing = false;
        }

      }, 60);
  };

}