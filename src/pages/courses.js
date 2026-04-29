export function getCoursesPage() {
  return `
    <section style="padding:40px;">
      <h1>Khóa học MOS360</h1>

      <div style="margin-top:20px; display:grid; gap:20px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr));">

        <div style="padding:20px; border:1px solid #333; border-radius:10px;">
          <h3>MOS Excel 365</h3>
          <p>400k - 35 bài học</p>
          <button>Đăng ký</button>
        </div>

        <div style="padding:20px; border:1px solid #333; border-radius:10px;">
          <h3>MOS Word 365</h3>
          <p>350k - 30 bài học</p>
          <button>Đăng ký</button>
        </div>

      </div>
    </section>
  `;
}
