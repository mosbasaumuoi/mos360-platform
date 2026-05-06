// ============================================
// MOS360 AUTH STORAGE
// Quản lý token frontend
// ============================================

const TOKEN_KEY =
  "mos360_token";

// ============================================
// SAVE TOKEN
// ============================================

export function saveToken(token) {

  localStorage.setItem(
    TOKEN_KEY,
    token
  );
}

// ============================================
// GET TOKEN
// ============================================

export function getToken() {

  return localStorage.getItem(
    TOKEN_KEY
  );
}

// ============================================
// REMOVE TOKEN
// ============================================

export function clearToken() {

  localStorage.removeItem(
    TOKEN_KEY
  );
}