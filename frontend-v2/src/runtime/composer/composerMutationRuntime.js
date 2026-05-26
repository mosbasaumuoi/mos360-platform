import {

    moveBlock

}

    from "./composerInteractionRuntime";

export function reorderRuntimeBlocks({

    blocks,

    fromIndex,

    toIndex

}) {

    return moveBlock({

        blocks,

        fromIndex,

        toIndex
    });
}