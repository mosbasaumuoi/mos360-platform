/**
 * MOS360
 * Semantic Routing Runtime
 *
 * RESPONSIBILITY:
 * - semantic progression routing
 * - weak capability detection
 * - semantic reinforcement targeting
 * - mastery graph stabilization
 *
 * THIS IS:
 * - capability-aware routing layer
 * - semantic progression intelligence
 *
 * MUST NOT:
 * - reroute chaotically
 * - fragment cinematic continuity
 * - overload learner with branching complexity
 */

// ============================================
// BUILD SEMANTIC ROUTING
// ============================================

export function buildSemanticRoutingRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        block => {

            const semanticState =
                buildSemanticState({

                    block,

                    telemetry
                });

            return {

                ...block,

                semanticZone:
                    semanticState.zone,

                semanticStrength:
                    semanticState.strength,

                semanticRouting:
                    semanticState.routing,

                semanticSupport:
                    semanticState.support
            };
        }
    );
}

// ============================================
// BUILD SEMANTIC STATE
// ============================================

function buildSemanticState({

    block,

    telemetry

}) {

    const semanticMap =
        telemetry?.semanticMap || {};

    const blockZone =
        block.semanticZone || "general";

    const zoneScore =
        semanticMap[blockZone] || 0.5;

    // ================================
    // FRAGILE ZONE
    // ================================

    if (
        zoneScore <= 0.4
    ) {

        return {

            zone:
                blockZone,

            strength:
                "fragile",

            routing:
                "reinforce",

            support:
                "This capability zone needs additional stabilization and reinforcement"
        };
    }

    // ================================
    // DEVELOPING ZONE
    // ================================

    if (
        zoneScore <= 0.7
    ) {

        return {

            zone:
                blockZone,

            strength:
                "developing",

            routing:
                "guided",

            support:
                "This capability zone is progressing steadily through guided practice"
        };
    }

    // ================================
    // STABLE ZONE
    // ================================

    return {

        zone:
            blockZone,

        strength:
            "stable",

        routing:
            "advance",

        support:
            "This capability zone is stable enough for deeper progression"
    };
}