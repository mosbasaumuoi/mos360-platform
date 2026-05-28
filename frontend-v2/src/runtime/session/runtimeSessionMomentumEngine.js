// ============================================
// CALCULATE MOMENTUM
// ============================================

export function calculateSessionMomentum(

    session = {}

) {

    const progression =

        session.progression || 0;

    const visitedBlocks =

        Array.isArray(
            session.visitedBlocks
        )

            ? session.visitedBlocks.length

            : 0;

    const interactions =

        Array.isArray(
            session.interactionEvents
        )

            ? session.interactionEvents.length

            : 0;

    const momentumScore =

        progression +

        visitedBlocks * 2 +

        interactions;

    return {

        progression,

        visitedBlocks,

        interactions,

        momentumScore,

        momentumState:

            momentumScore >= 120

                ? "immersive"

                : momentumScore >= 60

                    ? "engaged"

                    : momentumScore >= 20

                        ? "active"

                        : "starting"
    };
}

// ============================================
// DETECT FATIGUE
// ============================================

export function detectSessionFatigue(

    session = {}

) {

    const interactions =

        Array.isArray(
            session.interactionEvents
        )

            ? session.interactionEvents.length

            : 0;

    const progression =
        session.progression || 0;

    const fatigueRisk =

        progression >= 60 &&

        interactions <= 3;

    return {

        fatigueRisk,

        recommendation:

            fatigueRisk

                ? "reinforcement"

                : "continue"
    };
}