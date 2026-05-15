// ============================================
// MOS360 ID GENERATOR
// ============================================

// ============================================
// GENERATE CERTIFICATE ID
// ============================================

export function generateCertificateId() {

    const timestamp =

        Date.now();

    const random =

        Math.floor(

            Math.random() * 100000

        );

    return `MOS360-${timestamp}-${random}`;
}