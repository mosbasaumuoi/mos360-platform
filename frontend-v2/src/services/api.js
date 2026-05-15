// ============================================
// MOS360 API SERVICE
// Centralized API layer
// ============================================

import { CONFIG }
  from "../core/config.js";

import {
  getToken,
  clearToken
}
  from "./authStorage.js";

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
  STORAGE_KEYS
}
  from "../constants/storageKeys.js";

import {
  removeStorage
}
  from "../utils/localStorageHelpers.js";

import {
  logAuth,
  logInfo,
  logWarn,
  logError
}
  from "../utils/logger.js";

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
    // TRACE REQUEST
    // ========================================

    logInfo(

      "API",

      "request start",

      {
        method,
        path
      }

    );

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

    let result = null;

    try {

      result =
        await response.json();

    } catch (error) {

      logError(

        "API",

        "invalid json response",

        {
          method,
          path,
          error
        }

      );

      return {

        ok: false,

        error:
          "Invalid server response"
      };
    }

    // ========================================
    // UNAUTHORIZED
    // ========================================

    if (
      response.status === 401
    ) {

      logWarn(

        "AUTH",

        "session expired",

        {
          path
        }

      );

      clearToken();

      removeStorage(
        STORAGE_KEYS.USER
      );

      showToast(
        "Session expired"
      );

      return {

        ok: false,

        unauthorized: true,

        error:
          "Unauthorized"
      };
    }

    // ========================================
    // TRACE RESPONSE
    // ========================================

    logInfo(

      "API",

      "request success",

      {
        method,
        path,
        ok:
          result?.ok
      }

    );
    
    return result;

  } catch (error) {

    // ========================================
    // API ERROR
    // ========================================

    logError(

      "API",

      "request failed",

      {
        method,
        path,
        error
      }

    );

    showToast(
      "Network Error"
    );

    return {

      ok: false,

      error:
        "Network Error"
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