export const COMPOSER_RUNTIME_SURFACES = [

    "immersive",
    "reflection",
    "support",
    "recovery",
    "challenge"

];

export const COMPOSER_FLOW_TRANSITIONS = [

    "light",
    "soft",
    "cinematic",
    "breathing"

];

export const COMPOSER_FLOW_ROLES = [

    "entry",
    "primary",
    "support",
    "recovery",
    "resolution"

];

export const COMPOSER_FOCUS_STATES = [

    "active",
    "near",
    "dimmed"

];

export const COMPOSER_ADAPTIVE_STATES = [

    "guided",
    "immersive",
    "recovery"

];

export function createComposerRuntimeMeta({

    semanticSurface = "immersive",

    flowTransition = "soft",

    flowRole = "primary",

    focusState = "active",

    adaptiveState = "guided",

    cinematicSpacing = "md",

    surfaceSpacing = "normal"

} = {}) {

    return {

        semanticSurface,

        flowTransition,

        flowRole,

        focusState,

        adaptiveState,

        cinematicSpacing,

        surfaceSpacing
    };
}
