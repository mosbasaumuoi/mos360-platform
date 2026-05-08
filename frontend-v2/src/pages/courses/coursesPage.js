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

  const courses =
    result.data || [];

console.log(
  "COURSES:",
  JSON.stringify(
    courses,
    null,
    2
  )
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
}