// ============================================
// MAIN LAYOUT
// Layout dùng chung toàn hệ thống
// ============================================

import { renderNavbar } from "../components/navbar/navbar.js";
import { renderFooter } from "../components/footer/footer.js";

export function renderMainLayout(content) {

  return `
    ${renderNavbar()}

    <main class="main-container">
      ${content}
    </main>

    ${renderFooter()}
  `;
}
