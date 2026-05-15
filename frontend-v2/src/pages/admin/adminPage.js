import {
  renderAppLayout
}
  from "../../layouts/appLayout.js";

import {
  getAnalytics
}
  from "../../services/adminApi.js";

import {
  logInfo,
  logWarn,
  logError
}
  from "../../utils/logger.js";

// ============================================
// ADMIN PAGE
// ============================================

export async function renderAdminPage() {

  // ========================================
  // LOADING
  // ========================================

  document.querySelector(
    "#app"
  ).innerHTML =

    renderAppLayout(`

      <div class="page">

        <h1>
          ADMIN PANEL
        </h1>

        <p>
          Loading analytics...
        </p>

      </div>
    `);

  try {

    // ====================================
    // FETCH ANALYTICS
    // ====================================

    const result =
      await getAnalytics();

    // ====================================
    // API FAILURE
    // ====================================

    if (!result.ok) {

      logWarn(

        "ADMIN",

        "analytics load failed"

      );

      document.querySelector(
        "#app"
      ).innerHTML =

        renderAppLayout(`

          <div class="page">

            <h1>
              ADMIN PANEL
            </h1>

            <p>
              Failed to load analytics
            </p>

          </div>
        `);

      return;
    }

    // ====================================
    // NORMALIZE ANALYTICS
    // ====================================

    const analytics =
      result.data || {};

    const latestEvents =
      analytics.latestEvents || [];

    const users =
      analytics.users || [];

    // ====================================
    // TRACE
    // ====================================

    logInfo(

      "ADMIN",

      "analytics loaded",

      {

        totalUsers:
          analytics.totalUsers || 0,

        totalEvents:
          analytics.totalEvents || 0
      }

    );

    // ====================================
    // RENDER
    // ====================================

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <div class="page">

          <h1>
            ADMIN PANEL
          </h1>

          <div class="dashboard-grid">

            <!-- EVENTS -->

            <div class="dashboard-card">

              <h3>
                Latest Events
              </h3>

              <div class="events-feed">

                ${latestEvents
          .map(event => `

                  <div class="event-item">

                    <strong>
                      ${event.type || "UNKNOWN"}
                    </strong>

                    <p>
                      ${event.email || "anonymous"}
                    </p>

                  </div>

                `)
          .join("")}

              </div>

            </div>

            <!-- USERS -->

            <div class="dashboard-card">

              <h3>
                Users
              </h3>

              <div class="users-feed">

                ${users
          .map(user => `

                  <div class="event-item">

                    <strong>
                      ${user.email || "unknown"}
                    </strong>

                    <p>
                      ${user.role || "student"}
                    </p>

                  </div>

                `)
          .join("")}

              </div>

            </div>

            <!-- STATS -->

            <div class="dashboard-card">

              <h3>
                Users
              </h3>

              <h2>
                ${analytics.totalUsers || 0}
              </h2>

            </div>

            <div class="dashboard-card">

              <h3>
                Events
              </h3>

              <h2>
                ${analytics.totalEvents || 0}
              </h2>

            </div>

            <div class="dashboard-card">

              <h3>
                Certificates
              </h3>

              <h2>
                ${analytics.totalCredentials || 0}
              </h2>

            </div>

            <div class="dashboard-card">

              <h3>
                Lessons Completed
              </h3>

              <h2>
                ${analytics.lessonCompleted || 0}
              </h2>

            </div>

          </div>

        </div>
      `);

  } catch (error) {

    // ====================================
    // TRACE FAILURE
    // ====================================

    logError(

      "ADMIN",

      "admin runtime failed",

      error

    );

    document.querySelector(
      "#app"
    ).innerHTML =

      renderAppLayout(`

        <div class="page">

          <h1>
            ADMIN PANEL
          </h1>

          <p>
            Admin runtime error
          </p>

        </div>
      `);
  }
}