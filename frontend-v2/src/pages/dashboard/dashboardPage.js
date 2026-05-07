// ============================================
// DASHBOARD PAGE
// ============================================

import {
  apiGet
}
from "../../services/api";

export async function renderDashboardPage() {

  const analytics =
    await apiGet(
      "/admin/analytics"
    );

  const data =
    analytics.data || {};

  document.querySelector("#app")
    .innerHTML = `

      <div class="container">

        <h1>
          MOS360 DASHBOARD
        </h1>

        <div class="stats">

          <div class="card">
            <h3>ZALO</h3>
            <p>${data.zalo || 0}</p>
          </div>

          <div class="card">
            <h3>FACEBOOK</h3>
            <p>${data.facebook || 0}</p>
          </div>

          <div class="card">
            <h3>MESSENGER</h3>
            <p>${data.messenger || 0}</p>
          </div>

        </div>

      </div>

    `;
}