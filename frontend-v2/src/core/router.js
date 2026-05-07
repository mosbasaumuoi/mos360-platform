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

// ============================================
// ROUTES
// ============================================

const routes = {

  "/":
    renderHomePage,

  "/login":
    renderLoginPage,

  "/dashboard":
    renderDashboardPage
};

// ============================================
// LOAD ROUTE
// ============================================

export async function loadRoute() {

  const path =
    window.location.pathname;

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