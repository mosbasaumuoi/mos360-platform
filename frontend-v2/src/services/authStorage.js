// ============================================
// MOS360 AUTH STORAGE
// Frontend auth persistence
// ============================================

import {
  STORAGE_KEYS
}
  from "../constants/storageKeys.js";

// ============================================
// SAVE TOKEN
// ============================================

export function saveToken(token) {

  localStorage.setItem(
    STORAGE_KEYS.TOKEN,
    token
  );
}

// ============================================
// GET TOKEN
// ============================================

export function getToken() {

  return localStorage.getItem(
    STORAGE_KEYS.TOKEN
  );
}

// ============================================
// CLEAR TOKEN
// ============================================

export function clearToken() {

  localStorage.removeItem(
    STORAGE_KEYS.TOKEN
  );
}

// ============================================
// CHECK AUTH
// ============================================

export function isAuthenticated() {

  return !!getToken();
}