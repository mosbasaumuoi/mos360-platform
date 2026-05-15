// ============================================
// COURSE CARD
// ============================================
import {
  logCourse
}
  from "../../utils/logger.js";

export function renderCourseCard(
  course
) {

  logCourse(
    "render course card",
    {
      id:
        course.id,

      title:
        course.title
    }
  );

  return `

    <div
  class="course-card"
  data-id="${course.id}"
>

      <div class="course-image">
        ${course.thumbnail}
      </div>

      <h3>
        ${course.title}
      </h3>

      <p>
        Teacher:
        ${course.teacher}
      </p>

      <div class="course-price">
        ${course.price.toLocaleString()}đ
      </div>

    </div>

  `;
}