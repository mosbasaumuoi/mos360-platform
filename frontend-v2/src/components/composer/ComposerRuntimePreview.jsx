
import {

    createVisualFlow

}

from "../../runtime/composerLayoutEngine";

import {
   
    selectBlock,

    focusBlock,

    startDraggingBlock,

    stopDraggingBlock,

    moveBlock

}

from "../../runtime/composerInteractionEngine";

import {

    createFocusState,

    enableFocusMode,

    disableFocusMode,

    isBlockDimmed

}

from "../../runtime/composerFocusEngine";

export default function ComposerRuntimePreview({

    blocks = [],

    interactionState,

    onInteractionChange

}) {

    const [

        runtimeBlocks,

        setRuntimeBlocks

    ] = useState(blocks);

    
    const visualFlow =
        createVisualFlow(
            runtimeBlocks
        );

    const [

        focusState,

        setFocusState

    ] = useState(
        createFocusState()
        );    

    return (

        <div className="space-y-6">

            {visualFlow.map(

                (block, index) => {

                    const isSelected =

                        interactionState
                            .selectedBlockIndex ===
                        index;

                    const isFocused =

                        interactionState
                            .focusedBlockIndex ===
                        index;

                    const isDragging =

                        interactionState
                            .draggingBlockIndex ===
                        index;

                    return (

                        <div

                            key={index}

                            draggable

                            onDragStart={() => {

                                onInteractionChange(

                                    previous =>

                                        startDraggingBlock({

                                            state:
                                                previous,

                                            index
                                        })
                                );
                            }}

                            onDragEnd={() => {

                                onInteractionChange(

                                    previous =>

                                        stopDraggingBlock(
                                            previous
                                        )
                                );
                            }}

                            onDragOver={(event) => {

                                event.preventDefault();
                            }}

                            onDrop={() => {

                                const fromIndex =

                                    interactionState
                                        .draggingBlockIndex;

                                const updatedBlocks =

                                    moveBlock({

                                        blocks:
                                            runtimeBlocks,

                                        fromIndex,

                                        toIndex:
                                            index
                                    });

                                setRuntimeBlocks(
                                    updatedBlocks
                                );
                            }}

                            onClick={() => {

                                onInteractionChange(

                                    previous =>

                                        selectBlock({

                                            state:
                                                focusBlock({

                                                    state:
                                                        previous,

                                                    index
                                                }),

                                            index
                                        })
                                );
                            }}

                            className={`
                                rounded-2xl
                                border
                                p-5
                                bg-white
                                transition-all
                                cursor-pointer

                                ${block.focusMode === "focused"
                                    ? "ring-2 ring-black/5"
                                    : ""
                                }

                                ${isSelected
                                    ? "border-black"
                                    : "border-black/10"
                                }

                                ${isFocused
                                    ? "scale-[1.01]"
                                    : ""
                                }

                                ${isDragging
                                    ? "opacity-50"
                                    : ""
                                }

                                ${block.cinematicSpacing === "xl"
                                    ? "mt-16"
                                    : block.cinematicSpacing === "lg"
                                        ? "mt-10"
                                        : "mt-4"
                                }
                            `}
                        >

                            <div className="mb-2 text-xs opacity-50">

                                {block.visualGroup}

                            </div>

                            <div className="font-semibold">

                                {block.type}

                            </div>

                            <div className="mt-2 text-xs opacity-40">

                                Runtime Order:
                                {" "}
                                {block.runtimeOrder ?? index}

                            </div>

                            <button

                              onClick={(event) => {

                                  event.stopPropagation();

                                  setFocusState(previous =>

                                  previous.enabled

                                 ? disableFocusMode(
                                  previous
                                )

                                  : enableFocusMode({

                                  state:
                                 previous,

                                 index
                                        })
                                     );
                                    }}

                                className="
                                 mt-3
                                text-xs
                                opacity-50
                                hover:opacity-100
                                transition-opacity
                                 "
                                    >

                                 {focusState.enabled &&
                                 focusState.focusedBlockIndex ===
                                 index

                                ? "Exit Focus"

                                : "Focus"
                                 }

                            </button>

                        </div>
                    );
                }
            )}

        </div>
    );
}