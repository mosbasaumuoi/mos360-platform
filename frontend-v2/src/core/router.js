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

import {
  renderLearnPage
}
  from "../pages/learn/learnPage.js";

import {
  renderVerifyPage,
  initVerifyActions
}
  from "../pages/verifyPage";

import {
  logout
}
  from "../services/auth.js";

import {
  logRoute
}
  from "../utils/logger.js";

import {
  requireAuth
}
  from "../utils/authGuard.js";

import {
  renderAdminPage
}
  from "../pages/admin/adminPage.js";  

import {

  startPageTransition,

  endPageTransition

}
  from "./loadingRuntime.js";  

import {
  renderImportPage
}
  from "../pages/admin/importPage.js";  

import {

  renderRuntimeLessonTestPage

}

  from "../pages/runtime/runtimeLessonTestPage.jsx";  
  
// ============================================
// ROUTES
// ============================================

const routes = {

  "/":
    renderHomePage,
 
  "/runtime-test":

    renderRuntimeLessonTestPage,  
  
  "/login":
    renderLoginPage,

  "/dashboard":
    renderDashboardPage,

  "/courses":
    renderCoursesPage,

  "/admin/import":
    renderImportPage,

  "/admin":
    renderAdminPage  
};

// ============================================
// DYNAMIC ROUTES
// ============================================

const dynamicRoutes = [

  {
    match:
      "/courses/",

    handler:
      renderCourseDetailPage
  },

  {
    match:
      "/learn/",

    handler:
      renderLearnPage
  },

  {
    match:
      "/verify/",

    handler:
      renderVerifyRoute
  }

];

// ============================================
// VERIFY ROUTE
// ============================================

function renderVerifyRoute() {

  const certificateId =

    window.location.pathname
      .split("/verify/")[1];

  document.querySelector(
    "#app"
  ).innerHTML =

    renderVerifyPage(
      certificateId
    );

  initVerifyActions();
}

// ============================================
// PROTECTED ROUTES
// ============================================

const protectedRoutes = [

  "/dashboard"

];

// ============================================
// BIND LINKS
// ============================================

function bindLinks() {

  document
    .querySelectorAll(
      "[data-link]"
    )

    .forEach(button => {

      button.onclick = () => {

        const path =
          button.dataset.link;

        navigate(path);
      };
    });

  // ========================================
  // LOGOUT
  // ========================================

  const logoutBtn =

    document.querySelector(
      "#logoutBtn"
    );

  if (logoutBtn) {

    logoutBtn.onclick = () => {

      logout();

      navigate("/login");
    };
  }
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
  // PROTECTED ROUTE CHECK
  // ========================================

  const isProtected =

    protectedRoutes.includes(
      pathname
    );

  if (
    isProtected
    &&
    !requireAuth()
  ) {

    return;
  }

  // ========================================
  // ROUTE LOG
  // ========================================

  logRoute(
    "loadRoute",
    pathname
  );

  // ========================================
  // LEARN ROUTE VALIDATION
  // ========================================

  if (
    pathname.startsWith(
      "/learn/"
    )
  ) {

    const parts =

      pathname
        .split("/")
        .filter(Boolean);

    // ======================================
    // REQUIRE:
    // /learn/courseId/lessonId
    // ======================================

    if (parts.length < 3) {

      console.error(
        "[ROUTER] Invalid learn route:",
        pathname
      );

      navigate("/courses");

      return;
    }
  }

  // ========================================
  // DYNAMIC ROUTES
  // ========================================

  const dynamicRoute =

    dynamicRoutes.find(
      route =>

        pathname.startsWith(
          route.match
        )
    );

  if (dynamicRoute) {

    await dynamicRoute.handler();

    bindLinks();

    return;
  }
  // ========================================
  // STATIC ROUTE
  // ========================================

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

export async function navigate(
  path
) {

  logRoute(
    "navigate",
    path
  );

  // ======================================
  // START TRANSITION
  // ======================================

  startPageTransition();

  // ======================================
  // CHANGE URL
  // ======================================

  window.history.pushState(
    {},
    "",
    path
  );

  // ======================================
  // SMALL DELAY
  // ======================================

  requestAnimationFrame(
    async () => {

      await loadRoute();

      endPageTransition();

    }
  );
}

// ============================================
// BROWSER BACK/FORWARD
// ============================================

window.onpopstate =
  loadRoute;