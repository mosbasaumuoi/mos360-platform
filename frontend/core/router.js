// ============================================
// FRONTEND ROUTER SYSTEM
// Điều phối page theo URL
// ============================================

import { renderHomePage } from "../pages/home/homePage.js";

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

    return `
      <h1>DASHBOARD PAGE</h1>
    `;
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
  // NOT FOUND
  // ============================================

  return `
    <h1>404 - PAGE NOT FOUND</h1>
  `;
}
