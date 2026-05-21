// ============================================
// LEARN PAGE
// Stable semantic learning runtime
// ============================================

import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

import {
  getLastLessonKey
}
  from "../../utils/storageHelpers.js";

import {
  setStorage
}
  from "../../utils/localStorageHelpers.js";

import {
  bindVideoPlayer
}
  from "../../engines/videoPlayerEngine.js";

import {
  updateLearningStreak
}
  from "../../engines/streakEngine.js";

import {
  renderQuizSection,
  bindQuiz
}
  from "../../engines/quizEngine.js";

import {

  getLessonAction,

  renderLessonAction,

  bindLessonActions

}
  from "../../engines/learnActionEngine.js";

import {

  renderLessonSidebar,

  bindLessonSidebar

}
  from "../../engines/lessonSidebarEngine.js";

import {
  loadLearnPageData
}
  from "../../engines/learnDataEngine.js";

import {
  renderLessonHero
}
  from "../../engines/lessonHeroEngine.js";

import {
  renderLessonBlocks
}
  from "../../engines/lessonBlockRendererEngine.js";

import {
  filterLessonBlocks
}
  from "../../engines/lessonBlockFilterEngine.js";

// ============================================
// RENDER LEARN PAGE
// ============================================

export async function renderLearnPage() {

  // ========================================
  // URL PARTS
  // ========================================

  const parts =

    window.location.pathname
      .split("/");

  const courseId =
    parts[2];

  const lessonId =
    parts[3];

  // ========================================
  // LOAD DATA
  // ========================================

  const data =

    await loadLearnPageData({

      courseId,

      lessonId

    });

  // ========================================
  // ERROR HANDLING
  // ========================================

  if (!data.ok) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <div class="learn-error-page">

          <h1>

            Không thể tải bài học

          </h1>

          <p>

            Vui lòng thử lại sau.

          </p>

        </div>

      `);

    return;
  }

  // ========================================
  // EXTRACT DATA
  // ========================================

  const {

    course,

    lesson,

    completedLessons,

    lessonCompleted,

    nextLesson,

    courseCompleted,

    progressPercent

  } = data;

  // ========================================
  // SAVE LAST LESSON
  // ========================================

  setStorage(

    getLastLessonKey(
      courseId
    ),

    lessonId

  );

  // ========================================
  // STREAK
  // ========================================

  const streak =

    updateLearningStreak();

  // ========================================
  // SIDEBAR
  // ========================================

  const lessonsHtml =

    renderLessonSidebar({

      lessons:
        course.lessons,

      lessonId,

      completedLessons

    });

  // ========================================
  // ACTION ENGINE
  // ========================================

  const action =

    getLessonAction({

      lessonCompleted,

      nextLesson,

      courseCompleted

    });

  const actionButton =

    renderLessonAction({

      action

    });

  // ========================================
  // BLOCK FLOW
  // ========================================

  const runtimeBlocks =

    filterLessonBlocks(

      lesson.blocks || [],

      {

        progressPercent,

        isEnrolled:
          true

      }

    );

  // ========================================
  // BLOCK RENDERER
  // ========================================

  const lessonBlocksHtml =

    renderLessonBlocks(
      runtimeBlocks
    );

  // ========================================
  // PAGE CONTENT
  // ========================================

  const content = `

    <div class="learn-layout">

      <!-- SIDEBAR -->

      <aside class="learn-sidebar">

        <div class="learn-sidebar-top">

          <div class="learn-sidebar-label">

            OFFICE LEARNING

          </div>

          <h2>

            ${course.title}

          </h2>

          <p>

            Học theo workflow thực hành
            và xây dựng kỹ năng Office
            từng bước nhỏ.

          </p>

        </div>

        <div class="lesson-sidebar-list">

          ${lessonsHtml}

        </div>

      </aside>

      <!-- CONTENT -->

      <main class="learn-content">

        <!-- HERO -->

        ${renderLessonHero({

    course,

    lesson,

    streak,

    progressPercent,

    completedLessons

  })}

        <!-- VIDEO LEARNING CORE -->

        <section class="video-learning-core">

          <!-- VIDEO -->

          <div class="video-player-shell">

            <iframe
              class="lesson-video-frame"
              src="${lesson.videoUrl || ""}"
              title="${lesson.title}"
              frameborder="0"
              allowfullscreen
            ></iframe>

          </div>

          <!-- SIDE -->

          <div class="video-learning-side">

            <!-- WORKFLOW -->

            <div class="workflow-mini-card">

              <h3>

                Workflow thực hành

              </h3>

              <ol>

                ${(lesson.workflowSteps || [])
      .map(step => `

                    <li>

                      ${step}

                    </li>

                  `)
      .join("")}

              </ol>

            </div>

            <!-- TIPS -->

            <div class="tips-mini-card">

              <h3>

                Tips nhanh

              </h3>

              <ul>

                ${(lesson.tips || [])
      .map(tip => `

                    <li>

                      ${tip}

                    </li>

                  `)
      .join("")}

              </ul>

            </div>

            <!-- ACTION -->

            <section class="lesson-actions">

              ${actionButton}

            </section>

          </div>

        </section>

        <!-- LESSON BLOCKS -->

        <section class="lesson-blocks-section">

          ${lessonBlocksHtml}

        </section>

        <!-- QUIZ -->

        ${renderQuizSection(
        lesson.quiz || []
      )}

      </main>

    </div>

  `;

  // ========================================
  // RENDER
  // ========================================

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(
      content
    );

  // ========================================
  // SIDEBAR
  // ========================================

  bindLessonSidebar({

    courseId

  });

  // ========================================
  // ACTIONS
  // ========================================

  bindLessonActions({

    action,

    courseId,

    nextLesson,

    course,

    completedLessons

  });

  // ========================================
  // QUIZ
  // ========================================

  bindQuiz({

    quiz:
      lesson.quiz || []

  });

  // ========================================
  // VIDEO PLAYER
  // ========================================

  bindVideoPlayer({

    lesson,

    course,

    lessonId,

    courseId,

    completedLessons,

    onComplete: () => {

      renderLearnPage();

    }

  });
}