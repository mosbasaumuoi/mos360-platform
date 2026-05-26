/**
 * MOS360
 * Continuity Recovery Engine
 *
 * RESPONSIBILITY:
 * - continuity recovery
 * - session recovery
 * - momentum restoration
 * - lightweight re-entry orchestration
 *
 * MUST NOT:
 * - mutate persisted lessons
 * - overwrite runtime contracts
 * - bypass adaptive runtime
 */

import {

    shouldRecoverContinuity

}

from "../adaptiveSignalEngine";

// ============================================
// BUILD CONTINUITY RECOVERY
// ============================================

export function buildContinuityRecovery({

    signals,

    blocks = []

}) {

    if (
        !shouldRecoverContinuity(
            signals
        )
    ) {

        return {

            shouldRecover:
                false,

            recoveryBlocks:
                []
        };
    }

    return {

        shouldRecover:
            true,

        recoveryBlocks:

            createRecoveryBlocks(
                blocks
            )
    };
}

// ============================================
// CREATE RECOVERY BLOCKS
// ============================================

function createRecoveryBlocks(
    blocks = []
) {

    const lightweightCheckpoint = {

        type:
            "continuity",

        runtimeInjected:
            true,

        message:
            "Let's quickly regain momentum",

        priority:
            "support"
    };

    return [

        lightweightCheckpoint,

        ...blocks
    ];
}