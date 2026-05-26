// ============================================
// MOS360 CMS RUNTIME ENGINE
// Semantic-native CMS foundation
// ============================================

// ============================================
// CONTENT STATES
// ============================================

export const CONTENT_STATES = {

    DRAFT:
        "draft",

    REVIEW:
        "review",

    PUBLISHED:
        "published",

    ARCHIVED:
        "archived"
};

// ============================================
// CREATE CMS ENTITY
// ============================================

export function createCMSEntity({

    lesson = {}

} = {}) {

    return {

        ...lesson,

        cms: {

            state:
                CONTENT_STATES.DRAFT,

            version:
                1,

            createdAt:
                Date.now(),

            updatedAt:
                Date.now(),

            publishedAt:
                null
        }
    };
}

// ============================================
// UPDATE ENTITY
// ============================================

export function updateCMSEntity({

    entity = {},
    updates = {}

}) {

    return {

        ...entity,

        ...updates,

        cms: {

            ...entity.cms,

            updatedAt:
                Date.now(),

            version:

                (entity.cms?.version || 1)
                + 1
        }
    };
}

// ============================================
// PUBLISH ENTITY
// ============================================

export function publishCMSEntity({

    entity = {}

}) {

    return {

        ...entity,

        cms: {

            ...entity.cms,

            state:
                CONTENT_STATES.PUBLISHED,

            publishedAt:
                Date.now(),

            updatedAt:
                Date.now()
        }
    };
}

// ============================================
// ARCHIVE ENTITY
// ============================================

export function archiveCMSEntity({

    entity = {}

}) {

    return {

        ...entity,

        cms: {

            ...entity.cms,

            state:
                CONTENT_STATES.ARCHIVED,

            updatedAt:
                Date.now()
        }
    };
}

// ============================================
// IS PUBLISHED
// ============================================

export function isPublishedEntity(

    entity = {}

) {

    return (

        entity.cms?.state ===
        CONTENT_STATES.PUBLISHED
    );
}

// ============================================
// GENERATE CMS REPORT
// ============================================

export function generateCMSReport(

    entities = []

) {

    const report = {

        total: entities.length,

        draft: 0,

        review: 0,

        published: 0,

        archived: 0
    };

    entities.forEach(entity => {

        const state =

            entity.cms?.state;

        if (

            report[state]
            !==
            undefined

        ) {

            report[state]++;
        }
    });

    return report;
}