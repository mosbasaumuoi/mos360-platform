// ============================================
// MOS360 API SERVICE
// Centralized API layer
// ============================================

import { CONFIG }
from "../core/config";

import {
  getToken,
  clearToken
}
from "./authStorage";

import {
  showToast
}
from "../components/toast/toast.js";

import {
  showLoading,
  hideLoading
}
from "../components/loading/loading.js";

import {
  navigate
}
from "../core/router.js";

// ============================================
// MAIN REQUEST
// ============================================

async function request(
  method,
  path,
  body = null,
  options = {}
) {

  // ==========================================
  // OPTIONS
  // ==========================================

  const {
    silent = false
  } = options;

  try {

    // ========================================
    // LOADING
    // ========================================

    if (!silent) {

      showLoading();
    }

    // ========================================
    // TOKEN
    // ========================================

    const token =
      getToken();

    // ========================================
    // REQUEST
    // ========================================

    const response =
      await fetch(
        `${CONFIG.API_BASE}${path}`,
        {
          method,

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              token
                ? `Bearer ${token}`
                : ""
          },

          body:
            body
              ? JSON.stringify(body)
              : null
        }
      );

    // ========================================
    // JSON
    // ========================================

    const result =
      await response.json();

    // ========================================
    // UNAUTHORIZED
    // ========================================

    if (
      response.status === 401
    ) {

      clearToken();

      showToast(
        "Session expired"
      );

      navigate(
        "/login"
      );
    }

    return result;

  } catch (error) {

    console.error(
      "[API ERROR]",
      error
    );

    showToast(
      "Network Error"
    );

    return {
      ok: false,
      error: "Network Error"
    };

  } finally {

    // ========================================
    // HIDE LOADING
    // ========================================

    if (!silent) {

      hideLoading();
    }
  }
}

// ============================================
// GET
// ============================================

export async function apiGet(
  path,
  options = {}
) {

  return request(
    "GET",
    path,
    null,
    options
  );
}

// ============================================
// POST
// ============================================

export async function apiPost(
  path,
  body = {},
  options = {}
) {

  return request(
    "POST",
    path,
    body,
    options
  );
}