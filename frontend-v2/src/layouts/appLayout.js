// ============================================
// MOS360 APP LAYOUT
// Shared application shell
// ============================================

import { appContext } from "../core/appContext.js";

import {
  bindRouteLinks
}
  from "../core/uiActions.js";

export function renderAppLayout(content) {

  const user =
    appContext.user;

  const currentPath =
    window.location.pathname;

  const enrolledCourses =
    JSON.parse(
      localStorage.getItem(
        "mos360_enrolled_courses"
      ) || "[]"
    );

  const latestCourseId =
    enrolledCourses[0];

  const latestLessonId =
    latestCourseId
      ? localStorage.getItem(
        "mos360_last_lesson_" +
        latestCourseId
      )
      : null;

  const continueLearningUrl =
    latestLessonId
      ? `/learn/${latestCourseId}/${latestLessonId}`
      : `/courses/${latestCourseId}`;

  const isCoursesPage =
    currentPath === "/courses" ||
    currentPath.startsWith(
      "/courses/"
    );

  const isDashboardPage =
    currentPath === "/dashboard";

  const isLoggedIn =
    !!user;

  return `

    <div class="app-layout">

      <!-- ========================= -->
      <!-- SIDEBAR -->
      <!-- ========================= -->

      <aside class="sidebar">

        <!-- LOGO -->

        <div class="sidebar-top">

          <h2 class="logo">
            MOS360
          </h2>

          <div class="sidebar-tagline">

            Học thật.
            Tiến bộ thật.

          </div>

        </div>

        <!-- USER -->

        <div class="sidebar-user">

          <div class="sidebar-avatar">

            ${isLoggedIn
      ? user.email
        .charAt(0)
        .toUpperCase()
      : "M"
    }

          </div>

          <div class="sidebar-user-info">

            <div class="sidebar-user-email">

              ${user?.email ||
    "Khách truy cập"
    }

            </div>

            <div class="sidebar-user-role">

              ${user?.role ||
    "Bắt đầu hành trình học tập"
    }

            </div>

          </div>

        </div>

        <!-- NAVIGATION -->

        <nav class="menu">

          <!-- MAIN -->

          <div class="menu-group">

            <div class="menu-label">

              KHÁM PHÁ

            </div>

            <button
              data-link="/"
              class="${currentPath === "/"
      ? "active"
      : ""
    }"
            >

              Trang chủ

            </button>

            <button
              data-link="/courses"
              class="${isCoursesPage
      ? "active"
      : ""
    }"
            >

              Khóa học

            </button>

            <button
              data-link="/dashboard"
              class="${isDashboardPage
      ? "active"
      : ""
    }"
            >

              Tiến trình học

            </button>

          </div>

          <!-- LEARNING -->

          <div class="menu-group">

            <div class="menu-label">

              HỌC TẬP

            </div>

            <button data-link="/courses">

              Luyện MOS

            </button>

            <button>

              Quiz thực hành

            </button>

            <button>

              Tiện ích Office

            </button>

          </div>

          <!-- ACCOUNT -->

          <div class="menu-group">

            <div class="menu-label">

              TÀI KHOẢN

            </div>

            ${!isLoggedIn
      ? `

                  <button data-link="/login">

                    Đăng nhập

                  </button>

                `
      : ""
    }

            ${isLoggedIn
      ? `

                  <button id="logoutBtn">

                    Đăng xuất

                  </button>

                `
      : ""
    }

          </div>

        </nav>

        <!-- CONTINUITY -->

        ${latestCourseId
      ? `

              <div class="sidebar-continuity">

                <div class="sidebar-continuity-label">

                  ĐANG TIẾP TỤC

                </div>

                <div class="sidebar-continuity-title">

                  Hành trình học tập của bạn
                  vẫn đang tiếp diễn.

                </div>

                <button
                  data-link="${continueLearningUrl}"
                >

                  Tiếp tục học →

                </button>

              </div>

            `
      : ""
    }

        <!-- SIDEBAR FOOT -->

        <div class="sidebar-foot">

          <div class="sidebar-foot-title">

            MOS360

          </div>

          <div class="sidebar-foot-text">

            Học MOS và kỹ năng Office
            theo hướng thực hành,
            dễ tiếp cận và liên tục.

          </div>

        </div>

      </aside>

      <!-- ========================= -->
      <!-- MAIN -->
      <!-- ========================= -->

      <main class="main-content">

        ${content}

      </main>

    </div>

    `;
}

// ============================================
// APP LAYOUT RUNTIME
// ============================================

export function initAppLayout() {

  bindRouteLinks();
}