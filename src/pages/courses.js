export function getCoursesPage(courses) {

  return `
    <section class="courses-page">

      <h1 class="page-title">
        Khóa học MOS360
      </h1>

      <div class="courses-grid">

        ${courses.map(course => `

          <div class="course-card">

            <h3 class="course-title">
              ${course.name}
            </h3>

            <p class="course-info">
              ${course.price} - ${course.lessons} bài học
            </p>

            <a 
              href="${course.link}" 
              target="_blank"
              class="course-btn"
            >
              Vào học
            </a>

          </div>

        `).join("")}

      </div>

    </section>
  `;
}
