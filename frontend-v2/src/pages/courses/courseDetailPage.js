import {
  apiGet
}
from "../../services/api.js";

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

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

  const content = `

    <div class="page">

      <div class="course-image">
        ${course.thumbnail}
      </div>

      <h1>
        ${course.title}
      </h1>

      <p>
        Teacher:
        ${course.teacher}
      </p>

      <h2>
        ${course.price.toLocaleString()}đ
      </h2>

      <p>
        Status:
        ${course.status}
      </p>

    </div>

  `;

  document.querySelector(
    "#app"
  ).innerHTML =
    renderAppLayout(
      content
    );
}