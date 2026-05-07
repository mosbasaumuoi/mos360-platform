// ============================================
// MOS360 APP LAYOUT
// Shared application shell
// ============================================

export function renderAppLayout(content) {

  return `

    <div class="app-layout">

      <!-- ========================= -->
      <!-- SIDEBAR -->
      <!-- ========================= -->

      <aside class="sidebar">

        <h2 class="logo">
          MOS360
        </h2>

        <nav class="menu">

          <button data-link="/">
            Home
          </button>

          <button data-link="/dashboard">
            Dashboard
          </button>

          <button data-link="/login">
            Login
          </button>

        </nav>

      </aside>

      <!-- ========================= -->
      <!-- MAIN -->
      <!-- ========================= -->

      <main class="main-content">

        ${content}

      </main>

    </div>

  `;
}