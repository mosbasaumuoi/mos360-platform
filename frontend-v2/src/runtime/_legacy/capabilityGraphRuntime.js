/**
 * MOS360
 * Capability Graph Runtime
 *
 * RESPONSIBILITY:
 * - capability dependency orchestration
 * - prerequisite stabilization
 * - mastery dependency analysis
 * - capability graph intelligence
 *
 * THIS IS:
 * - capability topology layer
 * - dependency-aware progression runtime
 *
 * MUST NOT:
 * - create chaotic dependency routing
 * - overload learner progression
 * - simulate fake AI complexity
 */

// ============================================
// BUILD CAPABILITY GRAPH
// ============================================

export function buildCapabilityGraphRuntime({

    blocks = [],

    telemetry = {}

}) {

    const semanticMap =
        telemetry?.semanticMap || {};

    return blocks.map(
        block => {

            const capability =
                buildCapabilityState({

                    block,

                    semanticMap
                });

            return {

                ...block,

                capabilityNode:
                    capability.node,

                capabilityState:
                    capability.state,

                prerequisiteState:
                    capability.prerequisite,

                capabilitySupport:
                    capability.support
            };
        }
    );
}

// ============================================
// BUILD CAPABILITY STATE
// ============================================

function buildCapabilityState({

    block,

    semanticMap

}) {

    const node =
        block.semanticZone || "general";

    const dependencies =
        resolveDependencies(
            node
        );

    const weakestDependency =
        resolveWeakestDependency({

            dependencies,

            semanticMap
        });

    // ================================
    // UNSTABLE FOUNDATION
    // ================================

    if (
        weakestDependency.score <= 0.4
    ) {

        return {

            node,

            state:
                "foundation-fragile",

            prerequisite:
                weakestDependency.name,

            support:
                `Strengthening ${weakestDependency.name} will stabilize this progression path`
        };
    }

    // ================================
    // DEVELOPING FOUNDATION
    // ================================

    if (
        weakestDependency.score <= 0.7
    ) {

        return {

            node,

            state:
                "foundation-developing",

            prerequisite:
                weakestDependency.name,

            support:
                `Your dependency graph is stabilizing through connected progression`
        };
    }

    // ================================
    // STABLE FOUNDATION
    // ================================

    return {

        node,

        state:
            "foundation-stable",

        prerequisite:
            weakestDependency.name,

        support:
            "Your capability foundation is stable enough for deeper progression"
    };
}

// ============================================
// DEPENDENCY GRAPH
// ============================================

function resolveDependencies(
    node
) {

    const graph = {

        formula: [
            "logic",
            "data-understanding"
        ],

        pivot: [
            "formula",
            "data-understanding"
        ],

        automation: [
            "logic",
            "workflow-thinking"
        ],

        listening: [
            "vocabulary",
            "context-recognition"
        ]
    };

    return graph[node] || [];
}

// ============================================
// WEAKEST DEPENDENCY
// ============================================

function resolveWeakestDependency({

    dependencies,

    semanticMap

}) {

    if (!dependencies.length) {

        return {

            name:
                "core-progression",

            score: 1
        };
    }

    let weakest = {

        name:
            dependencies[0],

        score:
            semanticMap[
                dependencies[0]
            ] || 0.5
    };

    dependencies.forEach(
        dependency => {

            const score =
                semanticMap[
                    dependency
                ] || 0.5;

            if (
                score < weakest.score
            ) {

                weakest = {

                    name:
                        dependency,

                    score
                };
            }
        }
    );

    return weakest;
}