export const SEMANTIC_BLOCK_MAPPING = {

    video: {

        media: ["url"]
    },

    text: {

        metadata: ["content"]
    },

    workflow: {

        sequence: ["steps"]
    },

    practice: {

        activities: ["tasks"]
    },

    quiz: {

        assessment: [

            "question",
            "answers",
            "correctAnswer"
        ]
    },

    callout: {

        metadata: [

            "variant",
            "title",
            "content"
        ]
    },

    checkpoint: {

        metadata: [

            "title",
            "content"
        ]
    },

    resource: {

        resources: ["items"]
    }
};