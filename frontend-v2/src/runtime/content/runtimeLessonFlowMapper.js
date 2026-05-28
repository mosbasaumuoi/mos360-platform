// ============================================
// MAP BLOCK TYPE TO FLOW
// ============================================

export function mapBlockToLessonFlow(

    block = {}

) {

    switch (block.type) {

        case "hero":

            return "intro";

        case "video":

            return "learning";

        case "resource":

            return "learning";

        case "checkpoint":

            return "checkpoint";

        case "practice":

            return "practice";

        case "reinforcement":

            return "reinforcement";

        case "quiz":

            return "reflection";

        default:

            return "learning";
    }
}

// ============================================
// MAP LESSON BLOCKS
// ============================================

export function mapLessonBlocksToFlow(

    blocks = []

) {

    return blocks.map(

        (block) => ({

            ...block,

            lessonFlow:

                block.lessonFlow
                || mapBlockToLessonFlow(block)
        })
    );
}