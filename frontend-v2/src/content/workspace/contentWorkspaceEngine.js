// ============================================
// CONTENT WORKSPACE ENGINE
// Draft/publish content operations runtime
// ============================================

import {
    getStorage,
    setStorage
}
    from "../../utils/localStorageHelpers.js";

// ============================================
// STORAGE KEY
// ============================================

const CONTENT_WORKSPACE_KEY =

    "mos360-content-workspace";

// ============================================
// DEFAULT WORKSPACE
// ============================================

function createDefaultWorkspace() {

    return {

        drafts: {},

        published: {},

        snapshots: {},

        updatedAt: null
    };
}

// ============================================
// LOAD WORKSPACE
// ============================================

export function getContentWorkspace() {

    return getStorage(

        CONTENT_WORKSPACE_KEY,

        createDefaultWorkspace()
    );
}

// ============================================
// SAVE WORKSPACE
// ============================================

function saveWorkspace(

    workspace

) {

    setStorage(

        CONTENT_WORKSPACE_KEY,

        {

            ...workspace,

            updatedAt:
                Date.now()
        }
    );
}

// ============================================
// SAVE DRAFT
// ============================================

export function saveDraftContent({

    key,

    content

}) {

    if (!key) {
        return;
    }

    const workspace =

        getContentWorkspace();

    workspace.drafts[key] = {

        content,

        updatedAt:
            Date.now()
    };

    saveWorkspace(
        workspace
    );
}

// ============================================
// PUBLISH CONTENT
// ============================================

export function publishContent(

    key

) {

    if (!key) {
        return;
    }

    const workspace =

        getContentWorkspace();

    const draft =

        workspace.drafts[key];

    if (!draft) {

        return false;
    }

    // ========================================
    // SNAPSHOT
    // ========================================

    if (

        workspace.published[key]

    ) {

        workspace.snapshots[key] ||= [];

        workspace.snapshots[key].unshift(

            workspace.published[key]
        );

        workspace.snapshots[key] =

            workspace.snapshots[key]
                .slice(0, 10);
    }

    // ========================================
    // PUBLISH
    // ========================================

    workspace.published[key] = {

        ...draft,

        publishedAt:
            Date.now()
    };

    saveWorkspace(
        workspace
    );

    return true;
}

// ============================================
// GET PUBLISHED CONTENT
// ============================================

export function getPublishedContent(

    key

) {

    const workspace =

        getContentWorkspace();

    return workspace.published[key];
}

// ============================================
// GET DRAFT CONTENT
// ============================================

export function getDraftContent(

    key

) {

    const workspace =

        getContentWorkspace();

    return workspace.drafts[key];
}

// ============================================
// GET CONTENT SNAPSHOTS
// ============================================

export function getContentSnapshots(

    key

) {

    const workspace =

        getContentWorkspace();

    return workspace.snapshots[key]
        || [];
}