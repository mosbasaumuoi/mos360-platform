// ============================================
// MOS360 SKILL PROGRESSION ENGINE
// Adaptive semantic skill progression runtime
// ============================================

import {

    detectSkillReadiness

}
    from "./skillGraphEngine.js";

// ============================================
// DETECT SKILL GAPS
// ============================================

export function detectSkillGaps({

    skills = []

}) {

    return skills.filter(

        skill =>

            skill.mastery < 40
    );
}

// ============================================
// DETECT READY SKILLS
// ============================================

export function detectReadySkills({

    skills = []

}) {

    return skills.filter(skill => {

        const readiness =

            detectSkillReadiness({
                skill
            });

        return readiness.ready;
    });
}

// ============================================
// DETECT ADVANCED SKILLS
// ============================================

export function detectAdvancedSkills({

    skills = []

}) {

    return skills.filter(

        skill =>

            skill.mastery >= 80
    );
}

// ============================================
// GENERATE NEXT SKILL RECOMMENDATION
// ============================================

export function generateNextSkillRecommendation({

    skills = []

}) {

    const gaps =

        detectSkillGaps({
            skills
        });

    // ========================================
    // PRIORITIZE GAPS
    // ========================================

    if (gaps.length) {

        return {

            type:
                "skill_gap",

            recommendation:

                `Nên củng cố kỹ năng: ${gaps[0].title}`,

            priority:
                "high"
        };
    }

    const readySkills =

        detectReadySkills({
            skills
        });

    // ========================================
    // NEXT GROWTH
    // ========================================

    if (readySkills.length) {

        return {

            type:
                "skill_growth",

            recommendation:

                `Có thể tiếp tục phát triển kỹ năng: ${readySkills[0].title}`,

            priority:
                "medium"
        };
    }

    // ========================================
    // DEFAULT
    // ========================================

    return {

        type:
            "foundation",

        recommendation:
            "Tiếp tục xây dựng nền tảng kỹ năng từng bước nhỏ.",

        priority:
            "gentle"
    };
}

// ============================================
// GENERATE SKILL PROGRESSION REPORT
// ============================================

export function generateSkillProgressionReport({

    skills = []

}) {

    const gaps =

        detectSkillGaps({
            skills
        });

    const readySkills =

        detectReadySkills({
            skills
        });

    const advancedSkills =

        detectAdvancedSkills({
            skills
        });

    const recommendation =

        generateNextSkillRecommendation({
            skills
        });

    return {

        totalSkills:
            skills.length,

        gaps:
            gaps.length,

        ready:
            readySkills.length,

        advanced:
            advancedSkills.length,

        recommendation
    };
}