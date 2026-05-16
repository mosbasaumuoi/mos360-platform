// ============================================
// LEARN PAGE
// ============================================

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

import {
  STORAGE_KEYS
}
  from "../../constants/storageKeys.js";

import {
  getCourseProgressKey,
  getCourseCompletedKey,
  getLastLessonKey
}
  from "../../utils/storageHelpers.js";

import {
  getXpReward
}
  from "../../engines/rewardEngine.js";

import {
  getStorage,
  setStorage
}
  from "../../utils/localStorageHelpers.js";

import {
  saveCredential
}
  from "../../utils/credentialStorage.js";

import {
  generateCertificateId
}
  from "../../utils/idGenerator.js";

import {
  logLearning,
  logInfo,
  logWarn
}
  from "../../utils/logger.js";

import {
  validateLesson
}
  from "../../contracts/lesson.contract.js";

import {
  sendTrackingEvent
}
  from "../../services/trackingApi.js";  

import {
  addXP
}
  from "../../services/gamificationApi.js";  

// ============================================
// BIND SIDEBAR LESSONS
// ============================================

function bindSidebarLessons(
  courseId
) {

  document
    .querySelectorAll(
      ".lesson-sidebar-item"
    )
    .forEach((item) => {

      item.onclick = () => {

        navigate(

          `/learn/${courseId
          }/${item.dataset.lessonId
          }`

        );
      };
    });
}

// ============================================
// BIND NEXT LESSON
// ============================================

function bindNextLesson({

  courseId,
  nextLesson

}) {

  if (!nextLesson) {
    return;
  }

  const nextBtn =

    document.querySelector(
      "#nextLessonBtn"
    );

  if (!nextBtn) {
    return;
  }

  nextBtn.onclick = () => {

    navigate(

      `/learn/${courseId
      }/${nextLesson.id
      }`

    );
  };
}

// ============================================
// COMPLETE COURSE FLOW
// ============================================

function bindCompleteCourse({

  courseId,
  course,
  completedLessons

}) {

  const completeBtn =

    document.querySelector(
      "#completeCourseBtn"
    );

  if (!completeBtn) {
    return;
  }

  completeBtn.onclick = () => {

    // ======================================
    // CHECK ALL LESSONS
    // ======================================

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

    // ======================================
    // SAVE COMPLETED
    // ======================================

    setStorage(

      getCourseCompletedKey(
        courseId
      ),

      true

    );

    logLearning(
      "course completed",
      courseId
    );

    // ======================================
    // CREDENTIAL
    // ======================================

    saveCredential({

      certificateId:
        generateCertificateId(),

      studentName:
        "MOS360 Student",

      courseName:
        course.title,

      issueDate:
        new Date()
          .toLocaleDateString()

    });

    // ======================================
    // XP
    // ======================================

    let xp =

      getStorage(
        STORAGE_KEYS.USER_XP,
        0
      );

    xp +=
      getXpReward(
        course.xpReward
      );

    setStorage(
      STORAGE_KEYS.USER_XP,
      xp
    );

    // ======================================
    // RELOAD
    // ======================================

    renderLearnPage();
  };
}

// ============================================
// VIDEO PLAYER
// ============================================

function bindVideoPlayer({

  lesson,
  course,
  lessonId,
  courseId,
  progressKey,
  completedLessons

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

            logLearning(
              "lesson completed",
              {
                courseId,
                lessonId
              }
            );

            sendTrackingEvent({

              type:
                "LESSON_COMPLETED",

              courseId,

              lessonId
            });

            setStorage(
              progressKey,
              completedLessons
            );

            addXP({

              email:
                "admin@mos360.vn",

              amount:
                getXpReward(
                  lesson.xpReward
                )
            });

            logInfo(
              "XP",
              "xp updated",
              {
                courseId,
                lessonId,
                xpReward:
                  course.xpReward
              }
            );

            // ==============================
            // WATCHED LESSONS
            // ==============================

            let watchedLessons =

              getStorage(
                STORAGE_KEYS.WATCHED_LESSONS_TODAY,
                0
              );

            watchedLessons += 1;

            setStorage(

              STORAGE_KEYS.WATCHED_LESSONS_TODAY,

              watchedLessons

            );
          }

          playing = false;
        }

      }, 60);
  };
}

// ============================================
// RENDER LEARN PAGE
// ============================================

export async function renderLearnPage() {

  // ========================================
  // URL PARTS
  // ========================================

  const parts =

    window.location.pathname
      .split("/");

  const courseId =
    parts[2];

  const lessonId =
    parts[3];

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
  // VALIDATE LESSON
  // ========================================

  const validLesson =

    validateLesson(
      lesson
    );

  if (!validLesson) {

    logWarn(

      "LESSON",

      "invalid lesson contract",

      lesson

    );

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

      <h1>
        Invalid lesson data
      </h1>

    `);

    return;
  }

  // ========================================
  // SAVE LAST LESSON
  // ========================================

  setStorage(

    getLastLessonKey(
      courseId
    ),

    lessonId

  );

  // ========================================
  // STREAK
  // ========================================

  const today =

    new Date()
      .toDateString();

  const lastDate =

    getStorage(
      STORAGE_KEYS.LAST_ACTIVE_DATE,
      null
    );

  let streak =

    getStorage(
      STORAGE_KEYS.USER_STREAK,
      0
    );

  if (lastDate !== today) {

    streak += 1;

    setStorage(
      STORAGE_KEYS.USER_STREAK,
      streak
    );

    setStorage(
      STORAGE_KEYS.LAST_ACTIVE_DATE,
      today
    );

    logLearning(
      "streak updated",
      streak
    );
  }

  // ========================================
  // PROGRESS
  // ========================================

  const progressKey =

    getCourseProgressKey(
      courseId
    );

  let completedLessons =

    getStorage(
      progressKey,
      []
    );

  // ========================================
  // LESSON STATE
  // ========================================

  const lessonCompleted =

    completedLessons.includes(
      lessonId
    );

  // ========================================
  // SIDEBAR
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
              ${active
            ? "active"
            : ""
          }
            "

            data-lesson-id="${item.id}"

          >

            <span>

              ${completed
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
  // LESSON EXISTS IN COURSE GRAPH
  // ========================================

  const lessonExists =

    course.lessons.some(
      item =>
        item.id === lessonId
    );

  if (!lessonExists) {

    logWarn(

      "LESSON",

      "lesson missing from course graph",

      {
        courseId,
        lessonId
      }

    );

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

      <h1>
        Lesson graph mismatch
      </h1>

    `);

    return;
  }

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

    getStorage(

      getCourseCompletedKey(
        courseId
      ),

      false

    );

  // ========================================
  // ACTION BUTTON
  // ========================================

  let actionButton = "";

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

            ${lessonCompleted
      ? "↻"
      : "▶"
    }

          </div>

          <div class="video-info">

            <h3>
              ${lesson.title}
            </h3>

            <p>

              ${lesson.duration
    || "10:00"
    }

            </p>

          </div>

          <div
            class="video-status"
            id="videoStatus"
          >

            ${lessonCompleted

      ? "✅ Completed • Click to Review"

      : "Ready to play"
    }

          </div>

          <div class="video-progress">

            <div
              class="video-progress-fill"
              style="
                width:
                ${lessonCompleted
      ? "100%"
      : "0%"
    }
              "
            ></div>

          </div>

        </div>

        <!-- CONTENT -->

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
  // INTERACTIONS
  // ========================================

  bindSidebarLessons(
    courseId
  );

  bindNextLesson({

    courseId,

    nextLesson

  });

  bindCompleteCourse({

    courseId,

    course,

    completedLessons

  });

  bindVideoPlayer({

    lesson,

    course,

    lessonId,

    courseId,

    progressKey,

    completedLessons

  });
}