// ============================================
// AUTH SERVICE
// ============================================

import {
  apiGet
}
from "./api.js";

import {
  clearToken
}
from "./authStorage.js";

import {
  showToast
}
from "../components/toast/toast.js";

import {
  appContext
}
  from "../core/appContext.js";

// ============================================
// VERIFY SESSION
// ============================================

export async function verifySession() {

  const result =
    await apiGet(
      "/auth/me",
      {
        silent: true
      }
    );

  return result.ok;
}

// ============================================
// LOGOUT
// ============================================

export function logout() {

  // ========================================
  // CLEAR ANALYTICS
  // ========================================

  clearInterval(
    window.analyticsInterval
  );

  // ========================================
  // CLEAR TOKEN
  // ========================================

  clearToken();

  // ========================================
  // CLEAR USER STATE
  // ========================================

  appContext.user = null;

  // ========================================
  // TOAST
  // ========================================

  showToast(
    "Logged out"
  );
}

// ============================================
// GET CURRENT USER
// ============================================

export async function getCurrentUser() {

  try {

    console.log(
      "GET CURRENT USER START"
    );

    const result =
      await apiGet(
        "/auth/me",
        {
          silent: true
        }
      );

    console.log(
      "CURRENT USER RESULT:",
      result
    );

    if (
      result.ok &&
      result.data
    ) {

      return result.data.user;
    }

    return null;

  } catch (error) {

    console.error(
      "GET CURRENT USER ERROR:",
      error
    );

    return null;
  }
}