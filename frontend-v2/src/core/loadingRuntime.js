// ============================================
// MOS360 LOADING RUNTIME
// Shared loading interaction system
// ============================================

// ============================================
// BUTTON LOADING
// ============================================

export function setButtonLoading({

    button,

    loadingText = "Loading..."

}) {

    if (!button) {
        return;
    }

    // ========================================
    // SAVE ORIGINAL
    // ========================================

    if (!button.dataset.originalText) {

        button.dataset.originalText =

            button.innerHTML;
    }

    // ========================================
    // LOADING STATE
    // ========================================

    button.disabled = true;

    button.classList.add(
        "loading"
    );

    button.innerHTML =

        loadingText;
}

// ============================================
// RESET BUTTON
// ============================================

export function resetButtonLoading({

    button

}) {

    if (!button) {
        return;
    }

    button.disabled = false;

    button.classList.remove(
        "loading"
    );

    if (

        button.dataset.originalText

    ) {

        button.innerHTML =

            button.dataset.originalText;
    }
}

// ============================================
// PAGE TRANSITION
// ============================================

export function startPageTransition() {

    document.body.classList.add(
        "page-transitioning"
    );
}

// ============================================
// END PAGE TRANSITION
// ============================================

export function endPageTransition() {

    requestAnimationFrame(() => {

        document.body.classList.remove(
            "page-transitioning"
        );

    });
}