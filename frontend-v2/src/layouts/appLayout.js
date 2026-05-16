// ============================================
// MOS360 APP LAYOUT
// Shared application shell
// ============================================

import {
  appContext
}
  from "../core/appContext.js";

export function renderAppLayout(
  content
) {

  const user =
    appContext.user;

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
      : "M"}

          </div>

          <div class="sidebar-user-info">

            <div class="sidebar-user-email">

              ${user?.email || "Khách truy cập"}

            </div>

            <div class="sidebar-user-role">

              ${user?.role || "Bắt đầu hành trình học tập"}

            </div>

          </div>

        </div>

        <!-- NAVIGATION -->

        <nav class="menu">

          <button data-link="/">

            Trang chủ

          </button>

          <button data-link="/courses">

            Khóa học

          </button>

          <button data-link="/dashboard">

            Tiến trình

          </button>

          ${!isLoggedIn
      ? `

              <button data-link="/login">

                Đăng nhập

              </button>

            `
      : `
            
              <button id="logoutBtn">

                Đăng xuất

              </button>

            `
    }

        </nav>

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