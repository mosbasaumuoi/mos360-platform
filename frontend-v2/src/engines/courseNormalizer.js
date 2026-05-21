// ============================================
// MOS360 COURSE NORMALIZER
// Canonical course normalization runtime
// ============================================

// ============================================
// NORMALIZE COURSE
// ============================================

export function normalizeCourse(

    course

) {

    return {

        // ====================================
        // REQUIRED
        // ====================================

        id:
            course.id,

        slug:
            course.slug,

        title:
            course.title,

        description:
            course.description,

        category:
            course.category,

        level:
            course.level,

        xpReward:
            course.xpReward,

        lessons:
            course.lessons || [],

        // ====================================
        // OPTIONAL STRINGS
        // ====================================

        thumbnail:
            course.thumbnail || "",

        duration:
            course.duration || "Đang cập nhật",

        difficulty:
            course.difficulty || "beginner",

        status:
            course.status || "active",

        version:
            course.version || "v1",

        // ====================================
        // OPTIONAL ARRAYS
        // ====================================

        tags:
            course.tags || [],

        objectives:
            course.objectives || [],

        skills:
            course.skills || [],

        requirements:
            course.requirements || [],

        learningOutcomes:
            course.learningOutcomes || []
    };
}