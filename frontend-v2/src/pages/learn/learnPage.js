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

  renderLessonBlocks,

  bindPracticeMissions,

  bindQuizInteractions,

  renderPracticeSection

}
  from "../../engines/lessonBlockRendererEngine.js";

import {
  filterLessonBlocks
}
  from "../../engines/lessonBlockFilterEngine.js";

import {
  normalizeLesson
}
  from "../../engines/lessonNormalizer.js";  

import {

  composeLesson

}
  from "../../runtime/_future/compositionEngine.js";


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

  const normalizedLesson =

    normalizeLesson(
      lesson
    );

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
  // FILTERED BLOCKS
  // ========================================

  console.log(
    "LESSON BLOCKS",
    lesson.blocks
  );

  console.log(
    "NORMALIZED BLOCKS",
    normalizedLesson.blocks
  );  
  
  const filteredBlocks =    
  
  filterLessonBlocks(

      normalizedLesson.blocks || [],

      {

        progressPercent,

        isEnrolled:
          true
      }

    );

  console.log(
    "FILTERED BLOCKS",
    filteredBlocks
  );  


  // ========================================
  // COMPOSED FLOW
  // ========================================

  const runtimeBlocks =
    filteredBlocks.flow ||
    filteredBlocks.blocks ||
    filteredBlocks;

  // ========================================
  // BLOCK RENDERER
  // ========================================

  const lessonBlocksHtml =  
  
  renderLessonBlocks(
      runtimeBlocks
    );

  console.log(
    "CURRENT LESSON",
    lesson
  );

  console.log(
    "CURRENT BLOCKS",
    lesson.blocks
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
        
        <!-- LESSON BLOCKS -->

        <section class="lesson-blocks-section">

          ${lessonBlocksHtml}

        </section>

        <!-- PRACTICE -->

          ${renderPracticeSection(

          normalizedLesson.practice || []

          )}
        
        <!-- ACTIONS -->

        <section class="lesson-actions-section">

         ${actionButton}

        </section>
        
        <!-- QUIZ -->

        ${renderQuizSection(
        normalizedLesson.blocks
          ?.filter(
            block => block.type === "quiz"
          )
          ?.flatMap(
            block => block.assessment?.questions || []
          )

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

  // ========================================
  // PRACTICE MISSIONS
  // ========================================

  bindPracticeMissions();
  
  bindQuiz({

    quiz:

      normalizedLesson.blocks
        ?.filter(
          block => block.type === "quiz"
        )
        ?.flatMap(
          block => block.assessment?.questions || []
        )

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