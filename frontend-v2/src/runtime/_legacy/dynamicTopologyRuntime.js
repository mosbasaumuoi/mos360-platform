/**
 * MOS360
 * Dynamic Topology Runtime
 *
 * RESPONSIBILITY:
 * - adaptive progression topology
 * - branch evolution
 * - recovery topology orchestration
 * - mastery-based path evolution
 *
 * THIS IS:
 * - evolving learning graph layer
 * - progression topology intelligence
 *
 * MUST NOT:
 * - create chaotic branching
 * - overload learner navigation
 * - fragment continuity feeling
 */

// ============================================
// BUILD DYNAMIC TOPOLOGY
// ============================================

export function buildDynamicTopologyRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        block => {

            const topology =
                buildTopologyState({

                    block,

                    telemetry
                });

            return {

                ...block,

                topologyState:
                    topology.state,

                topologyBranch:
                    topology.branch,

                topologySupport:
                    topology.support,

                topologyPriority:
                    topology.priority
            };
        }
    );
}

// ============================================
// BUILD TOPOLOGY STATE
// ============================================

function buildTopologyState({

    block,

    telemetry

}) {

    const mastery =
        telemetry?.masteryConfidence || 0;

    const continuity =
        telemetry?.continuityLevel || 0;

    const hesitation =
        telemetry?.hesitationLevel || 0;

    // ================================
    // RECOVERY BRANCH
    // ================================

    if (

        hesitation >= 7

        ||

        continuity <= 3
    ) {

        return {

            state:
                "recovery",

            branch:
                "stabilization-path",

            priority:
                "high",

            support:
                "The runtime is stabilizing your progression path before advancing complexity"
        };
    }

    // ================================
    // GUIDED BRANCH
    // ================================

    if (
        mastery <= 0.6
    ) {

        return {

            state:
                "guided",

            branch:
                "reinforcement-path",

            priority:
                "moderate",

            support:
                "Your progression topology is reinforcing connected capabilities"
        };
    }

    // ================================
    // ADVANCED BRANCH
    // ================================

    if (
        mastery >= 0.85
    ) {

        return {

            state:
                "accelerated",

            branch:
                "deep-progression-path",

            priority:
                "adaptive",

            support:
                "Your stable mastery graph supports deeper progression routing"
        };
    }

    // ================================
    // DEFAULT
    // ================================

    return {

        state:
            "balanced",

        branch:
            "core-progression-path",

        priority:
            "normal",

        support:
            "Your progression topology is evolving steadily"
    };
}