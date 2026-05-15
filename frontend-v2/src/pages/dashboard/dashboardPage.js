import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

import {
  apiGet
}
  from "../../services/api.js";

import {
  navigate
}
  from "../../core/router.js";

import html2canvas
  from "html2canvas";

import jsPDF
  from "jspdf";

import {
  openCertificateModal
}
  from "../../components/certificate/certificateModal.js";

import {
  getUserStreak,
  getDailyMissions
}
  from "../../features/progression/missionEngine.js";

import {
  logDashboard
}
  from "../../utils/logger.js";

import {
  getLevel,
  getNextLevelXp,
  getLevelProgress
}
  from "../../engines/xpEngine.js";

import {
  getStorage,
  setStorage
}
  from "../../utils/localStorageHelpers.js";  

import {
  STORAGE_KEYS
}
  from "../../constants/storageKeys.js";  

import {
  parseXpReward
}
  from "../../engines/rewardEngine.js";  

import {
  getCourseCompletedKey,
  getLastLessonKey
}
  from "../../utils/storageHelpers.js";  

export async function renderDashboardPage() {

  // ========================================
  // USER
  // ========================================

  const user =  
    getStorage(
      STORAGE_KEYS.USER,
      {}
    );
    
  // ========================================
  // ENROLLED COURSES
  // ========================================

  const enrolledCourses =

    getStorage(
      STORAGE_KEYS.ENROLLED_COURSES,
      []
    );

  // ========================================
  // EMPTY STATE
  // ========================================

  if (
    enrolledCourses.length === 0
  ) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <div class="page">

          <h1>
            DASHBOARD
          </h1>

          <p>
            No enrolled courses yet.
          </p>

        </div>

      `);

    return;
  }

  // ========================================
  // LOAD COURSES
  // ========================================

  const result =

    await apiGet(
      "/courses",
      {
        silent: true
      }
    );

  const allCourses =
    result.data || [];

  const courses =

    allCourses.filter(
      course =>

        enrolledCourses.includes(
          course.id
        )
    );

  // ========================================
  // COMPLETED COURSES
  // ========================================

  const completedCourses =

    courses.filter(
      course => {

        const progressKey =

          STORAGE_KEYS.COURSE_PROGRESS_PREFIX
          + course.id;

        const completedLessons =

          getStorage(
            progressKey,
            []
          );

        const totalLessons =

          course.lessons?.length || 0;

        return (

          completedLessons.length >= totalLessons
          &&
          totalLessons > 0

        );
      }
    );

  // ========================================
  // CERTIFICATES
  // ========================================

  const certificates =

    getStorage(
      STORAGE_KEYS.CREDENTIALS,
      []
    );
  // ========================================
  // XP + LEVEL
  // ========================================
  
  const xp =

    getStorage(
      STORAGE_KEYS.USER_XP,
      0
    );

  const level =
    getLevel(xp);

  const progressPercent =
    getLevelProgress(
      xp,
      level
    );

  const nextLevelXp =
    getNextLevelXp(level);

  const streak =
    getUserStreak();

  logDashboard(
    "dashboard rendered",
    {
      xp,
      level,
      streak
    }
  );

  // ========================================
  // CLAIMED REWARDS
  // ========================================

  const claimedRewards =

    getStorage(
      STORAGE_KEYS.CLAIMED_REWARDS,
      []
    );

  // ========================================
  // MISSION STATS
  // ========================================

  const watchedLessons =

    getStorage(
      STORAGE_KEYS.WATCHED_LESSONS_TODAY,
      0
    );

  const generatedCertificates =

    certificates.length;

  // ========================================
  // DAILY MISSIONS
  // ========================================

  const dailyMissions =

    getDailyMissions({

      watchedLessons,

      generatedCertificates

    });

  // ========================================
  // BADGES
  // ========================================

  const badges = [];

  if (streak >= 1) {

    badges.push(
      "🔥 First Streak"
    );
  }

  if (
    completedCourses.length >= 1
  ) {

    badges.push(
      "📘 First Course"
    );
  }

  if (level >= 5) {

    badges.push(
      "⚡ Level 5"
    );
  }

  // ========================================
  // COURSE ITEMS
  // ========================================

  const items =

    courses.map((course) => {

      const progressKey =

        STORAGE_KEYS.COURSE_PROGRESS_PREFIX
        + course.id;

      const completedLessons =

        getStorage(
          progressKey,
          []
        );

      const totalLessons =

        course.lessons.length;

      const progress =

        Math.floor(

          (
            completedLessons.length
            /
            totalLessons
          ) * 100

        );

      const isCompleted =

        completedLessons.length >= totalLessons
        &&
        totalLessons > 0;

      const lastLesson =

        localStorage.getItem(

          getLastLessonKey(
            course.id
          )

        )

        ||

        course.lessons?.[0]?.id;

      return `

        <div
          class="dashboard-course"
        >

          <div
            class="dashboard-thumbnail"
          >

            ${course.thumbnail}

          </div>

          <h2>

            ${course.title}

          </h2>

          <p>

            ${completedLessons.length}
            /
            ${totalLessons}
            lessons completed

          </p>

          <div
            class="progress-bar"
          >

            <div

              class="progress-fill"

              style="
                width:
                ${progress}%
              "

            ></div>

          </div>

          <p>

            ${progress}% completed

          </p>

          <div
            class="dashboard-actions"
          >

            <button

              class="continue-btn"

              data-course-id="${course.id}"

              data-lesson-id="${lastLesson}"

            >

              ${isCompleted

          ? "🔁 Review Learning"

          : "Continue Learning"

        }

            </button>

            ${isCompleted

          ? `

                  <button

                    class="certificate-btn"

                    data-course-title="${course.title}"

                  >

                    🎓 Certificate

                  </button>

                `

          : ""

        }

          </div>

        </div>

      `;
    }).join("");

  // ========================================
  // PAGE
  // ========================================

  const content = `

    <div class="page">

      <h1>

        MOS360 DASHBOARD

      </h1>

      <!-- ANALYTICS -->

      <div
        class="analytics-grid"
      >

        <div
          class="analytics-card"
        >

          <h3>
            Enrolled Courses
          </h3>

          <h2>
            ${courses.length}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            Completed Courses
          </h3>

          <h2>
            ${completedCourses.length}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            Certificates
          </h3>

          <h2>
            ${certificates.length}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            Learning Streak
          </h3>

          <h2>
            🔥 ${streak}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            LEVEL
          </h3>

          <h2>
            ${level}
          </h2>

          <div
            class="xp-bar"
          >

            <div

              class="xp-fill"

              style="
                width:
                ${progressPercent}%
              "

            ></div>

          </div>

          <p>

            ${xp}
            /
            ${nextLevelXp}
            XP

          </p>

        </div>

      </div>

      <!-- DAILY MISSIONS -->

      <div
        class="missions-section"
      >

        <h2>

          📅 Daily Missions

        </h2>

        <div
          class="missions-list"
        >

          ${dailyMissions.map(

    mission => `

              <div
                class="
                  mission-item

                  ${mission.completed
        ? "completed"
        : ""
      }
                "
              >

                <div
                  class="mission-left"
                >

                  <span>

                    ${mission.completed
        ? "✅"
        : "⬜"
      }

                  </span>

                  <span>

                    ${mission.title}

                  </span>

                </div>

                <div
                  class="mission-right"
                >

                  <span
                    class="mission-reward"
                  >

                    ${mission.reward}

                  </span>

                  ${mission.completed
        &&
        !claimedRewards.includes(
          mission.id
        )

        ? `

                        <button

                          class="claim-btn"

                          data-reward="${mission.reward}"

                          data-mission-id="${mission.id}"

                        >

                          CLAIM

                        </button>

                      `

        : ""

      }

                </div>

              </div>

            `

  ).join("")}

        </div>

      </div>

      <!-- COURSES -->

      <div class="dashboard-list">

        ${items}

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
  // CONTINUE BUTTON
  // ========================================

  document
    .querySelectorAll(
      ".continue-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        navigate(

          `/learn/${button.dataset.courseId
          }/${button.dataset.lessonId
          }`

        );
      };
    });

  // ========================================
  // CLAIM REWARD
  // ========================================

  document
    .querySelectorAll(
      ".claim-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        const reward =

          parseXpReward(
            button.dataset.reward
          );

        let xp =

          Number(

            localStorage.getItem(
              STORAGE_KEYS.USER_XP
            ) || 0

          );

        xp += reward;

        localStorage.setItem(
          STORAGE_KEYS.USER_XP,
          xp
        );

        claimedRewards.push(
          button.dataset.missionId
        );

        setStorage(
          STORAGE_KEYS.CLAIMED_REWARDS,
          claimedRewards
        );

        renderDashboardPage();
      };
    });

  // ========================================
  // CERTIFICATE
  // ========================================

  document
    .querySelectorAll(
      ".certificate-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        const credential =

          certificates.find(

            item =>

              item.courseName
              ===
              button.dataset.courseTitle

          );

        openCertificateModal({

          studentName:
            credential?.studentName
            || "Student",

          courseName:
            credential?.courseName
            || button.dataset.courseTitle

        });
      };
    });
}