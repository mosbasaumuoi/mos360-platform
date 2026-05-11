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

        const completedLessons =

          JSON.parse(

            localStorage.getItem(

              `course_progress_${
                course.id
              }`

            ) || "[]"

          );

        return (

          completedLessons.length
          ===
          course.lessons.length

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
  // BADGES
  // ========================================

  const badges = [];

  if (streak >= 1) {

    badges.push(
      "🔥 First Streak"
    );
  }

  if (streak >= 7) {

    badges.push(
      "🔥 7 Day Streak"
    );
  }

  if (
    completedCourses.length >= 1
  ) {

    badges.push(
      "📘 First Course"
    );
  }

  if (
    completedCourses.length >= 5
  ) {

    badges.push(
      "🎓 Course Master"
    );
  }

  if (level >= 5) {

    badges.push(
      "⚡ Level 5"
    );
  }

  if (
    certificates.length >= 1
  ) {

    badges.push(
      "🏆 First Certificate"
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

        progress === 100;

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

              Continue Learning

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

          <p>

            XP:
            ${xp}
            /
            ${nextLevelXp}

          </p>

        </div>

      </div>

      <!-- BADGES -->

      <div class="badges-section">

        <h2>

          🏅 Achievements

        </h2>

        <div class="badges-list">

          ${badges.map(

            badge => `

              <div
                class="badge-item"
              >

                ${badge}

              </div>

            `

          ).join("")}

        </div>

      </div>

      <!-- COURSES -->

      <div class="dashboard-list">

        ${items}

      </div>

      <!-- CERTIFICATE MODAL -->

      <div
        id="certificateModal"
        class="certificate-modal"
      >

        <div
          class="certificate-box"
        >

          <h1>

            CERTIFICATE

          </h1>

          <h2>

            OF COMPLETION

          </h2>

          <p>

            This certifies that

          </p>

          <h3
            id="certificateUser"
          >

          </h3>

          <p>

            has successfully completed

          </p>

          <h2
            id="certificateCourse"
          >

          </h2>

          <p
            id="certificateDate"
          >

          </p>

          <div
            class="certificate-actions"
          >

            <button
              id="closeCertificate"
            >

              Close

            </button>

            <button
              id="downloadCertificate"
            >

              Download

            </button>

          </div>

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
  // OPEN CERTIFICATE
  // ========================================

  document
    .querySelectorAll(
      ".certificate-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        document.querySelector(
          "#certificateModal"
        ).style.display =
          "flex";

        document.querySelector(
          "#certificateUser"
        ).innerText =

          user.email || "Student";

        document.querySelector(
          "#certificateCourse"
        ).innerText =

          button.dataset.courseTitle;

        document.querySelector(
          "#certificateDate"
        ).innerText =

          new Date()
            .toLocaleDateString();
      };
    });

  // ========================================
  // CLOSE CERTIFICATE
  // ========================================

  document.querySelector(
    "#closeCertificate"
  ).onclick = () => {

    document.querySelector(
      "#certificateModal"
    ).style.display =
      "none";
  };

  // ========================================
  // DOWNLOAD CERTIFICATE
  // ========================================

  document.querySelector(
    "#downloadCertificate"
  ).onclick = async () => {

    const element =

      document.querySelector(
        ".certificate-box"
      );

    const canvas =

      await html2canvas(
        element
      );

    const url =

      canvas.toDataURL(
        "image/png"
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "certificate.png";

    link.click();

    // ======================================
    // SAVE CERTIFICATE
    // ======================================

    certificates.push({

      course:
        document.querySelector(
          "#certificateCourse"
        ).innerText,

      date:
        new Date()
          .toISOString()

    });

    localStorage.setItem(

      "generated_certificates",

      JSON.stringify(
        certificates
      )

    );
  };
}