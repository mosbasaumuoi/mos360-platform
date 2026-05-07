// ============================================
// COURSES PAGE
// ============================================

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

export async function renderCoursesPage() {

  const content = `

    <div class="page">

      <h1>
        COURSES
      </h1>

      <div class="courses-grid">

        <div class="course-card">

          <div class="course-image">
            MOS
          </div>

          <h3>
            MOS Excel Expert
          </h3>

          <p>
            Teacher: MOS360
          </p>

          <div class="course-price">
            2.900.000đ
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
}