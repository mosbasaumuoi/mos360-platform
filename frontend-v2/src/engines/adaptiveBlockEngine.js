// ============================================
// ADAPTIVE BLOCK ENGINE
// Personalized adaptive learning runtime
// ============================================

import {
    getLearningContinuity
}
    from "./learningContinuityEngine.js";

import {
    getTopWeakPoints
}
    from "./reinforcementEngine.js";

import {
    getLearningMemorySummary
}
    from "./learningMemoryEngine.js";

// ============================================
// CREATE CONTINUITY BLOCK
// ============================================

function createContinuityBlock(

    continuity

) {

    // ========================================
    // LOW CONTINUITY
    // ========================================

    if (continuity.streak <= 1) {

        return {

            type:
                "continuity",

            priority:
                "primary",

            title:
                "Duy trì nhịp học từng bước nhỏ",

            message:
                "Chỉ cần duy trì continuity nhẹ nhàng mỗi ngày, kỹ năng Office sẽ cải thiện tự nhiên hơn."
        };
    }

    // ========================================
    // GOOD CONTINUITY
    // ========================================

    if (continuity.streak >= 7) {

        return {

            type:
                "continuity",

            priority:
                "secondary",

            title:
                "Momentum học tập đang hình thành rất tốt",

            message:
                "Bạn đang xây dựng phản xạ Office thông qua continuity ổn định."
        };
    }

    return null;
}

// ============================================
// CREATE REINFORCEMENT BLOCK
// ============================================

function createReinforcementBlock(

    weakPoints = []

) {

    // ========================================
    // NO WEAK POINTS
    // ========================================

    if (!weakPoints.length) {

        return null;
    }

    const topWeakPoint =
        weakPoints[0];

    // ========================================
    // SHORTCUTS
    // ========================================

    if (

        topWeakPoint.key
        ===
        "shortcuts"

    ) {

        return {

            type:
                "reinforcement",

            priority:
                "primary",

            title:
                "Office shortcuts cần được củng cố thêm",

            points: [

                "Hãy luyện Ctrl + S thường xuyên",

                "Làm quen các phím tắt Office cơ bản",

                "Workflow sẽ tự nhiên hơn khi shortcuts trở thành phản xạ"
            ]
        };
    }

    // ========================================
    // FORMATTING
    // ========================================

    if (

        topWeakPoint.key
        ===
        "formatting"

    ) {

        return {

            type:
                "reinforcement",

            priority:
                "primary",

            title:
                "Formatting workflow cần luyện thêm",

            points: [

                "Formatting tốt giúp tài liệu chuyên nghiệp hơn",

                "Hãy luyện từng thao tác nhỏ để tạo workflow ổn định",

                "Sự đều đặn quan trọng hơn học dồn"
            ]
        };
    }

    return null;
}

// ============================================
// CREATE MEMORY BLOCK
// ============================================

function createMemoryBlock(

    memorySummary

) {

    // ========================================
    // NO MEMORY
    // ========================================

    if (

        memorySummary.totalLessonsVisited
        <= 1

    ) {

        return null;
    }

    return {

        type:
            "checkpoint",

        priority:
            "secondary",

        title:
            "Kỹ năng Office đang dần hình thành",

        message:

            `Bạn đã tiếp cận ${memorySummary.totalLessonsVisited} bài học và đang làm quen ${memorySummary.totalWorkflows} workflow thực tế.`
    };
}

// ============================================
// BUILD ADAPTIVE BLOCKS
// ============================================

export function buildAdaptiveBlocks() {

    const blocks = [];

    // ========================================
    // CONTINUITY
    // ========================================

    const continuity =

        getLearningContinuity();

    const continuityBlock =

        createContinuityBlock(
            continuity
        );

    if (continuityBlock) {

        blocks.push(
            continuityBlock
        );
    }

    // ========================================
    // REINFORCEMENT
    // ========================================

    const weakPoints =

        getTopWeakPoints();

    const reinforcementBlock =

        createReinforcementBlock(
            weakPoints
        );

    if (reinforcementBlock) {

        blocks.push(
            reinforcementBlock
        );
    }

    // ========================================
    // MEMORY
    // ========================================

    const memorySummary =

        getLearningMemorySummary();

    const memoryBlock =

        createMemoryBlock(
            memorySummary
        );

    if (memoryBlock) {

        blocks.push(
            memoryBlock
        );
    }

    return blocks;
}