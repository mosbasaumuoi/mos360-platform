// ============================================
// MOS360 ECOSYSTEM INTELLIGENCE ENGINE
// Adaptive ecosystem orchestration runtime
// ============================================

import {

    generateLearnerIntelligenceReport

}
    from "./learnerIntelligenceEngine.js";

import {

    generateLearningAnalyticsReport

}
    from "./learningAnalyticsEngine.js";

import {

    generateSkillProgressionReport

}
    from "./skillProgressionEngine.js";

import {

    generateNervousSystemReport

}
    from "./eventIntelligenceEngine.js";

// ============================================
// GENERATE ECOSYSTEM PROFILE
// ============================================

export function generateEcosystemProfile({

    learner = {},
    analytics = {},
    skills = []

}) {

    // ========================================
    // LEARNER INTELLIGENCE
    // ========================================

    const learnerReport =

        generateLearnerIntelligenceReport({

            streak:
                learner.streak || 0,

            progressPercent:
                learner.progressPercent || 0,

            completedLessons:
                learner.completedLessons || 0
        });

    // ========================================
    // ANALYTICS
    // ========================================

    const analyticsReport =

        generateLearningAnalyticsReport({

            streak:
                analytics.streak || 0,

            progressPercent:
                analytics.progressPercent || 0,

            completedLessons:
                analytics.completedLessons || 0,

            totalBlocks:
                analytics.totalBlocks || 0,

            reinforcementBlocks:
                analytics.reinforcementBlocks || 0,

            calloutBlocks:
                analytics.calloutBlocks || 0
        });

    // ========================================
    // SKILL PROGRESSION
    // ========================================

    const skillReport =

        generateSkillProgressionReport({
            skills
        });

    // ========================================
    // EVENT SYSTEM
    // ========================================

    const nervousSystem =

        generateNervousSystemReport();

    return {

        learner:
            learnerReport,

        analytics:
            analyticsReport,

        skills:
            skillReport,

        nervousSystem,

        generatedAt:
            Date.now()
    };
}

// ============================================
// GENERATE ADAPTIVE ORCHESTRATION
// ============================================

export function generateAdaptiveOrchestration({

    ecosystem = {}

}) {

    const actions = [];

    // ========================================
    // LEARNER
    // ========================================

    if (

        ecosystem.learner
            ?.learner
            ?.state ===
        "early"

    ) {

        actions.push({

            type:
                "gentle_continuity",

            message:
                "Ưu tiên continuity nhẹ và workflow nhỏ."
        });
    }

    // ========================================
    // FATIGUE
    // ========================================

    if (

        ecosystem.analytics
            ?.fatigue
            ?.level ===
        "high"

    ) {

        actions.push({

            type:
                "reduce_overload",

            message:
                "Nên giảm reinforcement và callout density."
        });
    }

    // ========================================
    // SKILL GAP
    // ========================================

    if (

        ecosystem.skills
            ?.gaps > 0

    ) {

        actions.push({

            type:
                "skill_reinforcement",

            message:
                "Nên ưu tiên củng cố các skill gaps hiện tại."
        });
    }

    return {

        adaptive:
            true,

        actions
    };
}

// ============================================
// GENERATE ECOSYSTEM INTELLIGENCE REPORT
// ============================================

export function generateEcosystemIntelligenceReport({

    learner = {},
    analytics = {},
    skills = []

}) {

    const ecosystem =

        generateEcosystemProfile({

            learner,
            analytics,
            skills
        });

    const orchestration =

        generateAdaptiveOrchestration({

            ecosystem
        });

    return {

        ecosystem,

        orchestration,

        generatedAt:
            Date.now()
    };
}