import {

    createLessonSession,

    enterRuntimeBlock

}

    from "./runtimeSessionState";

import {

    saveRuntimeSession

}

    from "./runtimeSessionStorage";

import {

    completeRuntimeSession

}

    from "./runtimeSessionProgression";     

// ============================================
// INITIALIZE SESSION
// ============================================

export function initializeRuntimeSession({

    lesson

}) {

    const session =

        createLessonSession({

            lessonId:
                lesson.id
        });

    saveRuntimeSession(
        session
    );

    return session;
}

// ============================================
// ENTER LESSON BLOCK
// ============================================

export function enterLessonBlock({

    session,

    lesson,

    blockIndex
}) {

    const blocks =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks

            : [];

    const block =
        blocks[blockIndex];

    if (!block) {

        return session;
    }

    const nextSession =

        enterRuntimeBlock({

            session,

            block,

            blockIndex,

            totalBlocks:
                blocks.length
        });

    let finalSession =
        nextSession;

    const isLastBlock =

        blockIndex >=
        blocks.length - 1;

    if (isLastBlock) {

        finalSession =

            completeRuntimeSession(
                nextSession
            );
    }

    saveRuntimeSession(
        finalSession
    );

    return finalSession;
}