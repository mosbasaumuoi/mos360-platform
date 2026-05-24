import { useState } from "react";

import {
    buildWorkflowGraphRuntime
}
from "../../runtime/workflowGraphRuntime";

import {
    buildAdaptiveSequencingRuntime
}
from "../../runtime/adaptiveSequencingRuntime";

import {
    buildRevisitIntelligenceRuntime
}
from "../../runtime/revisitIntelligenceRuntime";

import {
    buildMasteryTrackingRuntime
}
from "../../runtime/masteryTrackingRuntime";

import {
    buildAdaptiveDifficultyRuntime
}
from "../../runtime/adaptiveDifficultyRuntime";

import {
    buildReinforcementIntelligenceRuntime
}
from "../../runtime/reinforcementIntelligenceRuntime";

import {
    buildSemanticRoutingRuntime
}
from "../../runtime/semanticRoutingRuntime";

import {
    buildCapabilityGraphRuntime
}
from "../../runtime/capabilityGraphRuntime";

import {
    buildDynamicTopologyRuntime
}
from "../../runtime/dynamicTopologyRuntime";

import {
    buildCinematicRuntime
}
from "../../runtime/cinematicRuntimeEngine";

import {
    buildRuntimeSurface
}
from "../../runtime/runtimeSurfaceEngine";

import {
    buildSemanticSurface
}
from "../../runtime/semanticSurfaceEngine";

import {
    buildLearningFlow
}
from "../../runtime/learningFlowRuntimeEngine";

import {
    buildAdaptiveProgressionRuntime
}
from "../../runtime/adaptiveProgressionRuntime";

import {
    buildProgressionGuidance
}
from "../../runtime/progressionGuidanceEngine";

import {
    buildRuntimeSessionContinuity
}
from "../../runtime/runtimeSessionContinuityEngine";

import SemanticRuntimeBlock
from "./SemanticRuntimeBlock";

export default function WorkflowRuntimeRenderer({

    blocks = [],

    telemetry = {}

}) {

    const [
        activeIndex,
        setActiveIndex
    ] = useState(0);

    // ========================================
    // PIPELINE
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

    const semanticRuntime =
        buildSemanticSurface(
            runtimeSurface
        );

    const flowRuntime =
        buildLearningFlow(
            semanticRuntime
        );

    const adaptiveRuntime =
        buildAdaptiveProgressionRuntime({

            blocks:
                flowRuntime,

            telemetry
        });

    const guidanceRuntime =
        buildProgressionGuidance({

            blocks:
                adaptiveRuntime,

            telemetry
        });

    const sessionRuntime =
        buildRuntimeSessionContinuity({

            blocks:
                guidanceRuntime,

            telemetry
        });

    const workflowRuntime =
        buildWorkflowGraphRuntime({

            blocks:
                sessionRuntime,

            telemetry
        });

    const sequencingRuntime =
        buildAdaptiveSequencingRuntime({

            blocks:
                workflowRuntime,

            telemetry
        });

    const revisitRuntime =
        buildRevisitIntelligenceRuntime({

            blocks:
                sequencingRuntime,

            telemetry
        });

    const masteryRuntime =
        buildMasteryTrackingRuntime({

            blocks:
                revisitRuntime,

            telemetry
        });

    const difficultyRuntime =
        buildAdaptiveDifficultyRuntime({

            blocks:
                masteryRuntime,

            telemetry: {

                ...telemetry,

                masteryConfidence:

                    masteryRuntime[activeIndex]
                        ?.masteryConfidence || 0
            }
        });

    const reinforcementRuntime =
        buildReinforcementIntelligenceRuntime({

            blocks:
                difficultyRuntime,

            telemetry: {

                ...telemetry,

                masteryConfidence:

                    masteryRuntime[activeIndex]
                        ?.masteryConfidence || 0
            }
        });

    const semanticRoutingRuntime =
        buildSemanticRoutingRuntime({

            blocks:
                reinforcementRuntime,

            telemetry
        });

    const capabilityGraphRuntime =
        buildCapabilityGraphRuntime({

            blocks:
                semanticRoutingRuntime,

            telemetry
        });

    // ========================================
    // DYNAMIC TOPOLOGY
    // ========================================

    const runtime =
        buildDynamicTopologyRuntime({

            blocks:
                capabilityGraphRuntime,

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