export function getCoursesPage(courses) {

  return `
    <section class="courses-page">

      <h1 class="page-title">
        MOS360 Courses
      </h1>

      <div class="courses-grid">

        ${courses.map(course => `

          <div class="course-card">

            <h2 class="course-title">
              ${course.title}
            </h2>

            <p class="course-desc">
              ${course.description || "Tài liệu học MOS"}
            </p>

            <a 
              href="${course.url}" 
              target="_blank"
              class="download-btn"
            >
              Download
            </a>

          </div>

        `).join("")}

      </div>

    </section>
  `;
}
