/**
 * MOS360
 * Progression Intelligence Runtime
 *
 * CANONICAL OWNERSHIP:
 * - workflow routing
 * - adaptive sequencing
 * - revisit orchestration
 * - topology evolution
 *
 * THIS IS:
 * - canonical progression runtime
 * - progression orchestration domain
 *
 * MUST NOT:
 * - create fragmented orchestration
 * - duplicate telemetry reads
 * - spawn nested progression layers
 */

// ============================================
// BUILD PROGRESSION INTELLIGENCE
// ============================================

export function buildProgressionIntelligenceRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => {

            const progression =
                buildProgressionState({

                    blocks,

                    block,

                    index,

                    telemetry
                });

            return {

                ...block,

                // ====================
                // WORKFLOW
                // ====================

                workflowRole:
                    progression.workflowRole,

                nextRoute:
                    progression.nextRoute,

                // ====================
                // SEQUENCING
                // ====================

                sequencingRole:
                    progression.sequencingRole,

                sequencingPriority:
                    progression.sequencingPriority,

                // ====================
                // REVISIT
                // ====================

                revisitRequired:
                    progression.revisitRequired,

                revisitTarget:
                    progression.revisitTarget,

                // ====================
                // TOPOLOGY
                // ====================

                topologyState:
                    progression.topologyState,

                topologyBranch:
                    progression.topologyBranch,

                // ====================
                // SUPPORT
                // ====================

                progressionSupport:
                    progression.progressionSupport
            };
        }
    );
}

// ============================================
// BUILD PROGRESSION STATE
// ============================================

function buildProgressionState({

    blocks,

    block,

    index,

    telemetry

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const continuity =
        telemetry?.continuityLevel || 0;

    const mastery =
        telemetry?.masteryConfidence || 0;

    // ========================================
    // RECOVERY FLOW
    // ========================================

    if (

        hesitation >= 7

        ||

        continuity <= 3
    ) {

        return {

            workflowRole:
                "recovery",

            nextRoute:

                resolveNextRoute({

                    blocks,

                    index,

                    preferredType:
                        "checkpoint"
                }),

            sequencingRole:
                "recovery-priority",

            sequencingPriority:
                "high",

            revisitRequired:
                true,

            revisitTarget:

                resolveRevisitTarget({

                    blocks,

                    index
                }),

            topologyState:
                "recovery",

            topologyBranch:
                "stabilization-path",

            progressionSupport:
                "Progression flow is stabilizing before advancing complexity"
        };
    }

    // ========================================
    // GUIDED FLOW
    // ========================================

    if (
        mastery <= 0.6
    ) {

        return {

            workflowRole:
                "guided",

            nextRoute:

                resolveNextRoute({

                    blocks,

                    index,

                    preferredType:
                        "reinforcement"
                }),

            sequencingRole:
                "reinforcement-priority",

            sequencingPriority:
                "moderate",

            revisitRequired:
                false,

            revisitTarget:
                null,

            topologyState:
                "guided",

            topologyBranch:
                "reinforcement-path",

            progressionSupport:
                "Progression is reinforcing connected understanding"
        };
    }

    // ========================================
    // ADVANCED FLOW
    // ========================================

    if (
        mastery >= 0.85
    ) {

        return {

            workflowRole:
                "accelerated",

            nextRoute:

                blocks[index + 1]?.id
                || null,

            sequencingRole:
                "accelerated",

            sequencingPriority:
                "adaptive",

            revisitRequired:
                false,

            revisitTarget:
                null,

            topologyState:
                "advanced",

            topologyBranch:
                "deep-progression-path",

            progressionSupport:
                "Progression stability supports deeper advancement"
        };
    }

    // ========================================
    // DEFAULT FLOW
    // ========================================

    return {

        workflowRole:
            "balanced",

        nextRoute:

            blocks[index + 1]?.id
            || null,

        sequencingRole:
            "balanced",

        sequencingPriority:
            "normal",

        revisitRequired:
            false,

        revisitTarget:
            null,

        topologyState:
            "balanced",

        topologyBranch:
            "core-progression-path",

        progressionSupport:
            "Progression is moving steadily"
    };
}

// ============================================
// NEXT ROUTE
// ============================================

function resolveNextRoute({

    blocks,

    index,

    preferredType

}) {

    const match =
        blocks.find(

            (block, currentIndex) => (

                currentIndex > index

                &&

                block.type === preferredType
            )
        );

    return (
        match?.id
        ||
        blocks[index + 1]?.id
        ||
        null
    );
}

// ============================================
// REVISIT TARGET
// ============================================

function resolveRevisitTarget({

    blocks,

    index

}) {

    for (
        let i = index - 1;
        i >= 0;
        i--
    ) {

        const candidate =
            blocks[i];

        if (
            candidate?.priority ===
            "primary"
        ) {

            return candidate.id;
        }
    }

    return null;
}