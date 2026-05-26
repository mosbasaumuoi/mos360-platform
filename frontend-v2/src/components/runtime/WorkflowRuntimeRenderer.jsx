import { useState } from "react";

import SemanticRuntimeBlock
from "./SemanticRuntimeBlock";

import {

    buildProgressionIntelligenceRuntime,

    buildMasteryIntelligenceRuntime,

    buildSemanticIntelligenceRuntime,

    buildCinematicRuntime,

    buildRuntimeSurface,

    buildSemanticSurface,

    buildLearningFlow,

    buildAdaptiveProgressionRuntime,

    buildProgressionGuidance,

    buildRuntimeSessionContinuity

}

    from "../../runtime";

import {

    normalizeRuntimeSignals

}

    from "../../runtime/system/runtimeSignalNormalizer";

import {

    applyRuntimePhase,

    RUNTIME_PHASES

}

    from "../../runtime/system/runtimeMutationLifecycle";    

export default function WorkflowRuntimeRenderer({

    blocks = [],

    telemetry = {}

}) {

    const [
        activeIndex,
        setActiveIndex
    ] = useState(0);

    // ========================================
    // NORMALIZED SIGNALS
    // ========================================

    const runtimeSignals =
        normalizeRuntimeSignals(
            telemetry
        );

    // ========================================
    // CORE RUNTIME
    // ========================================

    const cinematicRuntime =
        buildCinematicRuntime({

            blocks,

            activeIndex
        });

    const runtimeSurface =
        buildRuntimeSurface(
            cinematicRuntime
        );

    const semanticSurface =
        buildSemanticSurface(
            runtimeSurface
        );

    const learningFlow =
        buildLearningFlow(
            semanticSurface
        );

    // ========================================
    // ADAPTIVE FOUNDATION
    // ========================================

    const adaptivePhase =
        applyRuntimePhase({

            phase:
                RUNTIME_PHASES.ADAPTIVE,

            runtimeBuilder:
                ({ blocks, telemetry }) => {

                    const adaptiveRuntime =
                        buildAdaptiveProgressionRuntime({

                            blocks,

                            telemetry
                        });

                    const guidanceRuntime =
                        buildProgressionGuidance({

                            blocks:
                                adaptiveRuntime,

                            telemetry
                        });

                    return (
                        buildRuntimeSessionContinuity({

                            blocks:
                                guidanceRuntime,

                            telemetry
                        })
                    );
                },

            blocks:
                learningFlow,

            telemetry:
                runtimeSignals
        });

    // ========================================
    // PROGRESSION
    // ========================================

    const progressionPhase =
        applyRuntimePhase({

            phase:
                RUNTIME_PHASES.PROGRESSION,

            runtimeBuilder:
                buildProgressionIntelligenceRuntime,

            blocks:
                adaptivePhase.blocks,

            telemetry:
                runtimeSignals
        });

    // ========================================
    // MASTERY
    // ========================================

    const masteryPhase =
        applyRuntimePhase({

            phase:
                RUNTIME_PHASES.MASTERY,

            runtimeBuilder:
                buildMasteryIntelligenceRuntime,

            blocks:
                progressionPhase.blocks,

            telemetry:
                runtimeSignals
        });

    // ========================================
    // SEMANTIC
    // ========================================

    const semanticPhase =
        applyRuntimePhase({

            phase:
                RUNTIME_PHASES.SEMANTIC,

            runtimeBuilder:
                buildSemanticIntelligenceRuntime,

            blocks:
                masteryPhase.blocks,

            telemetry:
                runtimeSignals
        });

    // ========================================
    // FINAL RUNTIME
    // ========================================

    const runtime =
        semanticPhase.blocks;

    const progressionRuntime =
        buildProgressionIntelligenceRuntime({

            blocks:
                sessionRuntime,

            telemetry: {

                ...telemetry,

                masteryConfidence:

                    masteryRuntime[activeIndex]
                        ?.masteryConfidence || 0
            }
        });
    
    return (

        <div className="
            max-w-5xl
            mx-auto
            py-16
            space-y-12
        ">

            {runtime.map(

                (block, index) => (

                    <div
                        key={block.id || index}
                        className="
                            space-y-4
                        "
                    >

                        <SemanticRuntimeBlock

                            block={block}

                            onFocus={() => {

                                setActiveIndex(
                                    index
                                );
                            }}
                        />

                        {/* ================= */}
                        {/* TOPOLOGY STATE */}
                        {/* ================= */}

                        <div className="
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            text-xs
                            opacity-35
                            px-2
                        ">

                            <div>

                                Capability:
                                {" "}
                                {
                                    block.capabilityNode
                                }

                            </div>

                            <div>

                                Topology:
                                {" "}
                                {
                                    block.topologyState
                                }

                            </div>

                            <div>

                                Branch:
                                {" "}
                                {
                                    block.topologyBranch
                                }

                            </div>

                            <div>

                                Routing:
                                {" "}
                                {
                                    block.semanticRouting
                                }

                            </div>

                        </div>

                    </div>
                )
            )}

        </div>
    );
}