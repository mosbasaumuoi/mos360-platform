// ============================================
// REINFORCEMENT ENGINE
// Practical workflow reinforcement runtime
// ============================================

import {
    getStorage,
    setStorage
}
    from "../utils/localStorageHelpers.js";

// ============================================
// STORAGE KEY
// ============================================

const REINFORCEMENT_KEY =

    "mos360-reinforcement";

// ============================================
// DEFAULT STATE
// ============================================

function createDefaultState() {

    return {

        weakPoints: {},

        workflowMistakes: {},

        reinforcementHistory: []
    };
}

// ============================================
// LOAD STATE
// ============================================

export function getReinforcementState() {

    return getStorage(

        REINFORCEMENT_KEY,

        createDefaultState()
    );
}

// ============================================
// SAVE STATE
// ============================================

function saveReinforcementState(

    state

) {

    setStorage(

        REINFORCEMENT_KEY,

        state
    );
}

// ============================================
// TRACK WEAK POINT
// ============================================

export function trackWeakPoint(

    key

) {

    if (!key) {
        return;
    }

    const state =

        getReinforcementState();

    const currentValue =

        state.weakPoints[key] || 0;

    state.weakPoints[key] =

        currentValue + 1;

    saveReinforcementState(
        state
    );
}

// ============================================
// TRACK WORKFLOW MISTAKE
// ============================================

export function trackWorkflowMistake(

    workflow

) {

    if (!workflow) {
        return;
    }

    const state =

        getReinforcementState();

    const currentValue =

        state.workflowMistakes[
        workflow
        ] || 0;

    state.workflowMistakes[
        workflow
    ] = currentValue + 1;

    saveReinforcementState(
        state
    );
}

// ============================================
// ADD REINFORCEMENT EVENT
// ============================================

export function addReinforcementEvent(

    event

) {

    const state =

        getReinforcementState();

    state.reinforcementHistory.unshift({

        ...event,

        createdAt:
            Date.now()
    });

    // ========================================
    // LIMIT HISTORY
    // ========================================

    state.reinforcementHistory =

        state.reinforcementHistory
            .slice(0, 50);

    saveReinforcementState(
        state
    );
}

// ============================================
// TOP WEAK POINTS
// ============================================

export function getTopWeakPoints(

    limit = 3

) {

    const state =

        getReinforcementState();

    return Object.entries(

        state.weakPoints

    )

        .sort(

            (
                a,
                b
            ) => b[1] - a[1]
        )

        .slice(0, limit)

        .map(

            item => ({

                key:
                    item[0],

                score:
                    item[1]
            })
        );
}

// ============================================
// GENERATE REINFORCEMENT MESSAGE
// ============================================

export function generateReinforcementMessage() {

    const weakPoints =

        getTopWeakPoints();

    // ========================================
    // NO DATA
    // ========================================

    if (!weakPoints.length) {

        return {

            title:
                "Tiếp tục duy trì workflow học tập",

            message:
                "MOS360 sẽ dần hiểu những kỹ năng cần củng cố để giúp bạn học Office tự nhiên hơn."
        };
    }

    // ========================================
    // TOP WEAK POINT
    // ========================================

    const topPoint =
        weakPoints[0];

    // ========================================
    // SAVE WORKFLOW
    // ========================================

    if (

        topPoint.key
        ===
        "save-workflow"

    ) {

        return {

            title:
                "Hãy duy trì thói quen lưu tài liệu",

            message:
                "Việc sử dụng Ctrl + S thường xuyên sẽ giúp workflow Word và Excel tự nhiên hơn."
        };
    }

    // ========================================
    // SHORTCUTS
    // ========================================

    if (

        topPoint.key
        ===
        "shortcuts"

    ) {

        return {

            title:
                "Bạn nên luyện thêm Office shortcuts",

            message:
                "Shortcuts giúp tăng tốc workflow và tạo phản xạ Office thực tế tốt hơn."
        };
    }

    // ========================================
    // FORMATTING
    // ========================================

    if (

        topPoint.key
        ===
        "formatting"

    ) {

        return {

            title:
                "Formatting cần được luyện thêm",

            message:
                "Hãy luyện tập formatting từng bước nhỏ để tạo workflow ổn định hơn."
        };
    }

    // ========================================
    // DEFAULT
    // ========================================

    return {

        title:
            "Tiếp tục duy trì luyện tập thực tế",

        message:
            "Workflow Office sẽ trở nên tự nhiên hơn khi luyện tập đều đặn."
    };
}