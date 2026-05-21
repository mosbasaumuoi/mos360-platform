// ============================================
// SPREADSHEET LESSON TRANSFORMER
// Spreadsheet -> semantic lesson pipeline
// ============================================

import {

    SPREADSHEET_LESSON_SCHEMA,

    SPREADSHEET_ARRAY_SEPARATOR,

    QUIZ_OPTION_SEPARATOR

}
    from "./spreadsheetLessonSchema.js";

// ============================================
// ARRAY FIELD
// ============================================

function parseArrayField(

    value

) {

    if (!value) {
        return [];
    }

    return String(value)

        .split(
            SPREADSHEET_ARRAY_SEPARATOR
        )

        .map(
            item => item.trim()
        )

        .filter(Boolean);
}

// ============================================
// QUIZ
// ============================================

function createQuiz(

    row

) {

    if (

        !row[
        SPREADSHEET_LESSON_SCHEMA.quizQuestion
        ]

    ) {

        return [];
    }

    return [

        {

            question:

                row[
                SPREADSHEET_LESSON_SCHEMA.quizQuestion
                ],

            options:

                String(

                    row[
                    SPREADSHEET_LESSON_SCHEMA.quizOptions
                    ] || ""

                )

                    .split(
                        QUIZ_OPTION_SEPARATOR
                    )

                    .map(
                        item => item.trim()
                    )

                    .filter(Boolean),

            correctAnswer:

                Number(

                    row[
                    SPREADSHEET_LESSON_SCHEMA.quizCorrectAnswer
                    ] || 0

                )
        }
    ];
}

// ============================================
// PARSE RESOURCES
// ============================================

function parseResources(

    value

) {

    if (!value) {

        return [];
    }

    try {

        return JSON.parse(value);

    } catch {

        return [];
    }
}

// ============================================
// TRANSFORM SPREADSHEET ROW
// ============================================

export function transformSpreadsheetLesson(

    row

) {

    return {

        id:
            row[
            SPREADSHEET_LESSON_SCHEMA.id
            ],

        courseId:
            row[
            SPREADSHEET_LESSON_SCHEMA.courseId
            ],

        title:
            row[
            SPREADSHEET_LESSON_SCHEMA.title
            ],

        description:
            row[
            SPREADSHEET_LESSON_SCHEMA.description
            ],

        duration:
            row[
            SPREADSHEET_LESSON_SCHEMA.duration
            ],

        difficulty:
            row[
            SPREADSHEET_LESSON_SCHEMA.difficulty
            ],

        workflowSteps:

            parseArrayField(

                row[
                SPREADSHEET_LESSON_SCHEMA.workflowSteps
                ]
            ),

        tips:

            parseArrayField(

                row[
                SPREADSHEET_LESSON_SCHEMA.tips
                ]
            ),

        practicalContent:

            row[
            SPREADSHEET_LESSON_SCHEMA.practicalContent
            ],

        resources:

            parseResources(

                row[
                SPREADSHEET_LESSON_SCHEMA.resources
                ]
            ),    

        quiz:
            createQuiz(row)
            
    };
}