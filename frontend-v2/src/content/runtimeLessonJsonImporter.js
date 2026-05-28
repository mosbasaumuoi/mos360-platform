import {

    importRuntimeLesson

}

    from "./importRuntimeLessonPipeline";

// ============================================
// IMPORT JSON LESSON
// ============================================

export async function importRuntimeLessonJson(

    file

) {

    const rawText =

        await file.text();

    const parsedLesson =

        JSON.parse(rawText);

    return importRuntimeLesson(
        parsedLesson
    );
}

// ============================================
// IMPORT MULTIPLE JSON LESSONS
// ============================================

export async function importRuntimeLessonJsonCollection(

    files = []

) {

    return Promise.all(

        Array.from(files).map(

            importRuntimeLessonJson
        )
    );
}