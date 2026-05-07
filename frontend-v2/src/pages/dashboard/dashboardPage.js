// ============================================
// DASHBOARD PAGE
// Realtime analytics dashboard
// ============================================

import {
  apiGet
}
from "../../services/api.js";

import {
  requireAuth
}
from "../../core/authGuard.js";

import {
  renderAppLayout
}
from "../../layouts/appLayout.js";

import {
  renderStatCard
}
from "../../components/cards/statCard.js";

import {
  renderErrorState
}
from "../../components/states/errorState.js";

import {
  renderEmptyState
}
from "../../components/states/emptyState.js";

// ============================================
// LOAD ANALYTICS
// ============================================

async function loadAnalytics() {

  const analytics =
    await apiGet(
      "/admin/analytics",
      {
        silent: true
      }
    );

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (!analytics.ok) {

    document.querySelector(
      ".stats"
    ).innerHTML =
      renderErrorState(
        "Failed to load analytics"
      );

    return;
  }

  // ==========================================
  // SAFE DATA
  // ==========================================

  const data =
    analytics?.data || {};

  // ==========================================
  // EMPTY STATE
  // ==========================================

  const total =

  (data.zalo || 0) +
  (data.facebook || 0) +
  (data.messenger || 0); 

  if (total === 0) {

    document.querySelector(
      ".stats"
    ).innerHTML =
      renderEmptyState(
        "No analytics data yet"
      );

    return;
  }

  // ==========================================
  // RESTORE STATS UI
  // ==========================================

  document.querySelector(
    ".stats"
  ).innerHTML = `

    ${renderStatCard(
      "ZALO",
      data.zalo || 0,
      "zalo-count"
    )}

    ${renderStatCard(
      "FACEBOOK",
      data.facebook || 0,
      "facebook-count"
    )}

    ${renderStatCard(
      "MESSENGER",
      data.messenger || 0,
      "messenger-count"
    )}

  `;
}

// ============================================
// DASHBOARD PAGE
// ============================================

export async function renderDashboardPage() {

  // ==========================================
  // AUTH GUARD
  // ==========================================

  if (!requireAuth()) {

    return;
  }

  // ==========================================
  // PAGE TEMPLATE
  // ==========================================

  const content = `

    <div class="page">

      <h1>
        MOS360 DASHBOARD
      </h1>

      <div class="stats">

        ${renderStatCard(
          "ZALO",
          0,
          "zalo-count"
        )}

        ${renderStatCard(
          "FACEBOOK",
          0,
          "facebook-count"
        )}

        ${renderStatCard(
          "MESSENGER",
          0,
          "messenger-count"
        )}

      </div>

    </div>

  `;

  // ==========================================
  // RENDER PAGE
  // ==========================================

  document.querySelector(
    "#app"
  ).innerHTML =
    renderAppLayout(
      content
    );

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  await loadAnalytics();

  // ==========================================
  // REALTIME REFRESH
  // ==========================================

  setInterval(
    loadAnalytics,
    2000
  );
}