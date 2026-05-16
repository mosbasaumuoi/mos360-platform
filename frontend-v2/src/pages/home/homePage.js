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

export async function renderHomePage() {

  const content = `

<div class="home-page">

<!-- HERO -->

<section class="hero-section">

<div class="hero-content">

<div class="hero-badge">

⚡ Practical Office Skills & MOS Progression

</div>

<h1 class="hero-title">

Learn Office Skills
<span>
Calmly.
</span>

Progress
<span>
Confidently.
</span>

</h1>

<p class="hero-description">

MOS360 helps students and office workers
build real Microsoft Office skills through
practical learning, real exam simulation,
and continuous progression.

</p>

<div class="hero-actions">

<button
class="hero-primary-btn"
id="startLearningBtn"
>

Start Learning →

</button>

<button
class="hero-secondary-btn"
id="exploreCoursesBtn"
>

Explore Courses

</button>

</div>

</div>

<div class="hero-visual">

<div class="hero-card">

<div class="hero-card-label">
REAL RESULTS
</div>

<div class="hero-card-score">
1000
</div>

<p class="hero-card-text">

              MOS360 helps learners practice in an
              environment close to the real exam while
              building practical office confidence for
              study and work.

            </p>

            <div class="hero-card-list">

              <div class="hero-card-item">
                ✅ Real exam simulation
              </div>

              <div class="hero-card-item">
                ✅ Practical Office learning
              </div>

              <div class="hero-card-item">
                ✅ Calm progression experience
              </div>

            </div>

          </div>

        </div>

      </section>
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
        Real MOS Exam Readiness
      </h3>

      <p>

        MOS360 learners practice in environments
        closely aligned with the real MOS exam,
        helping them build familiarity, confidence,
        and strong performance under real conditions.

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
      Practical Confidence
    </h3>

    <p>

      MOS360 is not only about passing exams.
      Learners gradually become more confident
      using Excel, Word, and Office tools in
      real university and workplace situations.

    </p>

  </div>

  <div class="trust-card">

    <h3>
      Calm Progression
    </h3>

    <p>

      The platform is designed to feel lightweight,
      approachable, and continuous — helping learners
      keep progressing without pressure or overwhelm.

    </p>

  </div>

</section>

<!-- PROGRESSION -->

<section class="progression-section">

<div class="progression-content">

<h2>
A smoother way
to build Office skills.
</h2>

<p>

MOS360 focuses on calm continuity.
Learners can start easily, practice
consistently, and gradually build practical
confidence without feeling overwhelmed.

</p>

<div class="progression-list">

<div class="progression-item">

<div class="progression-number">
1
</div>

<div>
Start with guided Office fundamentals.
</div>

</div>

<div class="progression-item">

<div class="progression-number">
2
</div>

<div>
Practice in realistic MOS environments.
</div>

</div>

<div class="progression-item">

<div class="progression-number">
3
</div>

<div>
Build confidence for study and work.
</div>

</div>

</div>

</div>

<div class="progression-visual">

<div class="progression-visual-title">
LEARNING CONTINUITY
</div>

<div class="progression-bar">

<div class="progression-bar-fill"></div>

</div>

<div class="progression-visual-text">

MOS360 is designed to preserve momentum.
Learners can continue lessons naturally,
review progress clearly, and steadily improve
practical Office skills over time.

</div>

</div>

</section>

<!-- FINAL CTA -->

<section class="final-cta">

<h2>
Build real Office confidence.
</h2>

<p>

MOS360 combines practical Office learning,
MOS exam preparation, and progression-based
continuity to help learners feel more capable
in school, university, and real work.

</p>

<button
class="hero-primary-btn"
id="finalStartBtn"
>

Start Your Progression →

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
}

