// ============================================
// LOGIN PAGE
// ============================================

import {
  apiPost
}
from "../../services/api";

import {
  saveToken
}
from "../../services/authStorage";

import {
  navigate
}
from "../../core/router";

export async function renderLoginPage() {

  document.querySelector("#app")
    .innerHTML = `

      <div class="container">

        <h1>
          LOGIN
        </h1>

        <button id="loginBtn">
          LOGIN DEMO
        </button>

      </div>

    `;

  document
    .querySelector("#loginBtn")
    .onclick =
      async () => {

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

        if (
          result.ok &&
          result.data?.token
        ) {

          saveToken(
            result.data.token
          );

          navigate(
            "/dashboard"
          );
        }
      };
}