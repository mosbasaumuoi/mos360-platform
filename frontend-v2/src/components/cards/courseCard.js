// ============================================
// COURSE CARD
// ============================================

export function renderCourseCard(
  course
) {

console.log(
  "COURSE CARD:",
  course
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