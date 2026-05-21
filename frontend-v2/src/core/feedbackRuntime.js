// ============================================
// MOS360 FEEDBACK RUNTIME
// Tiny emotional feedback system
// ============================================

// ============================================
// SHOW FEEDBACK
// ============================================

export function showFeedback({

    message,

    type = "success",

    duration = 2400

}) {

    // ========================================
    // REMOVE OLD
    // ========================================

    const oldFeedback =

        document.querySelector(
            ".mos-feedback"
        );

    if (oldFeedback) {

        oldFeedback.remove();
    }

    // ========================================
    // CREATE
    // ========================================

    const feedback =

        document.createElement(
            "div"
        );

    feedback.className =

        `mos-feedback ${type}`;

    feedback.innerHTML =
        message;

    document.body.appendChild(
        feedback
    );

    // ========================================
    // SHOW
    // ========================================

    requestAnimationFrame(() => {

        feedback.classList.add(
            "show"
        );

    });

    // ========================================
    // AUTO REMOVE
    // ========================================

    setTimeout(() => {

        feedback.classList.remove(
            "show"
        );

        setTimeout(() => {

            feedback.remove();

        }, 220);

    }, duration);
}