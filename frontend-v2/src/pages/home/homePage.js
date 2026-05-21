import { navigate } from "../../core/router.js";

function attachHomeEvents() {

  document
    .querySelectorAll("[data-route]")

    .forEach((element) => {

      element.onclick = () => {

        const route =

          element.dataset.route;

        if (!route) {
          return;
        }

        navigate(route);
      };
    });
}

export async function renderHomePage() {

  document.querySelector("#app").innerHTML = `

  <div class="page home-page">

    <!-- =====================================
         HERO
    ====================================== -->

    <section class="home-hero">

      <div class="home-hero-content">

        <div class="courses-badge">
          ⚡ Học MOS & kỹ năng Office theo hướng thực hành
        </div>

        <h1 class="home-hero-title">
          Học kỹ năng Office
          <span>dễ tiếp cận.</span>
          Tiến bộ từng ngày.
        </h1>

        <p class="home-hero-description">

          MOS360 giúp sinh viên và nhân viên văn phòng
          luyện MOS và kỹ năng Office theo hướng thực hành,
          dễ hiểu và bám sát nhu cầu học tập cũng như công việc thực tế.

        </p>

        <div class="home-hero-actions">

          <button
            class="btn-primary hero-btn"
            data-route="/courses"
          >
            Bắt đầu học →
          </button>

          <button
            class="btn-secondary hero-btn"
            data-route="/learn"
          >
            Xem lộ trình
          </button>

        </div>

      </div>

      <!-- =====================================
           HERO SIDE PANEL
      ====================================== -->

      <div class="home-hero-panel glass-panel">

        <div class="hero-panel-label">
          KẾT QUẢ THỰC TẾ
        </div>

        <div class="hero-panel-number">
          1000+
        </div>

        <p class="hero-panel-description">

          Học viên được luyện tập trong môi trường sát với bài thi MOS thực tế,
          đồng thời xây dựng kỹ năng Office hữu ích cho học tập và công việc.

        </p>

        <div class="hero-panel-list">

          <div class="hero-panel-item">
            ✅ Luyện thi MOS sát thực tế
          </div>

          <div class="hero-panel-item">
            ✅ Học kỹ năng Office ứng dụng
          </div>

          <div class="hero-panel-item">
            ✅ Lộ trình học dễ tiếp cận
          </div>

        </div>

      </div>

    </section>

    <!-- =====================================
         CONTINUITY SECTION
    ====================================== -->

    <section class="home-continuity">

      <div class="section-heading">

        <h2>
          Học tập nhẹ nhàng & liên tục
        </h2>

        <p>

          MOS360 được xây dựng để giúp người học duy trì tiến bộ từng ngày,
          thay vì tạo cảm giác áp lực hoặc quá tải thông tin.

        </p>

      </div>

      <div class="home-continuity-grid">

        <div class="continuity-card glass-panel motion-lift">

          <div class="continuity-icon">
            🎯
          </div>

          <h3>
            Tiếp cận dễ hơn
          </h3>

          <p>

            Chia nhỏ lộ trình học để người mới
            có thể bắt đầu dễ dàng và duy trì động lực.

          </p>

        </div>

        <div class="continuity-card glass-panel motion-lift">

          <div class="continuity-icon">
            📈
          </div>

          <h3>
            Tiến bộ rõ ràng
          </h3>

          <p>

            Hệ thống giúp người học nhìn thấy
            sự tiến bộ qua từng chặng học tập.

          </p>

        </div>

        <div class="continuity-card glass-panel motion-lift">

          <div class="continuity-icon">
            🧠
          </div>

          <h3>
            Thực hành thực tế
          </h3>

          <p>

            Không chỉ luyện thi,
            mà còn xây dựng kỹ năng Office dùng được trong công việc.

          </p>

        </div>

      </div>

    </section>

    <!-- =====================================
         LEARNING PATH
    ====================================== -->

    <section class="home-learning-path">

      <div class="section-heading">

        <h2>
          Lộ trình học tập rõ ràng
        </h2>

        <p>

          Chọn hướng học phù hợp với mục tiêu của bạn
          và tiến bộ theo từng bước nhỏ ổn định.

        </p>

      </div>

      <div class="home-path-grid">

        <div
          class="course-card interactive-surface"
          data-route="/courses"
        >

          <div class="course-image">

            <div class="course-image-overlay"></div>

            <div class="course-thumbnail-text">
              MOS
            </div>

          </div>

          <div class="course-card-content">

            <div class="course-path-badge">
              MOS CERTIFICATION
            </div>

            <h3>
              Luyện thi MOS
            </h3>

            <p class="course-description">

              Hệ thống học và luyện tập bám sát định dạng bài thi MOS thực tế.

            </p>

            <div class="course-meta">

              <div class="course-meta-item">
                Word
              </div>

              <div class="course-meta-item">
                Excel
              </div>

              <div class="course-meta-item">
                PowerPoint
              </div>

            </div>

          </div>

        </div>

        <div
          class="course-card interactive-surface"
          data-route="/learn"
        >

          <div class="course-image">

            <div class="course-image-overlay"></div>

            <div class="course-thumbnail-text">
              OFFICE
            </div>

          </div>

          <div class="course-card-content">

            <div class="course-path-badge">
              OFFICE SKILLS
            </div>

            <h3>
              Kỹ năng Office ứng dụng
            </h3>

            <p class="course-description">

              Xây dựng kỹ năng Office phục vụ học tập,
              công việc và môi trường văn phòng thực tế.

            </p>

            <div class="course-meta">

              <div class="course-meta-item">
                Thực hành
              </div>

              <div class="course-meta-item">
                Ứng dụng
              </div>

              <div class="course-meta-item">
                Thực tế
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- =====================================
         FINAL CTA
    ====================================== -->

    <section class="home-final-cta glass-panel">

      <div class="home-final-content">

        <div class="home-final-label">
          MOS360
        </div>

        <h2>
          Học thật.
          Tiến bộ thật.
        </h2>

        <p>

          Một hệ thống học tập được thiết kế để giúp bạn
          tiếp cận kỹ năng Office dễ dàng hơn và tiến bộ từng ngày.

        </p>

      </div>

      <div class="home-final-actions">

        <button
          class="btn-primary hero-btn"
          data-route="/courses"
        >
          Khám phá khóa học
        </button>

      </div>

    </section>

  </div>
  `;

  attachHomeEvents();
}
