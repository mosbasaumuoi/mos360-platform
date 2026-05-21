// ============================================
// COURSES PAGE
// Unified runtime discovery
// ============================================

import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

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
  bindCourseCards
}
  from "./courseActions.js";

import {
  logCourse
}
  from "../../utils/logger.js";

import {
  loadCourses
}
  from "../../engines/contentSourceEngine.js";

// ============================================
// RENDER COURSES PAGE
// ============================================

export async function renderCoursesPage() {

  // ==========================================
  // LOADING
  // ==========================================

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

  // ==========================================
  // LOAD COURSES
  // ==========================================

  const result =

    await loadCourses();

  // ==========================================
  // ERROR
  // ==========================================

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

  // ==========================================
  // COURSES
  // ==========================================

  const courses =

    result.data || [];

  // ==========================================
  // EMPTY
  // ==========================================

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

  // ==========================================
  // CARDS
  // ==========================================

  const cards =

    courses
      .map(
        renderCourseCard
      )
      .join("");

  // ==========================================
  // LOG
  // ==========================================

  logCourse(

    "courses loaded",

    {
      total:
        courses.length
    }

  );

  // ==========================================
  // CONTENT
  // ==========================================

  const content = `

    <div class="page courses-page">

      <!-- HERO -->

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

      <!-- COURSES -->

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

  // ==========================================
  // RENDER
  // ==========================================

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(
      content
    );

  // ==========================================
  // ACTIONS
  // ==========================================

  bindCourseCards();
}