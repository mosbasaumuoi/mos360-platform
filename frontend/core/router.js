// ============================================
// FRONTEND ROUTER SYSTEM
// Điều phối page theo URL
// ============================================

import { renderHomePage } from "../pages/home/homePage.js";
import { renderDashboardPage }
from "../pages/dashboard/dashboardPage.js";
import { renderLoginPage }
from "../pages/login/loginPage.js";

export async function resolveRoute(pathname) {

  // ============================================
  // HOME PAGE
  // ============================================

  if (pathname === "/") {
    return renderHomePage();
  }

  // ============================================
  // DASHBOARD
  // ============================================

  if (pathname === "/dashboard") {

    return renderDashboardPage();
  }

  // ============================================
  // COURSES
  // ============================================

  if (pathname === "/courses") {

    return `
      <h1>COURSES PAGE</h1>
    `;
  }
  
// ============================================
// LOGIN PAGE
// ============================================

  if (pathname === "/login") {

    return renderLoginPage();
  }  
  // ============================================
  // NOT FOUND
  // ============================================

  return `
    <h1>404 - PAGE NOT FOUND</h1>
  `;
}
