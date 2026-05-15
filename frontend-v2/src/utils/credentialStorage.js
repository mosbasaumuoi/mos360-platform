// ============================================
// STORAGE KEYS
// ============================================

import {
    STORAGE_KEYS
}
    from "../constants/storageKeys.js";

import {
    getStorage,
    setStorage
}
    from "./localStorageHelpers.js";

import {
    validateCredential
}
    from "../contracts/credential.contract.js";

import {
    logWarn,
    logInfo
}
    from "./logger.js";

// ============================================
// NORMALIZE CREDENTIAL
// ============================================

function normalizeCredential(
    credential
) {

    return {

        certificateId:

            credential.certificateId ||

            "MOS360-UNKNOWN",

        studentName:

            credential.studentName ||

            credential.name ||

            "MOS360 Student",

        courseName:

            credential.courseName ||

            credential.title ||

            "MOS360 Course",

        issueDate:

            credential.issueDate ||

            credential.date ||

            new Date()
                .toLocaleDateString(),

        issuer:

            credential.issuer ||

            "MOS360 Academy",

        version:

            credential.version ||

            "v1"
    };
}

// ============================================
// GET ALL CREDENTIALS
// ============================================

export function getCredentials() {

    const credentials =

        getStorage(
            STORAGE_KEYS.CREDENTIALS,
            []
        );

    // ========================================
    // VALIDATE + DEDUPE
    // ========================================

    const uniqueMap =
        new Map();

    credentials.forEach(
        credential => {

            const valid =

                validateCredential(
                    credential
                );

            if (!valid) {

                logWarn(

                    "CREDENTIAL",

                    "invalid credential runtime",

                    credential

                );

                return;
            }

            // ====================================
            // DEDUPE
            // ====================================

            uniqueMap.set(
                credential.certificateId,
                credential
            );
        }
    );

    return Array.from(
        uniqueMap.values()
    );
}

// ============================================
// SAVE CREDENTIAL
// ============================================

export function saveCredential(
    credential
) {

    const credentials =
        getCredentials();

    const normalized =

        normalizeCredential(
            credential
        );

    // ========================================
    // VALIDATE CONTRACT
    // ========================================

    const validCredential =

        validateCredential(
            normalized
        );

    if (!validCredential) {

        logWarn(

            "CREDENTIAL",

            "invalid credential contract",

            normalized

        );

        return null;
    }

    // ========================================
    // DUPLICATE SHIELD
    // ========================================

    const alreadyExists =

        credentials.some(

            item =>

                item.certificateId
                ===
                normalized.certificateId
        );

    if (alreadyExists) {

        logWarn(

            "CREDENTIAL",

            "duplicate credential blocked",

            {
                certificateId:
                    normalized.certificateId
            }

        );

        return normalized;
    }

    // ========================================
    // SAVE
    // ========================================

    credentials.push(
        normalized
    );

    setStorage(
        STORAGE_KEYS.CREDENTIALS,
        credentials
    );

    // ========================================
    // TRACE
    // ========================================

    logInfo(

        "CREDENTIAL",

        "credential saved",

        {
            certificateId:
                normalized.certificateId,

            courseName:
                normalized.courseName
        }

    );

    return normalized;
}

// ============================================
// GET CREDENTIAL BY ID
// ============================================

export function getCredentialById(
    certificateId
) {

    const credentials =
        getCredentials();

    const credential =

        credentials.find(

            credential =>

                credential.certificateId
                ===
                certificateId
        );

    // ========================================
    // TRACE MISS
    // ========================================

    if (!credential) {

        logWarn(

            "CREDENTIAL",

            "credential not found",

            {
                certificateId
            }

        );
    }

    return credential;
}