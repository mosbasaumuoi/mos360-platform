import "./courseDetail.css";  

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

export async function renderCourseDetailPage() {

  const id =
    window.location.pathname
      .split("/")
      .pop();

  const result =
    await apiGet(
      `/courses/${id}`,
      {
        silent: true
      }
    );

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

  const course =
    result.data;

// ========================================
// ENROLLED
// ========================================

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

  const content = `

  <div class="page course-detail-page">

    <!-- ================================== -->
    <!-- HERO -->
    <!-- ================================== -->

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

            ${course.thumbnail}

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

    <!-- ================================== -->
    <!-- LESSONS -->
    <!-- ================================== -->

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

        ${course.lessons.map(
      (lesson, index) => `

            <div
              class="lesson-item"
              data-lesson-id="${lesson.id}"
            >

              <div class="lesson-index">

                ${index + 1}

              </div>

              <div class="lesson-content">

                <h3>

                  ${lesson.title}

                </h3>

                <p>

                  ${lesson.content || "Bài học thực hành Office"}

                </p>

              </div>

              <div class="lesson-action">

                Học bài →

              </div>

            </div>

          `
    ).join("")}

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
    ".lesson-item"
  )
  .forEach((item) => {

    item.onclick = () => {

      navigate(

        `/learn/${
          course.id
        }/${
          item.dataset.lessonId
        }`

      );
    };
  });  

// ========================================
// START LEARNING
// ========================================

document.querySelector(
  "#startLearning"
).onclick = () => {

  // ======================================
  // ENROLL
  // ======================================

  if (!isEnrolled) {

    enrolledCourses.push(
      course.id
    );

    localStorage.setItem(

      STORAGE_KEYS.ENROLLED_COURSES,

      JSON.stringify(
        enrolledCourses
      )

    );

    alert(
      "Enroll success!"
    );

    renderCourseDetailPage();

    return;
  }

  // ======================================
  // FIRST LESSON
  // ======================================

  const firstLesson =

    course.lessons?.[0];

  if (!firstLesson) {

    alert(
      "No lessons found."
    );

    return;
  }

  // ======================================
  // START LEARNING
  // ======================================

  navigate(

    `/learn/${
      course.id
    }/${
      firstLesson.id
    }`

  );
};

  // ========================================
  // CONTINUE LEARNING
  // ========================================

  document.querySelector(
    "#continueLearning"
  ).onclick = () => {

    const lastLessonId =

      localStorage.getItem(
        STORAGE_KEYS.LAST_LESSON_PREFIX
        + course.id
      );

    // ======================================
    // FALLBACK
    // ======================================

    const firstLesson =

      course.lessons?.[0];

    const targetLessonId =

      lastLessonId ||

      firstLesson?.id;

    if (!targetLessonId) {

      alert(
        "No lessons found."
      );

      return;
    }

    navigate(

      `/learn/${course.id
      }/${targetLessonId
      }`

    );
  };
}