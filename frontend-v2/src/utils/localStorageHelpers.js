// ============================================
// LOCAL STORAGE HELPERS
// Centralized localStorage utilities
// ============================================

import {
    logStorage,
    logError
}
    from "./logger.js";

// ============================================
// GET STORAGE
// ============================================

export function getStorage(
    key,
    fallback = null
) {

    try {

        const raw =

            localStorage.getItem(
                key
            );

        // ====================================
        // EMPTY
        // ====================================

        if (!raw) {

            return fallback;
        }

        // ====================================
        // PARSE
        // ====================================

        const parsed =

            JSON.parse(raw);

        // ====================================
        // TRACE
        // ====================================

        logStorage(
            "get",
            key
        );

        return parsed;

    } catch (error) {

        logError(
            "STORAGE",
            "get failed",
            {
                key,
                error
            }
        );

        return fallback;
    }
}

// ============================================
// SET STORAGE
// ============================================

export function setStorage(
    key,
    value
) {

    try {

        localStorage.setItem(

            key,

            JSON.stringify(value)
        );

        // ====================================
        // TRACE
        // ====================================

        logStorage(
            "set",
            key
        );

    } catch (error) {

        logError(
            "STORAGE",
            "set failed",
            {
                key,
                error
            }
        );
    }
}

// ============================================
// REMOVE STORAGE
// ============================================

export function removeStorage(
    key
) {

    try {

        localStorage.removeItem(
            key
        );

        // ====================================
        // TRACE
        // ====================================

        logStorage(
            "remove",
            key
        );

    } catch (error) {

        logError(
            "STORAGE",
            "remove failed",
            {
                key,
                error
            }
        );
    }
}