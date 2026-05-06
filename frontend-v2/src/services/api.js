// ============================================
// MOS360 API SERVICE
// Frontend gọi backend
// ============================================

import { CONFIG }
from "../core/config";

import { getToken }
from "./authStorage";

// ============================================
// GET REQUEST
// ============================================

export async function apiGet(path) {

  try {

    // ========================================
    // TOKEN
    // ========================================

    const token =
      getToken();

    // ========================================
    // REQUEST
    // ========================================

    const response = await fetch(
      `${CONFIG.API_BASE}${path}`,
      {
        method: "GET",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            token
              ? `Bearer ${token}`
              : ""
        }
      }
    );

    return await response.json();

  } catch (error) {

    console.error(
      "[API GET ERROR]",
      error
    );

    return {
      ok: false,
      error: "Network Error"
    };
  }
}

// ============================================
// POST REQUEST
// ============================================

export async function apiPost(
  path,
  body = {}
) {

  try {

    // ========================================
    // TOKEN
    // ========================================

    const token =
      getToken();

    // ========================================
    // REQUEST
    // ========================================

    const response = await fetch(
      `${CONFIG.API_BASE}${path}`,
      {
        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            token
              ? `Bearer ${token}`
              : ""
        },

        body:
          JSON.stringify(body)
      }
    );

    return await response.json();

  } catch (error) {

    console.error(
      "[API POST ERROR]",
      error
    );

    return {
      ok: false,
      error: "Network Error"
    };
  }
}