// ============================================
// LOGIN PAGE
// Đăng nhập hệ thống
// ============================================

import { renderMainLayout }
from "../../layouts/mainLayout.js";

export function renderLoginPage() {

  const content = `

    <section>

      <h1>
        LOGIN PAGE
      </h1>

      <p>
        Token demo:
      </p>

      <button onclick="loginDemo()">
        LOGIN DEMO
      </button>

    </section>

    <script>

      async function loginDemo() {

        // ====================================
        // LOGIN API
        // ====================================

        const response =
          await fetch(
            "/api/auth/login",
            {
              method: "POST"
            }
          );

        const result =
          await response.json();

        // ====================================
        // SAVE TOKEN
        // ====================================

        localStorage.setItem(
          "mos360_token",
          result.data.token
        );

        // ====================================
        // REDIRECT
        // ====================================

        window.location.href =
          "/dashboard";
      }

    </script>

  `;

  return renderMainLayout(content);
}
