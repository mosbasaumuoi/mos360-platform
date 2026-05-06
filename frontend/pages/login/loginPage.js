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

  // ========================================
  // LOGIN DEMO
  // ========================================

  window.loginDemo = async function () {

    try {

      // ====================================
      // LOGIN API
      // ====================================

      const response =
      await fetch(
      "/api/auth/login",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        email: "admin@mos360.vn",
        password: "123456"
      })
    }
  );

      const result =
        await response.json();

      console.log(
        "[LOGIN RESULT]",
        result
      );

      // ====================================
      // SAVE TOKEN
      // ====================================

      localStorage.setItem(
        "mos360_token",
        result.data.token
      );

      console.log(
        "[TOKEN SAVED]"
      );

      // ====================================
      // REDIRECT
      // ====================================

      window.location.href =
        "/dashboard";

    } catch (error) {

      console.error(
        "[LOGIN ERROR]",
        error
      );
    }
  };

    </script>

  `;

  return renderMainLayout(content);
}
