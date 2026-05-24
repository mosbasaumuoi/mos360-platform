import { useState } from "react";

import ComposerRuntimePreview
from "./ComposerRuntimePreview";

import SemanticBlockEditor
from "./SemanticBlockEditor";

import {

    createInteractionState

}

from "../../runtime/composerInteractionEngine";

import CinematicComposerShell
from "./CinematicComposerShell";

import ComposerBlockToolbar
from "./ComposerBlockToolbar";

import ComposerContinuityPanel
from "./ComposerContinuityPanel";

import ComposerMomentumPanel
from "./ComposerMomentumPanel";

import ReinforcementInsightsPanel
from "./ReinforcementInsightsPanel";

export default function ComposerWorkspace({

    blocks = [],

    onBlocksChange

}) {

    const [

        interactionState,

        setInteractionState

    ] = useState(
        createInteractionState()
    );

    return (

        <CinematicComposerShell>

            <div className="
                grid
                grid-cols-12
                gap-6
                items-start
            ">

                {/* ========================= */}
                {/* PREVIEW RUNTIME */}
                {/* ========================= */}

                <div className="
                    col-span-8
                    space-y-4
                ">

                    <div className="
                        text-sm
                        font-semibold
                        opacity-70
                    ">

                        Runtime Preview

                    </div>

                    <ComposerBlockToolbar

                        blocks={blocks}

                        onBlocksChange={
                            onBlocksChange
                        }
                    />

                    <ComposerRuntimePreview

                        blocks={blocks}

                        interactionState={
                            interactionState
                        }

                        onInteractionChange={
                            setInteractionState
                        }
                    />

                </div>

                {/* ========================= */}
                {/* SEMANTIC EDITOR */}
                {/* ========================= */}

                <div className="
                    col-span-4
                    sticky
                    top-24
                ">

                    <div className="
                        text-sm
                        font-semibold
                        opacity-70
                        mb-4
                    ">

                        Semantic Editor

                    </div>

                    <SemanticBlockEditor

                        blocks={blocks}

                        selectedBlockIndex={
                            interactionState
                                .selectedBlockIndex
                        }

                        onBlocksChange={
                            onBlocksChange
                        }
                    />

                    <div className="mt-6">

                        <ComposerContinuityPanel

                            blocks={blocks}

                        />

                    </div>

                    <div className="mt-6">

                        <ComposerMomentumPanel

                            blocks={blocks}

                        />

                    </div>

                    <div className="mt-6">

                        <ReinforcementInsightsPanel

                            lessonId="composer-preview"

                        />

                    </div>

                </div>

            </div>

        </CinematicComposerShell>
    );
}