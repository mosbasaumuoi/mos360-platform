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

  return `

    <div class="app-layout">

      <!-- ========================= -->
      <!-- SIDEBAR -->
      <!-- ========================= -->

      <aside class="sidebar">

        <h2 class="logo">
          MOS360
        </h2>

        <div class="sidebar-user">

  <div class="sidebar-avatar">
    M
  </div>

  <div class="sidebar-user-info">

    <div class="sidebar-user-email">
      ${user?.email || "Guest"}
    </div>

    <div class="sidebar-user-role">
      ${user?.role || "visitor"}
    </div>

  </div>

</div>

        <nav class="menu">

          <button data-link="/">
            Home
          </button>

          <button data-link="/dashboard">
            Dashboard
          </button>

          <button data-link="/login">
            Login
          </button>

          <button id="logoutBtn">
           Logout
          </button>

          <a href="/courses">
           Courses
          </a>

        </nav>

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