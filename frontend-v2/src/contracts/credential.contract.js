// ============================================
// CREDENTIAL CONTRACT
// Canonical lightweight runtime contract
// ============================================

export const CREDENTIAL_REQUIRED_FIELDS = [

    "certificateId",

    "studentName",

    "courseName",

    "issueDate"
];

// ============================================
// VALIDATE CREDENTIAL
// ============================================

export function validateCredential(
    credential
) {

    return CREDENTIAL_REQUIRED_FIELDS.every(

        field =>

            field in credential
    );
}