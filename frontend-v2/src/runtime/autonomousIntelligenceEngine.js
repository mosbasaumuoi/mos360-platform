// ============================================
// MOS360 AUTONOMOUS INTELLIGENCE ENGINE
// Adaptive autonomous learning orchestration
// ============================================

import {

    generateEcosystemIntelligenceReport

}
    from "./ecosystemIntelligenceEngine.js";

// ============================================
// DETECT AUTONOMOUS STATE
// ============================================

export function detectAutonomousState({

    ecosystem = {}

}) {

    // ========================================
    // HIGH FATIGUE
    // ========================================

    if (

        ecosystem.analytics
            ?.fatigue
            ?.level ===
        "high"

    ) {

        return {

            state:
                "recovery",

            message:
                "Nên giảm lesson density và reinforcement overload."
        };
    }

    // ========================================
    // EARLY LEARNER
    // ========================================

    if (

        ecosystem.learner
            ?.learner
            ?.state ===
        "early"

    ) {

        return {

            state:
                "guidance",

            message:
                "Ưu tiên continuity nhẹ và workflow foundation."
        };
    }

    // ========================================
    // ADVANCED
    // ========================================

    if (

        ecosystem.learner
            ?.learner
            ?.state ===
        "advanced"

    ) {

        return {

            state:
                "acceleration",

            message:
                "Có thể tăng workflow complexity và practical simulations."
        };
    }

    // ========================================
    // DEFAULT
    // ========================================

    return {

        state:
            "stable",

        message:
            "Learning ecosystem đang ổn định."
    };
}

// ============================================
// GENERATE AUTONOMOUS ACTIONS
// ============================================

export function generateAutonomousActions({

    ecosystem = {}

}) {

    const actions = [];

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
                "reduce_reinforcement",

            priority:
                "high",

            action:
                "Giảm reinforcement density."
        });

        actions.push({

            type:
                "reduce_callouts",

            priority:
                "high",

            action:
                "Giảm visual fatigue bằng cách giảm callouts."
        });
    }

    // ========================================
    // SKILL GAPS
    // ========================================

    if (

        ecosystem.skills
            ?.gaps > 0

    ) {

        actions.push({

            type:
                "skill_gap_focus",

            priority:
                "medium",

            action:
                "Tăng reinforcement cho skill gaps."
        });
    }

    // ========================================
    // EARLY LEARNER
    // ========================================

    if (

        ecosystem.learner
            ?.learner
            ?.state ===
        "early"

    ) {

        actions.push({

            type:
                "gentle_pacing",

            priority:
                "medium",

            action:
                "Giữ workflow ngắn và continuity nhẹ."
        });
    }

    return actions;
}

// ============================================
// GENERATE AUTONOMOUS REPORT
// ============================================

export function generateAutonomousReport({

    learner = {},
    analytics = {},
    skills = []

}) {

    const ecosystemReport =

        generateEcosystemIntelligenceReport({

            learner,
            analytics,
            skills
        });

    const autonomousState =

        detectAutonomousState({

            ecosystem:
                ecosystemReport
                    .ecosystem
        });

    const actions =

        generateAutonomousActions({

            ecosystem:
                ecosystemReport
                    .ecosystem
        });

    return {

        ecosystem:
            ecosystemReport,

        autonomousState,

        actions,

        generatedAt:
            Date.now()
    };
}

// ============================================
// GENERATE AUTONOMOUS SUMMARY
// ============================================

export function generateAutonomousSummary({

    report = {}

}) {

    // ========================================
    // RECOVERY
    // ========================================

    if (

        report.autonomousState
            ?.state ===
        "recovery"

    ) {

        return {

            status:
                "optimize",

            message:
                "MOS360 đang đề xuất giảm overload để cải thiện learning continuity."
        };
    }

    // ========================================
    // ACCELERATION
    // ========================================

    if (

        report.autonomousState
            ?.state ===
        "acceleration"

    ) {

        return {

            status:
                "accelerate",

            message:
                "MOS360 đề xuất tăng workflow complexity phù hợp progression hiện tại."
        };
    }

    // ========================================
    // DEFAULT
    // ========================================

    return {

        status:
            "stable",

        message:
            "Adaptive learning ecosystem đang hoạt động ổn định."
    };
}