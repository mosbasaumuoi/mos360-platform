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

  <div class="page">

    <div class="course-detail">

      <div class="course-image">

        ${course.thumbnail}

      </div>

      <h1>

        ${course.title}

      </h1>

      <div class="course-meta">

        <p>
          Teacher:
          ${course.teacher}
        </p>

        <p>
          Students:
          ${course.students}
        </p>

        <p>
          Duration:
          ${course.duration}
        </p>

        <p>
          Level:
          ${course.level}
        </p>

      </div>

      <div class="course-price">

        ${course.price.toLocaleString()}đ

      </div>

      <div class="course-description">

        ${course.description}

      </div>

      <div class="course-lessons">

        <h2>
          Lessons
        </h2>

        <ul>

          ${course.lessons.map(
            lesson => `

              <li
  class="lesson-item"
  data-lesson-id="${lesson.id}"
>

  ${lesson.title}

              </li>

            `
          ).join("")}

        </ul>

      </div>

      <div class="course-actions">

  <button
    class="btn-primary"
    id="startLearning"
  >

    ${

  isEnrolled

    ? "START LEARNING"

    : "ENROLL NOW"

}

  </button>

  <button
    class="btn-secondary"
    id="continueLearning"
  >

    CONTINUE LEARNING

  </button>

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