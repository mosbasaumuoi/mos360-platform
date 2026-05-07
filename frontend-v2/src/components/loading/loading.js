// ============================================
// GLOBAL LOADING
// ============================================

export function showLoading() {

  // ========================================
  // ALREADY EXISTS
  // ========================================

  if (
    document.querySelector(
      ".loading-overlay"
    )
  ) {
    return;
  }

  // ========================================
  // CREATE
  // ========================================

  const overlay =
    document.createElement("div");

  overlay.className =
    "loading-overlay";

  overlay.innerHTML = `

    <div class="loading-spinner"></div>

  `;

  document.body.appendChild(
    overlay
  );
}

// ============================================
// HIDE LOADING
// ============================================

export function hideLoading() {

  const overlay =
    document.querySelector(
      ".loading-overlay"
    );

  if (overlay) {
    overlay.remove();
  }
}