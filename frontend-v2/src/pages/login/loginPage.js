// ============================================
// LOGIN PAGE
// ============================================

import {
  apiPost
}
from "../../services/api.js";

import {
  saveToken
}
from "../../services/authStorage.js";

import {
  navigate
}
from "../../core/router.js";

import {
  showToast
}
from "../../components/toast/toast.js";

import {
  isAuthenticated
}
from "../../services/authStorage.js";

// ============================================
// LOGIN PAGE
// ============================================

export async function renderLoginPage() {

  // ========================================
  // AUTH REDIRECT
  // ========================================

  if (isAuthenticated()) {

    navigate(
      "/dashboard"
    );

    return;
  }

  document.querySelector("#app")
    .innerHTML = `

      <div class="auth-page">

        <form
          class="auth-form"
          id="loginForm"
        >

          <h1>
            MOS360 LOGIN
          </h1>

          <input
            id="email"
            type="email"
            placeholder="Email"
            value="admin@mos360.vn"
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            value="123456"
          />

          <button
            id="loginBtn"
            type="submit"
          >
            LOGIN
          </button>

        </form>

      </div>

    `;

  // ========================================
  // FORM SUBMIT
  // ========================================

  document
    .querySelector("#loginForm")
    .onsubmit =
      async (event) => {

        event.preventDefault();

        const email =
          document.querySelector(
            "#email"
          ).value;

        const password =
          document.querySelector(
            "#password"
          ).value;

        // ====================================
        // VALIDATION
        // ====================================

        if (!email || !password) {

          showToast(
            "Please enter email and password"
          );

          return;
        }

        // ====================================
        // BUTTON LOADING
        // ====================================

        const button =
          document.querySelector(
            "#loginBtn"
          );

        button.disabled = true;

        button.innerText =
          "LOADING...";

        // ====================================
        // API
        // ====================================

        const result =
          await apiPost(
            "/auth/login",
            {
              email,
              password
            }
          );

        // ====================================
        // RESTORE BUTTON
        // ====================================

        button.disabled = false;

        button.innerText =
          "LOGIN";

        // ====================================
        // SUCCESS
        // ====================================

        if (
          result.ok &&
          result.data?.token
        ) {

          saveToken(
            result.data.token
          );

          showToast(
            "Login success"
          );

          navigate(
            "/dashboard"
          );

          return;
        }

        // ====================================
        // FAILED
        // ====================================

        showToast(
          "Login failed"
        );
      };
}