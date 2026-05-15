// ============================================
// MOS360 AUTH GUARD
// Predictable route protection
// ============================================

import {
    isAuthenticated
}
    from "../services/authStorage.js";

import {
    navigate
}
    from "../core/router.js";

import {
    logAuth
}
    from "./logger.js";

// ============================================
// REQUIRE AUTH
// ============================================

export function requireAuth() {

    const authenticated =

        isAuthenticated();

    // ========================================
    // NOT AUTHENTICATED
    // ========================================

    if (!authenticated) {

        logAuth(
            "auth blocked"
        );

        navigate(
            "/login"
        );

        return false;
    }

    // ========================================
    // AUTHORIZED
    // ========================================

    logAuth(
        "auth success"
    );

    return true;
}