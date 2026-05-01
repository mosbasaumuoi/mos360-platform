export function getCourseDetailPage(course) {

  if (!course) {
    return `
      <section style="padding:40px;">
        <h1>Không tìm thấy khóa học</h1>
      </section>
    `;
  }

  return `
    <section style="padding:40px; max-width:900px; margin:auto;">

      <h1 style="
        font-size:56px;
        margin-bottom:20px;
      ">
        ${course.title}
      </h1>

      <p style="
        font-size:20px;
        line-height:1.8;
        color:#bbb;
        margin-bottom:30px;
      ">
        ${course.description}
      </p>

      <a
        href="${course.url}"
        target="_blank"
        style="
          display:inline-block;
          background:#ff6600;
          color:white;
          padding:14px 24px;
          border-radius:12px;
          text-decoration:none;
          font-weight:bold;
        "
      >
        Bắt đầu học
      </a>

    </section>
  `;
}
