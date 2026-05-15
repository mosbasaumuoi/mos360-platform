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

  const content = `

    <div class="page">

      <h1>
        COURSES
      </h1>

      <div class="courses-grid">

        ${cards}

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