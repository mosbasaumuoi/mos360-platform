/**
 * MOS360
 * Semantic Intelligence Runtime
 *
 * CANONICAL OWNERSHIP:
 * - semantic routing
 * - capability graph
 * - dependency analysis
 *
 * THIS IS:
 * - canonical semantic domain
 * - capability-aware progression runtime
 *
 * MUST NOT:
 * - fragment semantic ownership
 * - duplicate dependency logic
 * - create isolated capability orchestration
 */

// ============================================
// BUILD SEMANTIC INTELLIGENCE
// ============================================

export function buildSemanticIntelligenceRuntime({

    blocks = [],

    telemetry = {}

}) {

    const semanticMap =
        telemetry?.semanticMap || {};

    return blocks.map(
        block => {

            const semantic =
                buildSemanticState({

                    block,

                    semanticMap
                });

            return {

                ...block,

                // ====================
                // SEMANTIC
                // ====================

                semanticZone:
                    semantic.semanticZone,

                semanticStrength:
                    semantic.semanticStrength,

                semanticRouting:
                    semantic.semanticRouting,

                // ====================
                // CAPABILITY
                // ====================

                capabilityState:
                    semantic.capabilityState,

                prerequisiteState:
                    semantic.prerequisiteState,

                dependencyScore:
                    semantic.dependencyScore,

                // ====================
                // SUPPORT
                // ====================

                semanticSupport:
                    semantic.semanticSupport
            };
        }
    );
}

// ============================================
// BUILD SEMANTIC STATE
// ============================================

function buildSemanticState({

    block,

    semanticMap

}) {

    const semanticZone =
        block.semanticZone || "general";

    const zoneScore =
        semanticMap[
        semanticZone
        ] || 0.5;

    const dependencies =
        resolveDependencies(
            semanticZone
        );

    const weakestDependency =
        resolveWeakestDependency({

            dependencies,

            semanticMap
        });

    // ========================================
    // FRAGILE
    // ========================================

    if (
        zoneScore <= 0.4
    ) {

        return {

            semanticZone,

            semanticStrength:
                "fragile",

            semanticRouting:
                "reinforce",

            capabilityState:
                "foundation-fragile",

            prerequisiteState:
                weakestDependency.name,

            dependencyScore:
                weakestDependency.score,

            semanticSupport:
                `Reinforcing ${weakestDependency.name} to stabilize capability progression`
        };
    }

    // ========================================
    // DEVELOPING
    // ========================================

    if (
        zoneScore <= 0.7
    ) {

        return {

            semanticZone,

            semanticStrength:
                "developing",

            semanticRouting:
                "guided",

            capabilityState:
                "foundation-developing",

            prerequisiteState:
                weakestDependency.name,

            dependencyScore:
                weakestDependency.score,

            semanticSupport:
                "Capability progression is stabilizing through guided reinforcement"
        };
    }

    // ========================================
    // ADVANCED
    // ========================================

    return {

        semanticZone,

        semanticStrength:
            "stable",

        semanticRouting:
            "advance",

        capabilityState:
            "foundation-stable",

        prerequisiteState:
            weakestDependency.name,

        dependencyScore:
            weakestDependency.score,

        semanticSupport:
            "Capability stability supports deeper semantic progression"
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