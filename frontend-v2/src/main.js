// ============================================
// MOS360 FRONTEND ENTRY
// Frontend runtime chính
// ============================================

import "./styles/global.css";

import {
  apiGet,
  apiPost
}
from "./services/api";

import {
  saveToken
}
from "./services/authStorage";

const app =
  document.querySelector("#app");

// ============================================
// LOGIN
// ============================================

async function login() {

  const result =
    await apiPost(
      "/auth/login",
      {
        email:
          "admin@mos360.vn",

        password:
          "123456"
      }
    );

  console.log(
    "[LOGIN]",
    result
  );

  // ==========================================
  // SAVE TOKEN
  // ==========================================

  if (
    result.ok &&
    result.data?.token
  ) {

    saveToken(
      result.data.token
    );

    alert(
      "Login Success"
    );

    loadAnalytics();
  }
}

// ============================================
// LOAD ANALYTICS
// ============================================

async function loadAnalytics() {

  const analytics =
    await apiGet(
      "/admin/analytics"
    );

  console.log(
    "[ANALYTICS]",
    analytics
  );

  app.innerHTML = `

    <div class="container">

      <h1>
        MOS360 PLATFORM
      </h1>

      <p>
        Dashboard Connected
      </p>

      <button id="loginBtn">
        LOGIN DEMO
      </button>

      <pre>
${JSON.stringify(analytics, null, 2)}
      </pre>

    </div>

  `;

  // ==========================================
  // LOGIN BUTTON
  // ==========================================

  const loginBtn =
    document.querySelector(
      "#loginBtn"
    );

  loginBtn.onclick =
    login;
}

// ============================================
// START APP
// ============================================

loadAnalytics();