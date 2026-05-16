// ============================================
// HOME PAGE
// ============================================

import "./home.css";

import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

import {
  navigate
}
  from "../../core/router.js";

import {
  appContext
}
  from "../../core/appContext.js";

import {
  getStorage
}
  from "../../utils/localStorageHelpers.js";

import {
  STORAGE_KEYS
}
  from "../../constants/storageKeys.js";  

export async function renderHomePage() {

  const user =
    appContext.user;

  const streak =

    getStorage(
      STORAGE_KEYS.USER_STREAK,
      0
    );

  const lastCourse =

    getStorage(
      STORAGE_KEYS.LAST_COURSE,
      null
    );

  const lastLesson =

    getStorage(
      STORAGE_KEYS.LAST_LESSON,
      null
    );

  const hasContinuity =

    user &&
    lastCourse &&
    lastLesson;

  const content = `

<div class="home-page">

<!-- HERO -->

<section class="hero-section">

<div class="hero-content">

<div class="hero-badge">

⚡ Học MOS & kỹ năng Office theo hướng thực hành

</div>

<h1 class="hero-title">

  Học kỹ năng Office
  <span>
    dễ tiếp cận.
  </span>

  Tiến bộ
  <span>
    từng ngày.
  </span>

</h1>

<p class="hero-description">

  MOS360 giúp sinh viên và nhân viên văn phòng
  học Excel, Word và kỹ năng Office theo hướng
  thực hành, dễ hiểu và sát với nhu cầu học tập
  cũng như công việc thực tế.

</p>

<div class="hero-actions">

<button
class="hero-primary-btn"
id="startLearningBtn"
>

Bắt đầu học →

</button>

<button
class="hero-secondary-btn"
id="exploreCoursesBtn"
>

Xem khóa học

</button>

</div>

</div>

<div class="hero-visual">

<div class="hero-card">

<div class="hero-card-label">
  KẾT QUẢ THỰC TẾ
</div>

<div class="hero-card-score">
1000
</div>

<p class="hero-card-text">

  Học viên được luyện tập trong môi trường
  sát với bài thi MOS thực tế, đồng thời xây dựng
  kỹ năng Office hữu ích cho học tập và công việc.

</p>

            <div class="hero-card-list">

              <div class="hero-card-item">
  ✅ Luyện thi MOS sát thi thật
</div>

<div class="hero-card-item">
  ✅ Học kỹ năng Office ứng dụng
</div>

<div class="hero-card-item">
  ✅ Lộ trình học dễ tiếp cận
</div>

            </div>

          </div>

        </div>

      </section>

${hasContinuity ? `

<section class="continuity-section">

  <div class="continuity-card">

    <div class="continuity-top">

      <div>

        <div class="continuity-label">

          TIẾP TỤC HÀNH TRÌNH

        </div>

        <h3>

          Chào mừng quay lại,
          ${user.email}

        </h3>

      </div>

      <div class="continuity-streak">

        🔥 ${streak} ngày

      </div>

    </div>

    <p class="continuity-description">

      Bạn đang duy trì tiến trình học tập rất tốt.
      Hãy tiếp tục bài học gần nhất để giữ nhịp học tự nhiên.

    </p>

    <button
      class="continuity-btn"
      id="continueLearningBtn"
    >

      Tiếp tục học →

    </button>

  </div>

</section>

` : ""}

<!-- TRUST -->

<section class="trust-section">

  <div class="trust-card trust-proof-card">

    <div class="proof-top">

      <div class="proof-badge">
        VERIFIED RESULT
      </div>

      <div class="proof-score">
        1000
      </div>

    </div>

    <div class="proof-content">

      <h3>
          Luyện thi MOS sát thi thật
      </h3>

      <p>

  Học viên được luyện tập với giao diện và cấu trúc
  tương tự bài thi MOS thật, giúp làm quen tốt hơn,
  tự tin hơn và đạt kết quả cao trong kỳ thi thực tế.

</p>

    </div>

    <div class="proof-grid">

      <div class="proof-item">

        <span>
          Spreadsheet Management
        </span>

        <strong>
          100%
        </strong>

      </div>

      <div class="proof-item">

        <span>
          Formulas & Functions
        </span>

        <strong>
          100%
        </strong>

      </div>

      <div class="proof-item">

        <span>
          Data Analysis
        </span>

        <strong>
          100%
        </strong>

      </div>

    </div>

  </div>

  <div class="trust-card">

    <h3>
  Tự tin sử dụng Office
    </h3>

    <p>

  MOS360 không chỉ hướng tới việc thi đậu.
  Học viên còn dần tự tin hơn khi sử dụng
  Excel, Word và các công cụ Office trong
  học tập cũng như công việc thực tế.

    </p>

  </div>

  <div class="trust-card">

    <h3>
  Học tập nhẹ nhàng & liên tục
    </h3>

    <p>

  Nền tảng được thiết kế theo hướng dễ tiếp cận,
  nhẹ nhàng và liên tục, giúp người học duy trì
  việc học mà không cảm thấy áp lực hay quá tải.

    </p>

  </div>

</section>

<!-- PROGRESSION -->

<section class="progression-section">

<div class="progression-content">

<h2>
  Một cách học Office
  dễ tiếp cận hơn.
</h2>

<p>

  MOS360 tập trung vào trải nghiệm học liên tục
  và dễ tiếp cận. Người học có thể bắt đầu đơn giản,
  luyện tập đều đặn và dần tự tin hơn với kỹ năng Office.

</p>

<div class="progression-list">

<div class="progression-item">

<div class="progression-number">
1
</div>

<div>
Bắt đầu với nền tảng Office cơ bản.
</div>

</div>

<div class="progression-item">

<div class="progression-number">
2
</div>

<div>
Luyện tập với môi trường sát bài thi thật MOS.
</div>

</div>

<div class="progression-item">

<div class="progression-number">
3
</div>

<div>
Tự tin hơn trong học tập và công việc.
</div>

</div>

</div>

</div>

<div class="progression-visual">

<div class="progression-visual-title">
TIẾN TRÌNH HỌC TẬP
</div>

<div class="progression-bar">

<div class="progression-bar-fill"></div>

</div>

<div class="progression-visual-text">

  MOS360 được thiết kế để giúp người học duy trì
  động lực học tập, tiếp tục bài học một cách tự nhiên
  và từng bước cải thiện kỹ năng Office theo thời gian.

</div>

</div>

</section>

<!-- FINAL CTA -->

<section class="final-cta">

<h2>
  Xây dựng kỹ năng Office thực tế.
</h2>

<p>

  MOS360 kết hợp giữa học kỹ năng Office thực hành,
  luyện thi MOS và trải nghiệm học liên tục nhằm giúp
  người học tự tin hơn trong học tập, đại học và công việc thực tế.

</p>

<button
class="hero-primary-btn"
id="finalStartBtn"
>

Bắt đầu hành trình học →

</button>

</section>

</div>

`;

  document.querySelector("#app")
    .innerHTML =
    renderAppLayout(content);

  // ========================================
  // ACTIONS
  // ========================================

  document.querySelector(
    "#startLearningBtn"
  ).onclick = () => {

    navigate("/courses");
  };

  document.querySelector(
    "#exploreCoursesBtn"
  ).onclick = () => {

    navigate("/courses");
  };

  document.querySelector(
    "#finalStartBtn"
  ).onclick = () => {

    navigate("/courses");
  };

  // ========================================
  // CONTINUE LEARNING
  // ========================================

  const continueBtn =

    document.querySelector(
      "#continueLearningBtn"
    );

  if (
    continueBtn &&
    lastCourse &&
    lastLesson
  ) {

    continueBtn.onclick = () => {

      navigate(
        `/learn/${lastCourse}/${lastLesson}`
      );
    };
  }
}

