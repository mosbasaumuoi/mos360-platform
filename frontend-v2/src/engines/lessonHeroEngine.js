// ============================================
// MOS360 LESSON HERO ENGINE
// Stable learning hero runtime
// ============================================

// ============================================
// RENDER HERO
// ============================================

export function renderLessonHero({

  course,
  lesson,
  streak,
  progressPercent,
  completedLessons

}) {

  return `

    <section class="lesson-hero">

      <div class="lesson-badge">

        ⚡ Practical Office Learning

      </div>

      <h1>

        ${lesson.title}

      </h1>

      <p class="lesson-subtitle">

        Học theo hướng thực hành,
        tập trung vào workflow thực tế
        và khả năng ứng dụng Office tự nhiên.

      </p>

      <!-- PROGRESS -->

      <div class="lesson-progress-overview">

        <div class="lesson-progress-top">

          <span>

            Tiến trình khóa học

          </span>

          <span>

            ${progressPercent}%

          </span>

        </div>

        <div class="lesson-progress-bar">

          <div
            class="lesson-progress-fill"
            style="
              width:${progressPercent}%
            "
          ></div>

        </div>

      </div>

      <!-- STATS -->

      <div class="lesson-hero-stats">

        <div class="hero-stat">

          🔥 ${streak} ngày liên tục

        </div>

        <div class="hero-stat">

          ✅ ${completedLessons.length}/${course.lessons.length}
          bài học

        </div>

      </div>

    </section>

  `;
}