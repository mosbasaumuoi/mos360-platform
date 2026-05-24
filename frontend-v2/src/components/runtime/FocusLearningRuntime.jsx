import { useState } from "react";

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

import SemanticRuntimeBlock
from "./SemanticRuntimeBlock";

import {

    buildProgressionGuidance

}

from "../../runtime/progressionGuidanceEngine";

import {

    buildRuntimeSessionContinuity

}

from "../../runtime/runtimeSessionContinuityEngine";

export default function FocusLearningRuntime({

    blocks = [],

    telemetry = {}

}) {

    const [

        activeIndex,

        setActiveIndex

    ] = useState(0);

    // ========================================
    // CINEMATIC RUNTIME
    // ========================================

    const cinematicRuntime =
        buildCinematicRuntime({

            blocks,

            activeIndex
        });

    // ========================================
    // SURFACE
    // ========================================

    const runtimeSurface =
        buildRuntimeSurface(
            cinematicRuntime
        );

    // ========================================
    // SEMANTIC
    // ========================================

    const semanticRuntime =
        buildSemanticSurface(
            runtimeSurface
        );

    // ========================================
    // FLOW
    // ========================================

    const flowRuntime =
        buildLearningFlow(
            semanticRuntime
        );

    // ========================================
    // ADAPTIVE
    // ========================================

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

    const runtime =
    buildRuntimeSessionContinuity({

        blocks:
            guidanceRuntime,

        telemetry
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

                    <SemanticRuntimeBlock

                        key={index}

                        block={block}

                        onFocus={() => {

                            setActiveIndex(
                                index
                            );
                        }}
                    />
                )
            )}

        </div>
    );
}