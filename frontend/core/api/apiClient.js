// ============================================
// API CLIENT
// Frontend gọi backend tập trung
// ============================================

import {
  getToken
}
from "../auth/authStorage.js";

const API_BASE = "/api";

// ============================================
// GET REQUEST
// ============================================

export async function apiGet(path) {

  try {

    // ========================================
    // TOKEN
    // ========================================

    const token = getToken();

    // ========================================
    // REQUEST
    // ========================================

    const response = await fetch(
      `${API_BASE}${path}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            token
              ? `Bearer ${token}`
              : ""
        }
      }
    );

    // ========================================
    // RESPONSE
    // ========================================

    const result =
      await response.json();

    return result;

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

    const token = getToken();

    // ========================================
    // REQUEST
    // ========================================

    const response = await fetch(
      `${API_BASE}${path}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            token
              ? `Bearer ${token}`
              : ""
        },

        body: JSON.stringify(body)
      }
    );

    // ========================================
    // RESPONSE
    // ========================================

    const result =
      await response.json();

    return result;

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
