import {

    useState

}

    from "react";

import ComposerRuntimePreview
    from "../runtime/ComposerRuntimePreview";

import SemanticBlockEditor
    from "./SemanticBlockEditor";

import {

    createInteractionState

}

    from "../../runtime/composer/composerInteractionRuntime";

import CinematicComposerShell
    from "./CinematicComposerShell";

import ComposerBlockToolbar
    from "./ComposerBlockToolbar";

import ComposerRuntimeRail
    from "../runtime/ComposerRuntimeRail";

export default function ComposerWorkspace({

    blocks: initialBlocks = []

}) {

    const [

        blocks,
        setBlocks

    ] = useState(
        initialBlocks
    );

    const [

        interactionState,
        setInteractionState

    ] = useState(
        createInteractionState()
    );

    return (

        <CinematicComposerShell>

            <div className="relative">

                {/* ========================= */}
                {/* PREVIEW WORKSPACE */}
                {/* ========================= */}

                <div>

                    <div className="
                    relative
                ">

                        {/* ===================== */}
                        {/* SECTION HEADER */}
                        {/* ===================== */}

                        <div className="
                        flex
                        items-center
                        justify-between
                        mb-6
                    ">

                            <div>

                                <div className="
                                text-lg
                                font-semibold
                                text-neutral-900
                            ">

                                    Runtime Preview

                                </div>

                                <div className="
                                text-sm
                                text-neutral-500
                                mt-1
                            ">

                                    Adaptive semantic runtime orchestration

                                </div>

                            </div>

                        </div>

                        {/* ===================== */}
                        {/* TOOLBAR */}
                        {/* ===================== */}

                        <div className="mb-8">

                            <ComposerBlockToolbar

                                blocks={blocks}

                                onBlocksChange={
                                    setBlocks
                                }
                            />

                        </div>

                        {/* ===================== */}
                        {/* PREVIEW */}
                        {/* ===================== */}

                        <ComposerRuntimePreview

                            blocks={blocks}

                            interactionState={
                                interactionState
                            }

                            onInteractionChange={
                                setInteractionState
                            }

                            onBlocksChange={
                                setBlocks
                            }
                        />

                    </div>

                </div>

                {/* ========================= */}
                {/* FLOATING EDITOR */}
                {/* ========================= */}

                <div className="
                fixed
                top-32
                right-10
                w-[340px]
                space-y-5
                z-30
            ">

                    {/* ===================== */}
                    {/* EDITOR PANEL */}
                    {/* ===================== */}

                    <div className="
                    rounded-3xl
                    border
                    border-neutral-200
                    bg-white/95
                    backdrop-blur-xl
                    shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                    p-6
                ">

                        <div className="mb-5">

                            <div className="
                            text-lg
                            font-semibold
                            text-neutral-900
                        ">

                                Semantic Editor

                            </div>

                            <div className="
                            text-sm
                            text-neutral-500
                            mt-1
                        ">

                                Configure runtime semantics and progression

                            </div>

                        </div>

                        <SemanticBlockEditor

                            blocks={blocks}

                            selectedBlockIndex={
                                interactionState
                                    ?.selectedBlockIndex
                            }

                            onBlocksChange={
                                setBlocks
                            }
                        />

                    </div>

                    {/* ===================== */}
                    {/* RUNTIME INSIGHTS */}
                    {/* ===================== */}

                    <div className="
                    rounded-3xl
                    border
                    border-neutral-200
                    bg-white/95
                    backdrop-blur-xl
                    shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                    p-5
                ">

                        <div className="
                        text-sm
                        font-semibold
                        text-neutral-700
                        mb-4
                    ">

                            Runtime Insights

                        </div>

                        <ComposerRuntimeRail

                            blocks={blocks}

                            interactionState={
                                interactionState
                            }
                        />

                    </div>

                </div>

            </div>

        </CinematicComposerShell>
    );
}