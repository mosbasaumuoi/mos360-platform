// ============================================
// COURSES PAGE
// ============================================

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

import {
  apiGet
}
from "../../services/api.js";

import {
  renderCourseCard
}
from "../../components/cards/courseCard.js";

import {
  renderErrorState
}
from "../../components/states/errorState.js";

import {
  renderEmptyState
}
from "../../components/states/emptyState.js";

import {
  navigate
}
from "../../core/router.js";

import {
  logCourse,
  logWarn
}
  from "../../utils/logger.js";

import {
  validateCourse
}
  from "../../contracts/course.contract.js";

export async function renderCoursesPage() {

  document.querySelector(
  "#app"
).innerHTML =
  renderAppLayout(`

    <div class="page">

      <h1>
        COURSES
      </h1>

      <p>
        Loading courses...
      </p>

    </div>

  `);
  
  const result =
    await apiGet(
      "/courses",
      {
        silent: true
      }
    );
  
  if (!result.ok) {

  document.querySelector(
    "#app"
  ).innerHTML =
    renderAppLayout(
      renderErrorState(
        "Failed to load courses"
      )
    );

  return;
  }

  const rawCourses =
    result.data || [];

  // ========================================
  // VALIDATE COURSES
  // ========================================

  const courses =

    rawCourses.filter(
      course => {

        const valid =

          validateCourse(
            course
          );

        // ====================================
        // INVALID CONTRACT
        // ====================================

        if (!valid) {

          logWarn(

            "COURSE",

            "invalid course contract",

            course

          );
        }

        return valid;
      }
    );

  if (courses.length === 0) {

  document.querySelector(
    "#app"
  ).innerHTML =
    renderAppLayout(
      renderEmptyState(
        "No courses found"
      )
    );

  return;
}

  const cards =
    courses.map(
      renderCourseCard
    ).join("");

  logCourse(
    "courses loaded",
    {
      total:
        courses.length
    }
  );

  const content = `

    <div class="page courses-page">

  <!-- ==================================== -->
  <!-- HERO -->
  <!-- ==================================== -->

  <section class="courses-hero">

    <div class="courses-hero-content">

      <div class="courses-badge">

        ⚡ Lộ trình học MOS & kỹ năng Office

      </div>

      <h1>

        Học theo lộ trình
        dễ tiếp cận và thực tế.

      </h1>

      <p>

        MOS360 giúp người học luyện thi MOS,
        xây dựng kỹ năng Office thực hành và
        từng bước tự tin hơn trong học tập
        cũng như công việc thực tế.

      </p>

    </div>

    <div class="courses-hero-card">

      <div class="courses-hero-label">

        CONTINUITY

      </div>

      <h3>

        Học tập liên tục,
        không áp lực.

      </h3>

      <div class="courses-hero-points">

        <div class="courses-point">
          ✅ Luyện thi MOS sát thực tế
        </div>

        <div class="courses-point">
          ✅ Video học dễ tiếp cận
        </div>

        <div class="courses-point">
          ✅ Quiz & thực hành liên tục
        </div>

        <div class="courses-point">
          ✅ Tài liệu & tiện ích hỗ trợ
        </div>

      </div>

    </div>

  </section>

  <!-- ==================================== -->
  <!-- PATH SECTION -->
  <!-- ==================================== -->

  <section class="learning-path-section">

    <div class="section-heading">

      <h2>
        Lộ trình học hiện tại
      </h2>

      <p>

        Bắt đầu từ nền tảng MOS cơ bản,
        luyện tập theo từng kỹ năng và
        dần xây dựng sự tự tin trong môi trường thực tế.

      </p>

    </div>

    <div class="courses-grid">

      ${cards}

    </div>

  </section>

</div>

  `;

  document.querySelector(
    "#app"
  ).innerHTML =
    renderAppLayout(
      content
    );

  document
  .querySelectorAll(
    ".course-card"
  )
  .forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const id =
          card.dataset.id;

        logCourse(
          "navigate course detail",
          {
            courseId:
              id
          }
        );

        navigate(
          `/courses/${id}`
        );
      }
    );

  });
  }