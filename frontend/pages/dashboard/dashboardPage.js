// ============================================
// DASHBOARD PAGE
// Dashboard analytics realtime
// ============================================

import { renderMainLayout }
from "../../layouts/mainLayout.js";

import { apiGet }
from "../../core/api/apiClient.js";

export async function renderDashboardPage() {

  // ==========================================
  // FETCH ANALYTICS
  // ==========================================

  const analytics =
    await apiGet("/admin/analytics");

  // ==========================================
  // SAFE DATA
  // ==========================================

  const data = analytics?.data || {};

  const zalo =
    data.zalo || 0;

  const facebook =
    data.facebook || 0;

  const messenger =
    data.messenger || 0;

  // ==========================================
  // PAGE CONTENT
  // ==========================================

  const content = `

    <section>

      <h1>
        DASHBOARD
      </h1>

      <div>

        <p>
          Zalo: ${zalo}
        </p>

        <p>
          Facebook: ${facebook}
        </p>

        <p>
          Messenger: ${messenger}
        </p>

      </div>

    </section>

  `;

  return renderMainLayout(content);
}
