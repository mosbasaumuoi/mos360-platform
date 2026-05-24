/**
 * MOS360
 * Learning Interaction Tracker
 *
 * RESPONSIBILITY:
 * - block interaction tracking
 * - lesson interaction tracking
 * - pacing signal tracking
 * - continuity signal tracking
 * - hesitation tracking
 * - retry tracking
 *
 * MUST NOT:
 * - mutate runtime
 * - adapt lessons directly
 * - render analytics UI
 */

import {

    createTelemetryEvent,

    trackTelemetryEvent

}

from "./learningTelemetryEngine";

// ============================================
// TRACK BLOCK VIEW
// ============================================

export function trackBlockView({

    lessonId,

    blockId,

    blockType

}) {

    return trackTelemetryEvent(

        createTelemetryEvent({

            type:
                "block-view",

            lessonId,

            blockId,

            metadata: {

                blockType
            }
        })
    );
}

// ============================================
// TRACK BLOCK COMPLETE
// ============================================

export function trackBlockComplete({

    lessonId,

    blockId,

    blockType,

    duration = 0

}) {

    return trackTelemetryEvent(

        createTelemetryEvent({

            type:
                "block-complete",

            lessonId,

            blockId,

            metadata: {

                blockType,

                duration
            }
        })
    );
}

// ============================================
// TRACK CHECKPOINT
// ============================================

export function trackCheckpoint({

    lessonId,

    checkpointId

}) {

    return trackTelemetryEvent(

        createTelemetryEvent({

            type:
                "checkpoint",

            lessonId,

            blockId:
                checkpointId
        })
    );
}

// ============================================
// TRACK HESITATION
// ============================================

export function trackHesitation({

    lessonId,

    blockId,

    hesitationDuration = 0

}) {

    return trackTelemetryEvent(

        createTelemetryEvent({

            type:
                "hesitation",

            lessonId,

            blockId,

            metadata: {

                hesitationDuration
            }
        })
    );
}

// ============================================
// TRACK RETRY
// ============================================

export function trackRetry({

    lessonId,

    blockId,

    retryCount = 1

}) {

    return trackTelemetryEvent(

        createTelemetryEvent({

            type:
                "retry",

            lessonId,

            blockId,

            metadata: {

                retryCount
            }
        })
    );
}

// ============================================
// TRACK SESSION EXIT
// ============================================

export function trackSessionExit({

    lessonId,

    lastBlockId,

    completedBlocks = 0

}) {

    return trackTelemetryEvent(

        createTelemetryEvent({

            type:
                "session-exit",

            lessonId,

            blockId:
                lastBlockId,

            metadata: {

                completedBlocks
            }
        })
    );
}