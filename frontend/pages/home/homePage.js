// ============================================
// HOMEPAGE
// Trang chủ hệ sinh thái MOS360
// ============================================

import { renderMainLayout } from "../../layouts/mainLayout.js";

export function renderHomePage() {

  const content = `

    <section class="hero-section">

      <h1>
        MOS360 PLATFORM
      </h1>

      <p>
        Hệ sinh thái học tập & công việc số
      </p>

    </section>

  `;

  return renderMainLayout(content);
}
