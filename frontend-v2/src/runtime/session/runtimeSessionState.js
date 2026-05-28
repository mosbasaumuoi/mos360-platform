import {

    createRuntimeSession

}

    from "../../contracts/runtimeSessionContract";

import {

    startRuntimeSession,

    updateRuntimeProgression,

    visitRuntimeBlock

}

    from "./runtimeSessionProgression";

import {

    trackBlockEnter

}

    from "./runtimeSessionEventEngine";

// ============================================
// CREATE LESSON SESSION
// ============================================

export function createLessonSession({

    lessonId,

    userId = null

}) {

    return startRuntimeSession(

        createRuntimeSession({

            lessonId,

            userId
        })
    );
}

// ============================================
// ENTER BLOCK
// ============================================

export function enterRuntimeBlock({

    session,

    block,

    blockIndex = 0,

    totalBlocks = 1

}) {

    let nextSession =

        updateRuntimeProgression({

            session,

            totalBlocks,

            currentBlockIndex:
                blockIndex
        });

    nextSession =

        visitRuntimeBlock({

            session:
                nextSession,

            blockId:
                block.id
        });

    nextSession =

        trackBlockEnter({

            session:
                nextSession,

            blockId:
                block.id
        });

    return nextSession;
}