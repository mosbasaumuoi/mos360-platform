export function getCoursesPage(courses) {

  return `
    <section style="padding:40px;">
      <h1 style="font-size:56px; margin-bottom:30px;">
        Khóa học MOS360
      </h1>

      <div style="
        display:grid;
        gap:20px;
        grid-template-columns:
        repeat(auto-fit,minmax(320px,1fr));
      ">

        ${courses.map(course => `
          <div style="
            background:#07142b;
            border:1px solid #1e2b45;
            border-radius:20px;
            padding:24px;
          ">

            <h3 style="
              font-size:32px;
              margin-bottom:14px;
            ">
              ${course.title}
            </h3>

            <p style="
              color:#bbb;
              line-height:1.6;
              margin-bottom:20px;
            ">
              ${course.description}
            </p>

            <a
              href="/course/${course.slug}"
              style="
                display:inline-block;
                background:#ff6600;
                color:white;
                padding:12px 20px;
                border-radius:12px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Vào học
            </a>

          </div>
        `).join("")}

      </div>
    </section>
  `;
}
