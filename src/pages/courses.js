export function getCoursesPage(courses) {
  return `
    <section style="padding:40px;">
      <h1>Khóa học MOS360</h1>

      <div style="margin-top:20px; display:grid; gap:20px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr));">

        ${courses.map(course => `
          <div style="padding:20px; border:1px solid #333; border-radius:10px;">
            <h3>${course.name}</h3>
            <p>${course.price} - ${course.lessons} bài học</p>
            <button>Đăng ký</button>
          </div>
        `).join("")}

      </div>
    </section>
  `;
}
