import {
  apiGet
}
from "../../services/api.js";

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

import {
  navigate
}
from "../../core/router.js";

export async function renderLearnPage() {

  const parts =

    window.location.pathname
      .split("/");

  const courseId =
    Number(parts[2]);

  const lessonId =
    Number(parts[3]);

  // ========================================
  // LOAD COURSE
  // ========================================

  const courseResult =

    await apiGet(
      `/courses/${courseId}`,
      {
        silent: true
      }
    );

  if (!courseResult.ok) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <h1>
          Course not found
        </h1>

      `);

    return;
  }

  const course =
    courseResult.data;

  // ========================================
  // LOAD LESSON
  // ========================================

  const lessonResult =

    await apiGet(
      `/learn/${courseId}/${lessonId}`,
      {
        silent: true
      }
    );

  if (!lessonResult.ok) {

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <h1>
          Lesson not found
        </h1>

      `);

    return;
  }

  const data =
    lessonResult.data;

  const lesson =
    data.lesson;

  // ========================================
  // STREAK
  // ========================================

  const today =

    new Date()
      .toDateString();

  const lastDate =

    localStorage.getItem(
      "last_learning_date"
    );

  let streak =

    Number(

      localStorage.getItem(
        "learning_streak"
      ) || 0

    );

  if (lastDate !== today) {

    streak += 1;

    localStorage.setItem(
      "learning_streak",
      streak
    );

    localStorage.setItem(
      "last_learning_date",
      today
    );
  }

  // ========================================
  // SAVE LAST LESSON
  // ========================================

  localStorage.setItem(

    `last_lesson_${courseId}`,

    lessonId

  );

  // ========================================
  // PROGRESS
  // ========================================

  const progressKey =

    `course_progress_${courseId}`;

  let completedLessons =

    JSON.parse(

      localStorage.getItem(
        progressKey
      ) || "[]"

    );

  if (
    !completedLessons.includes(
      lessonId
    )
  ) {

    completedLessons.push(
      lessonId
    );

    localStorage.setItem(

      progressKey,

      JSON.stringify(
        completedLessons
      )

    );
  }

  // ========================================
  // SIDEBAR
  // ========================================

  const lessonsHtml =

    course.lessons.map(
      (item) => {

        const completed =

          completedLessons.includes(
            item.id
          );

        const active =

          item.id === lessonId;

        return `

          <div

            class="
              lesson-sidebar-item

              ${
                active
                  ? "active"
                  : ""
              }
            "

            data-lesson-id="${item.id}"

          >

            <span>

              ${
                completed
                  ? "✅"
                  : "📘"
              }

            </span>

            <span>

              ${item.title}

            </span>

          </div>

        `;
      }
    ).join("");

  // ========================================
  // NEXT LESSON
  // ========================================

  const currentIndex =

    course.lessons.findIndex(
      item =>
        item.id === lessonId
    );

  const nextLesson =

    course.lessons[
      currentIndex + 1
    ];

  // ========================================
  // PAGE
  // ========================================

  const content = `

    <div class="learn-layout">

      <!-- SIDEBAR -->

      <div class="learn-sidebar">

        <h2>

          Lessons

        </h2>

        ${lessonsHtml}

      </div>

      <!-- CONTENT -->

      <div class="learn-content">

        <h1>

          ${course.title}

        </h1>

        <h2>

          ${lesson.title}

        </h2>

        <div class="video-player">

        <div
        class="video-overlay"
        id="playVideoBtn"
        >

    ▶

       </div>

       <div class="video-info">

      <h3>

      ${lesson.title}

      </h3>

      <p>

      ${lesson.duration}

      </p>

      <div
      class="video-status"
      id="videoStatus"
      >

       Ready to play

      </div>
      </div>

     <div class="video-progress">

     <div
      class="video-progress-fill"
    ></div>

       </div>

        </div>

        <div class="lesson-content-box">

          ${lesson.content}

        </div>

        <div class="lesson-actions">

          ${
            nextLesson

              ? `

                <button
                  id="nextLessonBtn"
                >

                  Next Lesson →

                </button>

              `

              : `

                <button
                  class="completed-btn"
                >

                  🎉 Course Completed

                </button>

              `
          }

        </div>

      </div>

    </div>

  `;

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(
      content
    );

  // ========================================
  // SIDEBAR CLICK
  // ========================================

  document
    .querySelectorAll(
      ".lesson-sidebar-item"
    )
    .forEach((item) => {

      item.onclick = () => {

        navigate(

          `/learn/${
            courseId
          }/${
            item.dataset.lessonId
          }`

        );
      };
    });

  // ========================================
  // NEXT LESSON
  // ========================================

  if (nextLesson) {

    document.querySelector(
      "#nextLessonBtn"
    ).onclick = () => {

      navigate(

        `/learn/${
          courseId
        }/${
          nextLesson.id
        }`

      );
    };
  }

// ========================================
// VIDEO PLAYER
// ========================================

const playBtn =

  document.querySelector(
    "#playVideoBtn"
  );

const videoStatus =

  document.querySelector(
    "#videoStatus"
  );

const progressBar =

  document.querySelector(
    ".video-progress-fill"
  );

let playing = false;

playBtn.onclick = () => {

  if (playing) {
    return;
  }

  playing = true;

  playBtn.innerHTML =
    "⏸";

  videoStatus.innerText =
    "Loading video...";

  setTimeout(() => {

    videoStatus.innerText =
      "Playing lesson...";

    let progress = 35;

    const interval =

      setInterval(() => {

        progress += 1;

        progressBar.style.width =

          `${progress}%`;

        if (progress >= 100) {

          clearInterval(
            interval
          );

          videoStatus.innerText =

            "Lesson completed ✅";
// ======================================
// XP
// ======================================

let xp =

  Number(

    localStorage.getItem(
      "user_xp"
    ) || 0

  );

xp += 50;

localStorage.setItem(
  "user_xp",
  xp
);  

          playBtn.innerHTML =
            "✓";
        }

      }, 120);

  }, 1000);
};  

}