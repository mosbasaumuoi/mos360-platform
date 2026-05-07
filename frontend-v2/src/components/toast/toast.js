// ============================================
// GLOBAL TOAST SYSTEM
// ============================================

export function showToast(message) {

  // ========================================
  // REMOVE OLD
  // ========================================

  const oldToast =
    document.querySelector(
      ".toast"
    );

  if (oldToast) {
    oldToast.remove();
  }

  // ========================================
  // CREATE
  // ========================================

  const toast =
    document.createElement("div");

  toast.className =
    "toast";

  toast.innerText =
    message;

  document.body.appendChild(
    toast
  );

  // ========================================
  // AUTO REMOVE
  // ========================================

  setTimeout(() => {

    toast.remove();

  }, 3000);
}