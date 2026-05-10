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
  // ENROLLED
  // ========================================

  const enrolledCourses =

    JSON.parse(

      localStorage.getItem(
        "enrolled_courses"
      ) || "[]"

    );

  // ========================================
  // EMPTY
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
  // ITEMS
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
  // CERTIFICATES
  // ========================================
  const streak =

  localStorage.getItem(
    "learning_streak"
  ) || 0;
    
  const certificates =

    JSON.parse(

      localStorage.getItem(
        "generated_certificates"
      ) || "[]"

    );

  // ========================================
  // PAGE
  // ========================================

  const content = `

    <div class="page">

      <h1>

        MOS360 DASHBOARD

      </h1>

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

            ${

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
              ).length

            }

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

      </div>

      <div class="dashboard-list">

        ${items}

      </div>

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

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(
      content
    );

  // ========================================
  // CONTINUE
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
  // CERTIFICATE
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
  // CLOSE
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
  // DOWNLOAD
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
    // TRACK
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