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

export async function renderDashboardPage() {

  // ========================================
  // USER
  // ========================================

  const user =

    JSON.parse(

      localStorage.getItem(
        "user"
      ) || "{}"

    );

  // ========================================
  // ENROLLED COURSES
  // ========================================

  const enrolledCourses =

    JSON.parse(

      localStorage.getItem(
        "enrolled_courses"
      ) || "[]"

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

        return (

          localStorage.getItem(

            `course_completed_${
              course.id
            }`

          ) === "true"

        );
      }
    );

  // ========================================
  // CERTIFICATES
  // ========================================

  const certificates =

    JSON.parse(

      localStorage.getItem(
        "generated_certificates"
      ) || "[]"

    );

  // ========================================
  // STREAK
  // ========================================

  const streak =

    Number(

      localStorage.getItem(
        "learning_streak"
      ) || 0

    );

  // ========================================
  // XP + LEVEL
  // ========================================

  const xp =

    Number(

      localStorage.getItem(
        "user_xp"
      ) || 0

    );

  const level =

    Math.floor(
      xp / 200
    ) + 1;

  const nextLevelXp =

    level * 200;

  // ========================================
  // CLAIMED REWARDS
  // ========================================

  const claimedRewards =

    JSON.parse(

      localStorage.getItem(
        "claimed_rewards"
      ) || "[]"

    );

  // ========================================
  // DAILY MISSIONS
  // ========================================

  const watchedLessons =

    Number(

      localStorage.getItem(
        "watched_lessons_today"
      ) || 0

    );

  const generatedCertificates =

    certificates.length;

  const dailyMissions = [

    {
      id:
        "complete_1",

      title:
        "Complete 1 lesson",

      completed:
        watchedLessons >= 1,

      reward:
        "+50 XP"
    },

    {
      id:
        "watch_3",

      title:
        "Watch 3 lessons",

      completed:
        watchedLessons >= 3,

      reward:
        "+150 XP"
    },

    {
      id:
        "certificate",

      title:
        "Earn certificate",

      completed:
        generatedCertificates >= 1,

      reward:
        "+300 XP"
    }

  ];

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

        `course_progress_${
          course.id
        }`;

      const completedLessons =

        JSON.parse(

          localStorage.getItem(
            progressKey
          ) || "[]"

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

        localStorage.getItem(

          `course_completed_${
            course.id
          }`

        ) === "true";

      const lastLesson =

        localStorage.getItem(

          `last_lesson_${
            course.id
          }`

        ) || 1;

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

              ${

            isCompleted

               ? "🔁 Review Learning"

               : "Continue Learning"

            }

            </button>

            ${

              isCompleted

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
                ${
                  (
                    xp
                    /
                    nextLevelXp
                  ) * 100
                }%
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

                  ${
                    mission.completed
                      ? "completed"
                      : ""
                  }
                "
              >

                <div
                  class="mission-left"
                >

                  <span>

                    ${
                      mission.completed
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

                  ${

                    mission.completed
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

          `/learn/${
            button.dataset.courseId
          }/${
            button.dataset.lessonId
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

          Number(

            button.dataset.reward
              .replace("+", "")
              .replace(" XP", "")

          );

        let xp =

          Number(

            localStorage.getItem(
              "user_xp"
            ) || 0

          );

        xp += reward;

        localStorage.setItem(
          "user_xp",
          xp
        );

        claimedRewards.push(
          button.dataset.missionId
        );

        localStorage.setItem(

          "claimed_rewards",

          JSON.stringify(
            claimedRewards
          )

        );

        // ====================================
        // RERENDER
        // ====================================

        renderDashboardPage();
      };
    });

// ========================================
// CERTIFICATE MODAL
// ========================================

document
  .querySelectorAll(
    ".certificate-btn"
  )
  .forEach((button) => {

    button.onclick = () => {

      openCertificateModal({

        studentName:

          user?.name ||

          "Student",

        courseTitle:

          button.dataset.courseTitle

      });
    };
  });

}