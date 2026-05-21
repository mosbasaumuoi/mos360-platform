// ============================================
// MOS360 UI ACTIONS
// Shared interaction runtime
// ============================================

import {
    navigate
}
    from "./router.js";

// ============================================
// BIND ROUTES
// ============================================

export function bindRouteLinks() {

    document
        .querySelectorAll("[data-link]")

        .forEach((element) => {

            element.onclick = () => {

                const route =

                    element.dataset.link;

                if (!route) {
                    return;
                }

                navigate(route);
            };
        });
}

// ============================================
// SAFE CLICK
// ============================================

export function bindClick(

    selector,
    callback

) {

    const element =

        document.querySelector(
            selector
        );

    if (!element) {
        return;
    }

    element.onclick =
        callback;
}

// ============================================
// SAFE MULTI CLICK
// ============================================

export function bindAllClicks(

    selector,
    callback

) {

    document
        .querySelectorAll(selector)

        .forEach((element) => {

            element.onclick = () => {

                callback(element);
            };
        });
}