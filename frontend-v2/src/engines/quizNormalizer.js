// ============================================
// MOS360 QUIZ NORMALIZER
// Canonical quiz normalization runtime
// ============================================

// ============================================
// NORMALIZE QUIZ QUESTION
// ============================================

export function normalizeQuizQuestion(

    question

) {

    return {

        // ====================================
        // REQUIRED
        // ====================================

        question:
            question.question,

        options:
            question.options || [],

        correctAnswer:
            question.correctAnswer,

        // ====================================
        // OPTIONAL STRINGS
        // ====================================

        explanation:
            question.explanation || "",

        difficulty:
            question.difficulty || "beginner",

        type:
            question.type || "multiple-choice",

        reinforcement:

            question.reinforcement

            ||

            "Tiếp tục luyện tập để ghi nhớ workflow tốt hơn.",

        // ====================================
        // OPTIONAL ARRAYS
        // ====================================

        tags:
            question.tags || []
    };
}

// ============================================
// NORMALIZE QUIZ
// ============================================

export function normalizeQuiz(

    quiz = []

) {

    return quiz.map(

        normalizeQuizQuestion
    );
}