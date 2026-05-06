// ============================================
// DASHBOARD PAGE
// Dashboard analytics realtime
// ============================================

import { renderMainLayout }
from "../../layouts/mainLayout.js";

export function renderDashboardPage() {

  // ==========================================
  // PAGE CONTENT
  // ==========================================

  const content = `

    <section>

      <h1>
        DASHBOARD
      </h1>

      <div id="analytics-container">

        <p>Loading analytics...</p>

      </div>

    </section>

    <script type="module">

      // ======================================
      // IMPORT API CLIENT
      // ======================================

      import {
        apiGet
      }
      from "/frontend/core/api/apiClient.js";

      // ======================================
      // LOAD ANALYTICS
      // ======================================

      async function loadAnalytics() {

        const analytics =
          await apiGet(
            "/admin/analytics"
          );

        console.log(
          "[ANALYTICS]",
          analytics
        );

        // ====================================
        // SAFE DATA
        // ====================================

        const data =
          analytics?.data || {};

        const zalo =
          data.zalo || 0;

        const facebook =
          data.facebook || 0;

        const messenger =
          data.messenger || 0;

        // ====================================
        // UPDATE DOM
        // ====================================

        document.getElementById(
          "analytics-container"
        ).innerHTML = \`
          <p>Zalo: \${zalo}</p>
          <p>Facebook: \${facebook}</p>
          <p>Messenger: \${messenger}</p>
        \`;
      }

      // ======================================
      // INITIAL LOAD
      // ======================================

      loadAnalytics();

      // ======================================
      // REALTIME POLLING
      // ======================================

      setInterval(
        loadAnalytics,
        2000
      );

    </script>

  `;

  return renderMainLayout(content);
}
