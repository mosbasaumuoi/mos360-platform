// ============================================
// CONTENT VALIDATION PIPELINE
// Semantic content operations validation
// ============================================

// ============================================
// VALIDATE LESSON TITLE
// ============================================

function validateTitle(

    lesson

) {

    if (

        !lesson.title
        ||

        lesson.title.length < 3

    ) {

        return {

            ok: false,

            type:
                "invalid-title"
        };
    }

    return {
        ok: true
    };
}

// ============================================
// VALIDATE WORKFLOW
// ============================================

function validateWorkflow(

    lesson

) {

    if (

        !Array.isArray(
            lesson.workflowSteps
        )

    ) {

        return {

            ok: false,

            type:
                "missing-workflow"
        };
    }

    return {
        ok: true
    };
}

// ============================================
// VALIDATE BLOCKS
// ============================================

function validateBlocks(

    lesson

) {

    if (

        !Array.isArray(
            lesson.blocks
        )

    ) {

        return {

            ok: false,

            type:
                "missing-blocks"
        };
    }

    return {
        ok: true
    };
}

// ============================================
// VALIDATE LESSON CONTENT
// ============================================

export function validateLessonContent(

    lesson

) {

    const validators = [

        validateTitle,

        validateWorkflow,

        validateBlocks
    ];

    const issues = [];

    validators.forEach(

        validator => {

            const result =

                validator(lesson);

            if (!result.ok) {

                issues.push(
                    result.type
                );
            }
        }
    );

    return {

        ok:
            issues.length === 0,

        issues
    };
}