// ============================================
// LEARNING MEMORY ENGINE
// Personalized learning evolution runtime
// ============================================

import {
    getStorage,
    setStorage
}
    from "../utils/localStorageHelpers.js";

// ============================================
// STORAGE KEY
// ============================================

const LEARNING_MEMORY_KEY =

    "mos360-learning-memory";

// ============================================
// DEFAULT MEMORY
// ============================================

function createDefaultMemory() {

    return {

        visitedLessons: {},

        workflowFamiliarity: {},

        confidenceSignals: {},

        revisitPatterns: {},

        learningMoments: []
    };
}

// ============================================
// LOAD MEMORY
// ============================================

export function getLearningMemory() {

    return getStorage(

        LEARNING_MEMORY_KEY,

        createDefaultMemory()
    );
}

// ============================================
// SAVE MEMORY
// ============================================

function saveLearningMemory(

    memory

) {

    setStorage(

        LEARNING_MEMORY_KEY,

        memory
    );
}

// ============================================
// TRACK LESSON VISIT
// ============================================

export function trackLessonVisit(

    lessonId

) {

    if (!lessonId) {
        return;
    }

    const memory =

        getLearningMemory();

    const currentVisits =

        memory.visitedLessons[
        lessonId
        ] || 0;

    memory.visitedLessons[
        lessonId
    ] = currentVisits + 1;

    saveLearningMemory(
        memory
    );
}

// ============================================
// TRACK WORKFLOW FAMILIARITY
// ============================================

export function trackWorkflowFamiliarity(

    workflow

) {

    if (!workflow) {
        return;
    }

    const memory =

        getLearningMemory();

    const currentScore =

        memory.workflowFamiliarity[
        workflow
        ] || 0;

    memory.workflowFamiliarity[
        workflow
    ] = currentScore + 1;

    saveLearningMemory(
        memory
    );
}

// ============================================
// TRACK CONFIDENCE SIGNAL
// ============================================

export function trackConfidenceSignal(

    key,
    value = 1

) {

    if (!key) {
        return;
    }

    const memory =

        getLearningMemory();

    const currentValue =

        memory.confidenceSignals[
        key
        ] || 0;

    memory.confidenceSignals[
        key
    ] = currentValue + value;

    saveLearningMemory(
        memory
    );
}

// ============================================
// TRACK REVISIT
// ============================================

export function trackLessonRevisit(

    lessonId

) {

    if (!lessonId) {
        return;
    }

    const memory =

        getLearningMemory();

    const currentValue =

        memory.revisitPatterns[
        lessonId
        ] || 0;

    memory.revisitPatterns[
        lessonId
    ] = currentValue + 1;

    saveLearningMemory(
        memory
    );
}

// ============================================
// ADD LEARNING MOMENT
// ============================================

export function addLearningMoment(

    moment

) {

    const memory =

        getLearningMemory();

    memory.learningMoments.unshift({

        ...moment,

        createdAt:
            Date.now()
    });

    // ========================================
    // LIMIT MEMORY
    // ========================================

    memory.learningMoments =

        memory.learningMoments
            .slice(0, 100);

    saveLearningMemory(
        memory
    );
}

// ============================================
// MOST VISITED LESSONS
// ============================================

export function getMostVisitedLessons(

    limit = 3

) {

    const memory =

        getLearningMemory();

    return Object.entries(

        memory.visitedLessons

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

                lessonId:
                    item[0],

                visits:
                    item[1]
            })
        );
}

// ============================================
// TOP WORKFLOWS
// ============================================

export function getTopWorkflows(

    limit = 3

) {

    const memory =

        getLearningMemory();

    return Object.entries(

        memory.workflowFamiliarity

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

                workflow:
                    item[0],

                score:
                    item[1]
            })
        );
}

// ============================================
// LEARNING MEMORY SUMMARY
// ============================================

export function getLearningMemorySummary() {

    const memory =

        getLearningMemory();

    const totalLessonsVisited =

        Object.keys(

            memory.visitedLessons

        ).length;

    const totalWorkflows =

        Object.keys(

            memory.workflowFamiliarity

        ).length;

    return {

        totalLessonsVisited,

        totalWorkflows,

        savedMoments:

            memory.learningMoments
                .length
    };
}