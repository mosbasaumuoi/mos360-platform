// ============================================
// NAVBAR COMPONENT
// Thanh điều hướng toàn hệ thống
// ============================================

export function renderNavbar() {

  return `
    <header class="navbar">

      <div class="navbar-logo">
        MOS360
      </div>

      <nav class="navbar-menu">

        <a href="/">
          Trang chủ
        </a>

        <a href="/courses">
          Khóa học
        </a>

        <a href="/dashboard">
          Dashboard
        </a>

      </nav>

    </header>
  `;
}
