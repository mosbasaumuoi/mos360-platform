import {

    createRuntimePreview

}

    from "../../runtime/composer/composerPreviewPipeline";

import {

    selectBlock,

    focusBlock,

    startDraggingBlock,

    stopDraggingBlock
   
}

    from "../../runtime/composer/composerInteractionRuntime";

import {

    enableFocusMode,

    disableFocusMode,

    isBlockDimmed

}

    from "../../runtime/composer/composerFocusRuntime";

import {

    useComposerInteractionStore

}

    from "../../runtime/composer/composerInteractionStore";  
    
import {

    reorderRuntimeBlocks

}

    from "../../runtime/composer/composerMutationRuntime";    

export default function ComposerRuntimePreview({

    blocks = [],

    interactionState = {},

    onInteractionChange,

    onBlocksChange

}) {

    const visualFlow =

        createRuntimePreview({

            blocks
        });

    const {

        focusState,
        setFocusState

    } = useComposerInteractionStore();

    const semanticVariants = {

        hero: {

            glow:
                "from-orange-100/70",

            border:
                "border-orange-200",

            badge:
                "bg-orange-100 text-orange-700"
        },

        checkpoint: {

            glow:
                "from-blue-100/70",

            border:
                "border-blue-200",

            badge:
                "bg-blue-100 text-blue-700"
        },

        reinforcement: {

            glow:
                "from-emerald-100/70",

            border:
                "border-emerald-200",

            badge:
                "bg-emerald-100 text-emerald-700"
        },

        tips: {

            glow:
                "from-violet-100/70",

            border:
                "border-violet-200",

            badge:
                "bg-violet-100 text-violet-700"
        },

        resource: {

            glow:
                "from-slate-100/70",

            border:
                "border-slate-200",

            badge:
                "bg-slate-100 text-slate-700"
        }
    };

    return (

        <div className="
            mx-auto
            flex
            max-w-4xl
            flex-col
            gap-6
            px-2
            py-4
        ">

            {visualFlow.map(

                (block, index) => {

                    const isSelected =

                        interactionState
                            ?.selectedBlockIndex ===
                        index;

                    const isFocused =

                        focusState
                            ?.focusedBlockIndex ===
                        index;

                    const isDragging =

                        interactionState
                            ?.draggingBlockIndex ===
                        index;

                    const variant =

                        semanticVariants[
                        block.type
                        ] ||

                        {

                            glow:
                                "from-orange-50/40",

                            border:
                                "border-black/10",

                            badge:
                                "bg-black/5 text-black/60"
                        };

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
                                        ?.draggingBlockIndex;

                                const updatedBlocks =

                                    reorderRuntimeBlocks({

                                        blocks,

                                        fromIndex,

                                        toIndex:
                                            index
                                    });

                                onBlocksChange(
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
                                group
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                bg-white/95
                                p-7
                                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                                transition-all
                                duration-500
                                cursor-pointer

                                ${variant.border}

                                hover:-translate-y-[2px]
                                hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)]

                                ${isSelected
                                    ? "border-black shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
                                    : ""
                                }

                                ${isFocused
                                    ? `
                                        scale-[1.015]
                                        z-10
                                        shadow-[0_24px_80px_rgba(255,120,0,0.12)]
                                      `
                                    : ""
                                }

                                ${isDragging
                                    ? "opacity-50"
                                    : ""
                                }

                                ${focusState?.enabled &&
                                    typeof focusState?.focusedBlockIndex ===
                                    "number" &&
                                    isBlockDimmed({

                                        focusState,

                                        index
                                    })

                                    ? `
                                        opacity-40
                                        scale-[0.985]
                                        blur-[0.5px]
                                      `
                                    : ""
                                }

                                ${block.cinematicSpacing === "xl"
                                    ? "mt-24"
                                    : block.cinematicSpacing === "lg"
                                        ? "mt-16"
                                        : "mt-6"
                                }
                            `}
                        >

                            <div className={`
                                absolute
                                inset-0
                                bg-gradient-to-br
                                ${variant.glow}
                                via-transparent
                                to-transparent
                                opacity-0
                                transition-opacity
                                duration-500
                                group-hover:opacity-60
                            `} />

                            {isFocused && (

                                <div className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    rounded-3xl
                                    border
                                    border-orange-200/60
                                    shadow-[0_0_120px_rgba(255,120,0,0.12)]
                                "/>
                            )}

                            <div className="
                                relative
                                z-10
                                space-y-4
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div className="
                                        text-[11px]
                                        uppercase
                                        tracking-[0.25em]
                                        text-black/55
                                    ">

                                        {block.semanticZone || "runtime"}

                                    </div>

                                    <div className="
                                        text-[11px]
                                        text-black/45
                                    ">

                                        Runtime #{block.runtimeOrder ?? index}

                                    </div>

                                </div>

                                <div className="space-y-3">

                                    <div className="
                                        text-xl
                                        font-semibold
                                        tracking-tight
                                        text-black
                                    ">

                                        {block.title || block.type}

                                    </div>

                                    <div className="
                                        text-sm
                                        leading-relaxed
                                        text-black/75
                                    ">

                                        {block.content ||
                                            "Runtime semantic block."}

                                    </div>

                                </div>

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    pt-2
                                ">

                                    <div className={`
                                        rounded-full
                                        px-3
                                        py-1
                                        text-[11px]
                                        uppercase
                                        tracking-wide

                                        ${variant.badge}
                                    `}>

                                        {block.type}

                                    </div>

                                    <div className="
                                        rounded-full
                                        bg-black/5
                                        px-3
                                        py-1
                                        text-[11px]
                                        text-black/60
                                    ">

                                        {block.priority || "primary"}

                                    </div>

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
                                        mt-4
                                        text-xs
                                        text-black/50
                                        transition-opacity
                                        hover:opacity-100
                                    "
                                >

                                    {focusState.enabled &&
                                        focusState.focusedBlockIndex ===
                                        index

                                        ? "Exit Focus Mode"

                                        : "Enter Focus Mode"
                                    }

                                </button>

                            </div>

                        </div>
                    );
                }
            )}

        </div>
    );
}