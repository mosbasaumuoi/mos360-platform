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

export async function renderLearnPage() {

  const parts =
    window.location.pathname
      .split("/");

  const courseId =
    Number(parts[2]);

  const lessonId =
    Number(parts[3]);

// ========================================
// ENROLL CHECK
// ========================================

const enrolledCourses =

  JSON.parse(

    localStorage.getItem(
      "enrolled_courses"
    ) || "[]"

  );

if (

  !enrolledCourses.includes(
    courseId
  )

) {

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(`

      <div class="page">

        <h1>

          Please enroll first

        </h1>

      </div>

    `);

  return;
}

  // ========================================
  // CURRENT LESSON
  // ========================================

  const result =
    await apiGet(
      `/learn/${courseId}/${lessonId}`,
      {
        silent: true
      }
    );

  if (!result.ok) {

// ========================================
// STREAK
// ========================================

const today =

  new Date()
    .toDateString();

const lastDate =

  localStorage.getItem(
    "last_learning_date"
  );

let streak =

  Number(

    localStorage.getItem(
      "learning_streak"
    ) || 0

  );

if (lastDate !== today) {

  streak += 1;

  localStorage.setItem(
    "learning_streak",
    streak
  );

  localStorage.setItem(
    "last_learning_date",
    today
  );
}
    
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

  // ========================================
  // COURSE DETAIL
  // ========================================

  const courseResult =
    await apiGet(
      `/courses/${courseId}`,
      {
        silent: true
      }
    );

  const course =
    courseResult.data;

  const lesson =
    result.data.lesson;

    // ========================================
    // SAVE LAST LESSON
    // ========================================

localStorage.setItem(

  `last_lesson_${courseId}`,

  lesson.id

);

    // ========================================
    // PROGRESS
    // ========================================

const progressKey =

  `course_progress_${courseId}`;

const completedLessons =

  JSON.parse(

    localStorage.getItem(
      progressKey
    ) || "[]"

  );

if (

  !completedLessons.includes(
    lesson.id
  )

) {

  completedLessons.push(
    lesson.id
  );

  localStorage.setItem(

    progressKey,

    JSON.stringify(
      completedLessons
    )

  );
}

  // ========================================
  // SIDEBAR
  // ========================================

  const lessonList =
    course.lessons.map(
      item => `

        <div

          class="
            lesson-sidebar-item

            ${
              item.id === lesson.id
              ? "active"
              : ""
            }
          "

          data-lesson-id="${item.id}"

        >

          ${

  completedLessons.includes(
    item.id
  )

    ? "✓"

    : item.id === lesson.id

      ? "▶"

      : "○"

}

${item.title}

        </div>

      `
    ).join("");

  // ========================================
  // CONTENT
  // ========================================

  const content = `

    <div class="learn-layout">

      <div class="learn-sidebar">

        <h2>

          Lessons

        </h2>

        ${lessonList}

      </div>

      <div class="learn-main">

        <h1>

          ${course.title}

        </h1>

        <h2>

          ${lesson.title}

        </h2>

        <div class="video-player">

  <iframe

    width="100%"
    height="500"

    src="${lesson.video}"

    title="Lesson Video"

    frameborder="0"

    allowfullscreen

  ></iframe>

        </div>

        <div class="lesson-content">

          ${lesson.content}

        </div>

        <div class="lesson-actions">

          <button
            id="prevLesson"
          >

            Previous

          </button>

          <button
            id="nextLesson"
          >

            Next

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

  // ========================================
  // SIDEBAR NAVIGATION
  // ========================================

  document
    .querySelectorAll(
      ".lesson-sidebar-item"
    )
    .forEach((item) => {

      item.onclick = () => {

        navigate(

          `/learn/${
            courseId
          }/${
            item.dataset.lessonId
          }`

        );
      };
    });

  // ========================================
  // NEXT / PREVIOUS
  // ========================================

  const currentIndex =
    course.lessons.findIndex(
      item =>
        item.id === lesson.id
    );

  const prevLesson =
    course.lessons[
      currentIndex - 1
    ];

  const nextLesson =
    course.lessons[
      currentIndex + 1
    ];

  // PREVIOUS

  const prevButton =
    document.querySelector(
      "#prevLesson"
    );

  if (prevLesson) {

    prevButton.onclick = () => {

      navigate(

        `/learn/${
          courseId
        }/${
          prevLesson.id
        }`

      );
    };

  } else {

    prevButton.disabled =
      true;
  }

  // NEXT

  const nextButton =
    document.querySelector(
      "#nextLesson"
    );

  if (nextLesson) {

    nextButton.onclick = () => {

      navigate(

        `/learn/${
          courseId
        }/${
          nextLesson.id
        }`

      );
    };

  } else {

    nextButton.disabled =
      true;
  }
}