// ============================================
// AUTH GUARD
// Protect private pages
// ============================================

import {
  getToken
}
from "../services/authStorage.js";

import {
  navigate
}
from "./router.js";

// ============================================
// REQUIRE AUTH
// ============================================

export function requireAuth() {

  const token =
    getToken();

  if (!token) {

    navigate("/login");

    return false;
  }

  return true;
}