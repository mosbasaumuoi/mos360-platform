import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

import {
  apiGet
}
  from "../../services/api.js";

import {
  navigate
}
  from "../../core/router.js";

import html2canvas
  from "html2canvas";

import jsPDF
  from "jspdf";

import {
  openCertificateModal
}
  from "../../components/certificate/certificateModal.js";

import {
  getUserStreak,
  getDailyMissions
}
  from "../../features/progression/missionEngine.js";

import {
  logDashboard
}
  from "../../utils/logger.js";

import {
  getLevel,
  getNextLevelXp,
  getLevelProgress
}
  from "../../engines/xpEngine.js";

import {
  getStorage,
  setStorage
}
  from "../../utils/localStorageHelpers.js";  

import {
  STORAGE_KEYS
}
  from "../../constants/storageKeys.js";  

import {

  bindContinueLearning,

  bindClaimRewards,

  bindCertificates

}
  from "./dashboardActions.js"; 

import {

  getCourseProgress,

  getCompletedCourses

}
  from "./dashboardProgressEngine.js"; 

import {

  getActiveCourse,

  getLearningMomentum

}
  from "../../engines/progressionEngine.js";  

import {

  getLastLesson

}
  from "../../engines/progressionEngine.js";

import {

  getLearnerIdentity

}
  from "../../engines/progressionEngine.js";  

import {

  getLearningRelationship,

  getRelationshipMessage

}
  from "../../engines/progressionEngine.js";  


export async function renderDashboardPage() {

  // ========================================
  // USER
  // ========================================

  const user =  
    getStorage(
      STORAGE_KEYS.USER,
      {}
    );
    
  // ========================================
  // ENROLLED COURSES
  // ========================================

  const enrolledCourses =

    getStorage(
      STORAGE_KEYS.ENROLLED_COURSES,
      []
    );

  // ========================================
  // EMPTY STATE
  // ========================================

  if (
    enrolledCourses.length === 0
  ) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <div class="page">

          <h1>
            DASHBOARD
          </h1>

          <p>
            No enrolled courses yet.
          </p>

        </div>

      `);

    return;
  }

  // ========================================
  // LOAD COURSES
  // ========================================

  const result =

    await apiGet(
      "/courses",
      {
        silent: true
      }
    );

  const allCourses =
    result.data || [];

  const courses =

    allCourses.filter(
      course =>

        enrolledCourses.includes(
          course.id
        )
    );

  // ========================================
  // ACTIVE COURSE
  // ========================================

  const activeCourseRuntime =

    getActiveCourse();

  const activeCourse =

    courses.find(

      course =>

        course.id ===

        activeCourseRuntime?.courseId
    )

    ||

    courses[0];

  // ========================================
  // ACTIVE PROGRESS
  // ========================================

  const activeProgress =

    activeCourse

      ? getCourseProgress({

        courseId:
          activeCourse.id,

        totalLessons:
          activeCourse.lessons
            ?.length || 0
      })

      : {

        progressPercent: 0,

        completedCount: 0,

        totalLessons: 0
      };

  
  // ========================================
  // COMPLETED COURSES
  // ========================================

  const completedCourses =

    getCompletedCourses(
      courses
    );
    
  // ========================================
  // CERTIFICATES
  // ========================================

  const certificates =

    getStorage(
      STORAGE_KEYS.CREDENTIALS,
      []
    );
  // ========================================
  // XP + LEVEL
  // ========================================
  
  const xp =

    getStorage(
      STORAGE_KEYS.USER_XP,
      0
    );

  const level =
    getLevel(xp);

  const progressPercent =
    getLevelProgress(
      xp,
      level
    );

  const nextLevelXp =
    getNextLevelXp(level);

  const streak =
    getUserStreak();

  // ========================================
  // MOMENTUM
  // ========================================

  const momentum =

    getLearningMomentum({

      streak,

      progressPercent:
        activeProgress.progressPercent
    });  

  // ========================================
  // LEARNER IDENTITY
  // ========================================

  const learnerIdentity =

    getLearnerIdentity({

      streak,

      progressPercent:
        activeProgress.progressPercent,

      completedLessons:
        activeProgress.completedCount
    }); 

  // ========================================
  // RELATIONSHIP MEMORY
  // ========================================

  const relationshipMemory =

    getLearningRelationship();

  const relationshipState =

    getRelationshipMessage(
      relationshipMemory
    );  
  
  // ========================================
  // LAST LESSON
  // ========================================

  const lastLessonRuntime =

    getLastLesson();

  // ========================================
  // NEXT LESSON
  // ========================================

  let recommendedLesson = null;

  if (

    activeCourse &&
    lastLessonRuntime

  ) {

    const currentIndex =

      activeCourse.lessons.findIndex(

        lesson =>

          lesson.id ===
          lastLessonRuntime.lessonId
      );

    recommendedLesson =

      activeCourse.lessons[
      currentIndex + 1
      ];
  }

  // ========================================
  // FALLBACK
  // ========================================

  if (

    !recommendedLesson
    &&
    activeCourse?.lessons?.length

  ) {

    recommendedLesson =

      activeCourse.lessons[0];
  }  

  logDashboard(
    "dashboard rendered",
    {
      xp,
      level,
      streak
    }
  );

  // ========================================
  // CLAIMED REWARDS
  // ========================================

  const claimedRewards =

    getStorage(
      STORAGE_KEYS.CLAIMED_REWARDS,
      []
    );

  // ========================================
  // MISSION STATS
  // ========================================

  const watchedLessons =

    getStorage(
      STORAGE_KEYS.WATCHED_LESSONS_TODAY,
      0
    );

  const generatedCertificates =

    certificates.length;

  // ========================================
  // DAILY MISSIONS
  // ========================================

  const dailyMissions =

    getDailyMissions({

      watchedLessons,

      generatedCertificates

    });

  // ========================================
  // BADGES
  // ========================================

  const badges = [];

  if (streak >= 1) {

    badges.push(
      "🔥 First Streak"
    );
  }

  if (
    completedCourses.length >= 1
  ) {

    badges.push(
      "📘 First Course"
    );
  }

  if (level >= 5) {

    badges.push(
      "⚡ Level 5"
    );
  }

  // ========================================
  // CONTINUE LEARNING COURSE
  // ========================================

  const latestCourseId =

    enrolledCourses[0];

  const continueCourse =

    courses.find(
      course =>
        course.id === latestCourseId
    );

  let continueLearningSection = "";

  if (continueCourse) {

    const {

      completedLessons,

      totalLessons,

      progress,

      lastLessonId

    } =

      getCourseProgress(
        continueCourse
      ); 
     

    continueLearningSection = `

      <div class="continue-learning-hero">

        <div class="continue-learning-content">

          <div class="continue-learning-label">

            TIẾP TỤC HỌC

          </div>

          <h2>

            ${continueCourse.title}

          </h2>

          <p>

            Bạn đã hoàn thành
            ${completedLessons.length}
            /
            ${totalLessons}
            bài học.

          </p>

          <div class="continue-learning-progress">

            <div
              class="continue-learning-fill"
              style="
                width:${progress}%
              "
            ></div>

          </div>

          <button
            class="continue-hero-btn"
            data-course-id="${continueCourse.id}"
            data-lesson-id="${lastLessonId}"
          >

            Tiếp tục học →

          </button>

        </div>

        <div class="continue-learning-visual">

          ${continueCourse.thumbnail}

        </div>

      </div>

    `;
  }

  // ========================================
  // COURSE ITEMS
  // ========================================

  const items =

    courses.map((course) => {

      const {

        completedLessons,

        totalLessons,

        progress,

        isCompleted,

        lastLessonId

      } =

        getCourseProgress(
          course
        );
        
      return `

        <div
          class="dashboard-course"
        >

          <div
            class="dashboard-thumbnail"
          >

            ${course.thumbnail}

          </div>

          <h2>

            ${course.title}

          </h2>

          <p>

            ${completedLessons.length}
            /
            ${totalLessons}
            lessons completed

          </p>

          <div
            class="progress-bar"
          >

            <div

              class="progress-fill"

              style="
                width:
                ${progress}%
              "

            ></div>

          </div>

          <p>

            ${progress}% completed

          </p>

          <div
            class="dashboard-actions"
          >

            <button

              class="continue-btn"

              data-course-id="${course.id}"

              data-lesson-id="${lastLessonId}"

            >

              ${isCompleted

          ? "🔁 Review Learning"

          : "Continue Learning"

        }

            </button>

            ${isCompleted

          ? `

                  <button

                    class="certificate-btn"

                    data-course-title="${course.title}"

                  >

                    🎓 Certificate

                  </button>

                `

          : ""

        }

          </div>

        </div>

      `;
    }).join("");

  // ========================================
  // PAGE
  // ========================================

  const content = `

  <!-- LEARNING CONTINUITY -->

<section class="dashboard-learning-focus">

  <div class="active-course-shell">

    <div class="active-course-label">

  ${learnerIdentity.title}

    </div>

    <div class="active-course-label">

      CONTINUE LEARNING

    </div>

    <h2>

      ${activeCourse?.title || "Bắt đầu hành trình học tập"}

    </h2>

    <p>

        ${learnerIdentity.message}

    </p>

    <!-- RELATIONSHIP CONTINUITY -->

  <div class="learning-momentum-card">

  <div class="active-course-label">

    LEARNING CONTINUITY

  </div>

  <p>

    ${relationshipState.message}

  </p>

    </div>

    <div class="learning-progress-shell">

      <div class="learning-progress-top">

        <span>

          ${activeProgress.completedCount}
          /
          ${activeProgress.totalLessons}
          lessons

        </span>

        <strong>

          ${activeProgress.progressPercent}%

        </strong>

      </div>

      <div class="learning-progress-track">

        <div
          class="learning-progress-fill"
          style="
            width:
            ${activeProgress.progressPercent}%
          "
        ></div>

      </div>

    </div>

    <!-- NEXT RECOMMENDATION -->

${recommendedLesson ? `

<div class="learning-momentum-card">

  <div class="active-course-label">

    NEXT FOCUS
  </div>

  <h3>

    ${recommendedLesson.title}

  </h3>

  <p>

    Tiếp tục momentum học tập với
    bài học tiếp theo được đề xuất.

  </p>

</div>

` : ""}


    ${activeCourse ? `

<a
  href="/learn/${activeCourse.id}/${activeCourse.lessons?.[0]?.id || ""}"
  class="continue-learning-btn"
>

  ▶ Tiếp tục học

</a>

    ` : ""}

  </div>

</section>  
    
  <div class="page">

                  <div class="dashboard-hero">

        <div class="dashboard-hero-content">

          <div class="dashboard-label">

            HÀNH TRÌNH HỌC TẬP

          </div>

          <h1>

            Chào mừng bạn quay lại 👋

          </h1>

          <p>

            Mỗi bài học hoàn thành hôm nay
            sẽ giúp bạn tự tin hơn trong học tập,
            công việc và kỳ thi MOS phía trước.

          </p>

          <div class="dashboard-hero-note">

            Bạn đang duy trì rất tốt nhịp học tập của mình.

          </div>

        </div>

        <div class="dashboard-hero-side">

          <div class="dashboard-streak">

            🔥 ${streak} ngày học liên tục

          </div>

          <div class="dashboard-level">

            Level ${level}

          </div>

          <div class="dashboard-xp-card">

            ${xp}
            XP tích lũy

          </div>

        </div>

      </div>

            ${continueLearningSection}

      <!-- ANALYTICS -->

      <div
        class="analytics-grid"
      >

        <div
          class="analytics-card"
        >

          <h3>
            Enrolled Courses
          </h3>

          <h2>
            ${courses.length}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            Completed Courses
          </h3>

          <h2>
            ${completedCourses.length}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            Certificates
          </h3>

          <h2>
            ${certificates.length}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            Learning Streak
          </h3>

          <h2>
            🔥 ${streak}
          </h2>

        </div>

        <div
          class="analytics-card"
        >

          <h3>
            LEVEL
          </h3>

          <h2>
            ${level}
          </h2>

          <div
            class="xp-bar"
          >

            <div

              class="xp-fill"

              style="
                width:
                ${progressPercent}%
              "

            ></div>

          </div>

          <p>

            ${xp}
            /
            ${nextLevelXp}
            XP

          </p>

        </div>

      </div>

      <div class="dashboard-section-heading">

        Tiến trình học tập

      </div>

      <!-- DAILY MISSIONS -->

      <div
        class="missions-section"
      >

        <h2>

          📅 Daily Missions

        </h2>

        <div
          class="missions-list"
        >

          ${dailyMissions.map(

    mission => `

              <div
                class="
                  mission-item

                  ${mission.completed
        ? "completed"
        : ""
      }
                "
              >

                <div
                  class="mission-left"
                >

                  <span>

                    ${mission.completed
        ? "✅"
        : "⬜"
      }

                  </span>

                  <span>

                    ${mission.title}

                  </span>

                </div>

                <div
                  class="mission-right"
                >

                  <span
                    class="mission-reward"
                  >

                    ${mission.reward}

                  </span>

                  ${mission.completed
        &&
        !claimedRewards.includes(
          mission.id
        )

        ? `

                        <button

                          class="claim-btn"

                          data-reward="${mission.reward}"

                          data-mission-id="${mission.id}"

                        >

                          CLAIM

                        </button>

                      `

        : ""

      }

                </div>

              </div>

            `

  ).join("")}

        </div>

      </div>

            <div class="dashboard-section-heading">

        Khóa học của bạn

      </div>
      
      <!-- COURSES -->

      <div class="dashboard-list">

        ${items}

      </div>

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
  // DASHBOARD ACTIONS
  // ========================================

  bindContinueLearning();

  bindClaimRewards({

    claimedRewards,

    renderDashboardPage

  });

  bindCertificates({

    certificates

  });
}