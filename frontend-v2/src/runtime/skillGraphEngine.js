// ============================================
// MOS360 SKILL GRAPH ENGINE
// Semantic learning skill intelligence graph
// ============================================

// ============================================
// SKILL TYPES
// ============================================

export const SKILL_TYPES = {

    FOUNDATION:
        "foundation",

    WORKFLOW:
        "workflow",

    PRODUCTIVITY:
        "productivity",

    ADVANCED:
        "advanced"
};

// ============================================
// CREATE SKILL NODE
// ============================================

export function createSkillNode({

    id = "",
    title = "",
    type = SKILL_TYPES.FOUNDATION,
    prerequisites = []

} = {}) {

    return {

        id,

        title,

        type,

        prerequisites,

        mastery:
            0
    };
}

// ============================================
// CREATE SKILL EDGE
// ============================================

export function createSkillEdge({

    from = "",
    to = "",
    relationship = "supports"

} = {}) {

    return {

        from,

        to,

        relationship
    };
}

// ============================================
// UPDATE SKILL MASTERY
// ============================================

export function updateSkillMastery({

    skill = {},
    progress = 0

}) {

    return {

        ...skill,

        mastery:

            Math.min(

                100,

                (skill.mastery || 0)
                + progress
            )
    };
}

// ============================================
// DETECT SKILL READINESS
// ============================================

export function detectSkillReadiness({

    skill = {}

}) {

    // ========================================
    // ADVANCED
    // ========================================

    if (

        skill.mastery >= 80

    ) {

        return {

            level:
                "advanced",

            ready:
                true
        };
    }

    // ========================================
    // DEVELOPING
    // ========================================

    if (

        skill.mastery >= 40

    ) {

        return {

            level:
                "developing",

            ready:
                true
        };
    }

    // ========================================
    // EARLY
    // ========================================

    return {

        level:
            "early",

        ready:
            false
    };
}

// ============================================
// GENERATE SKILL REPORT
// ============================================

export function generateSkillReport({

    skills = []

}) {

    const mastered =

        skills.filter(

            skill =>

                skill.mastery >= 80
        );

    const developing =

        skills.filter(

            skill =>

                skill.mastery >= 40
                &&
                skill.mastery < 80
        );

    const early =

        skills.filter(

            skill =>

                skill.mastery < 40
        );

    return {

        totalSkills:
            skills.length,

        mastered:
            mastered.length,

        developing:
            developing.length,

        early:
            early.length
    };
}

// ============================================
// GENERATE LEARNER SKILL PROFILE
// ============================================

export function generateLearnerSkillProfile({

    skills = []

}) {

    const report =

        generateSkillReport({
            skills
        });

    return {

        strengths:

            skills.filter(

                skill =>

                    skill.mastery >= 80
            ),

        developing:

            skills.filter(

                skill =>

                    skill.mastery >= 40
                    &&
                    skill.mastery < 80
            ),

        growthAreas:

            skills.filter(

                skill =>

                    skill.mastery < 40
            ),

        report
    };
}