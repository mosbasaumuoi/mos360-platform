// ============================================
// MOS360 LESSON SIDEBAR ENGINE
// Learning graph sidebar runtime
// ============================================

import {
    navigate
}
    from "../core/router.js";

import {
    bindAllClicks
}
    from "../core/uiActions.js";

// ============================================
// RENDER SIDEBAR
// ============================================

export function renderLessonSidebar({

    lessons = [],
    lessonId,
    completedLessons = []

}) {

    return lessons.map(

        (lesson) => {

            const active =

                lesson.id === lessonId;

            const completed =

                completedLessons.includes(
                    lesson.id
                );

            return `

        <div

          class="
            lesson-sidebar-item
            ${active
                    ? "active"
                    : ""
                }
          "

          data-lesson-id="${lesson.id}"

        >

          <span>

            ${completed
                    ? "✅"
                    : "📘"
                }

          </span>

          <span>

            ${lesson.title}

          </span>

        </div>

      `;
        }

    ).join("");
}

// ============================================
// BIND SIDEBAR
// ============================================

export function bindLessonSidebar({

    courseId

}) {

    bindAllClicks(

        ".lesson-sidebar-item",

        (item) => {

            navigate(

                `/learn/${courseId}/${item.dataset.lessonId}`

            );

        }

    );
}