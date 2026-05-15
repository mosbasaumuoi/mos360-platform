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

import {
  logAuth
}
  from "../../utils/logger.js";

import {
  updateStreak
}
  from "../../services/gamificationApi.js";  

// ============================================
// LOGIN PAGE
// ============================================

export async function renderLoginPage() {

  // ========================================
  // AUTH REDIRECT
  // ========================================

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

        logAuth(
          "login attempt",
          email
        ); 
        
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

          logAuth(
            "login success",
            email
          ); 

          updateStreak({

            email:
              "admin@mos360.vn"
          });
          
          saveToken(
            result.data.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify({
              email,
              role: "ADMIN"
            })
          );

          logAuth(
            "login failed",
            email
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