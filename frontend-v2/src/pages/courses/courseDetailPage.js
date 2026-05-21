// ============================================
// COURSE DETAIL PAGE
// Detail-driven learning runtime
// ============================================

import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

import {

  bindLessonItems,

  startLearning,

  continueLearning

}
  from "./courseActions.js";

import {
  STORAGE_KEYS
}
  from "../../constants/storageKeys.js";

import {
  loadCourseDetail
}
  from "../../engines/contentSourceEngine.js";

// ============================================
// RENDER COURSE DETAIL PAGE
// ============================================

export async function renderCourseDetailPage() {

  // ==========================================
  // ROUTE PARAM
  // ==========================================

  const id =

    window.location.pathname
      .split("/")
      .pop();

  // ==========================================
  // LOAD COURSE DETAIL
  // ==========================================

  const result =

    await loadCourseDetail(
      id
    );

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (!result.ok) {

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

  // ==========================================
  // COURSE
  // ==========================================

  const course =
    result.data;

  // ==========================================
  // ENROLLED
  // ==========================================

  const enrolledCourses =

    JSON.parse(

      localStorage.getItem(
        STORAGE_KEYS.ENROLLED_COURSES
      ) || "[]"

    );

  const isEnrolled =

    enrolledCourses.includes(
      course.id
    );

  // ==========================================
  // LESSON CARDS
  // ==========================================

  const lessonsHtml =

    (course.lessons || [])
      .map(

        (
          lesson,
          index
        ) => `

          <div
            class="lesson-item"
            data-lesson-id="${lesson.id}"
          >

            <div class="lesson-index">

              ${index + 1}

            </div>

            <div class="lesson-label">

              Bài học ${index + 1}

            </div>

            <div class="lesson-content">

              <h3>

                ${lesson.title}

              </h3>

              <p>

                ${lesson.description || "Bài học thực hành Office"}

              </p>

            </div>

            <div class="lesson-action">

              Tiếp tục học →

            </div>

          </div>

        `
      )
      .join("");

  // ==========================================
  // CONTENT
  // ==========================================

  const content = `

    <div class="page course-detail-page">

      <!-- ================================= -->
      <!-- HERO -->
      <!-- ================================= -->

      <section class="course-hero">

        <div class="course-hero-content">

          <div class="course-badge">

            ⚡ Lộ trình học thực hành

          </div>

          <h1>

            ${course.title}

          </h1>

          <p class="course-description">

            ${course.description}

          </p>

          <div class="course-meta">

            <div class="course-meta-item">

              👥 ${course.students || 0}+ học viên

            </div>

            <div class="course-meta-item">

              ⏱ ${course.duration || "Đang cập nhật"}

            </div>

            <div class="course-meta-item">

              🎯 ${course.level || "Practical"}

            </div>

          </div>

          <!-- PRACTICAL -->

          <div class="course-practical-box">

            <h3>

              Học theo hướng thực hành & sát thực tế

            </h3>

            <p>

              Khóa học giúp người học luyện tập
              theo workflow thực tế, làm quen với
              môi trường MOS và từng bước xây dựng
              sự tự tin khi sử dụng Office.

            </p>

          </div>

          <!-- ACTIONS -->

          <div class="course-actions">

            <button
              class="btn-primary"
              id="startLearning"
            >

              ${isEnrolled

      ? "BẮT ĐẦU HỌC"

      : "THAM GIA LỘ TRÌNH"

    }

            </button>

            <button
              class="btn-secondary"
              id="continueLearning"
            >

              TIẾP TỤC HỌC

            </button>

          </div>

        </div>

        <!-- VISUAL -->

        <div class="course-hero-visual">

          <div class="course-visual-card">

            <div class="course-visual-label">

              MOS CONTINUITY

            </div>

            <div class="course-visual-thumbnail">

              ${course.thumbnail || "📘"}

            </div>

            <div class="course-visual-points">

              <div class="visual-point">
                ✅ Luyện thi sát thực tế
              </div>

              <div class="visual-point">
                ✅ Học qua video & thực hành
              </div>

              <div class="visual-point">
                ✅ Quiz & tiếp tục bài học
              </div>

              <div class="visual-point">
                ✅ Duy trì tiến trình học tập
              </div>

            </div>

          </div>

        </div>

      </section>

      <!-- ================================= -->
      <!-- LESSONS -->
      <!-- ================================= -->

      <section class="course-lessons">

        <div class="section-heading">

          <h2>

            Nội dung khóa học

          </h2>

          <p>

            Học theo từng bài nhỏ,
            luyện tập liên tục và từng bước
            xây dựng kỹ năng Office thực tế.

          </p>

        </div>

        <div class="lessons-list">

          ${lessonsHtml}

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
  // LESSON ACTIONS
  // ==========================================

  bindLessonItems({

    course

  });

  // ==========================================
  // START LEARNING
  // ==========================================

  document.querySelector(
    "#startLearning"
  ).onclick = () => {

    startLearning({

      course,
      isEnrolled,

      onEnroll:
        renderCourseDetailPage

    });
  };

  // ==========================================
  // CONTINUE LEARNING
  // ==========================================

  document.querySelector(
    "#continueLearning"
  ).onclick = () => {

    continueLearning({

      course

    });
  };
}