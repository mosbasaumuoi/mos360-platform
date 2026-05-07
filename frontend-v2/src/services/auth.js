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

  clearInterval(
    window.analyticsInterval
  );

  clearToken();

  showToast(
    "Logged out"
  );

  window.location.hash =
    "/login";
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