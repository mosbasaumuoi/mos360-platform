// ============================================
// MOS360 FRONTEND ROUTER
// SPA Router System
// ============================================

import { renderHomePage }
from "../pages/home/homePage.js";

import { renderLoginPage }
from "../pages/login/loginPage";

import { renderDashboardPage }
from "../pages/dashboard/dashboardPage.js";

import {
  renderCoursesPage
}
from "../pages/courses/coursesPage.js";

import {
  renderCourseDetailPage
}
from "../pages/courses/courseDetailPage.js";

// ============================================
// ROUTES
// ============================================

const routes = {

  "/":
    renderHomePage,

  "/login":
    renderLoginPage,

  "/dashboard":
    renderDashboardPage,

    "/courses":
    renderCoursesPage
};

// ============================================
// BIND LINKS
// ============================================

function bindLinks() {

  document
    .querySelectorAll("[data-link]")

    .forEach(button => {

      button.onclick = () => {

        const path =
          button.dataset.link;

        navigate(path);
      };
    });
}
// ============================================
// LOAD ROUTE
// ============================================

  export async function loadRoute() {

  const path =
    window.location.pathname;

  const pathname =
    window.location.pathname;

  // ========================================
  // COURSE DETAIL
  // ========================================

  if (
    pathname.startsWith(
      "/courses/"
    )
  ) {

    renderCourseDetailPage();

    return;
  }

    const page =
    routes[path];

  if (!page) {

    document.querySelector(
      "#app"
    ).innerHTML = `

      <h1>
        404 NOT FOUND
      </h1>

    `;

    return;
  }

    await page();

  bindLinks();
}

// ============================================
// NAVIGATE
// ============================================

export function navigate(path) {

  window.history.pushState(
    {},
    "",
    path
  );

  loadRoute();
}

// ============================================
// BROWSER BACK/FORWARD
// ============================================

window.onpopstate =
  loadRoute;


