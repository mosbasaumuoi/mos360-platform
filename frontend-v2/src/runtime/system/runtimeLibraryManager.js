// ============================================
// MOS360 RUNTIME LIBRARY MANAGER
// ============================================

const STORAGE_KEY =
    "mos360_runtime_library";

// ============================================
// GET LIBRARY
// ============================================

export function getLibrary() {

    try {

        return JSON.parse(

            localStorage.getItem(
                STORAGE_KEY
            )

            ||

            '{"lessons":[]}'

        );

    } catch {

        return {
            lessons: []
        };
    }
}

// ============================================
// SAVE LIBRARY
// ============================================

export function saveLibrary(
    library
) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            library
        )
    );
}

// ============================================
// GET LESSONS
// ============================================

export function getLessons() {

    return getLibrary().lessons;
}

// ============================================
// SAVE LESSON
// ============================================

export function saveLesson(
    lesson
) {

    const library =
        getLibrary();

    const existingIndex =

        library.lessons.findIndex(

            item =>
                item.id === lesson.id
        );

    if (existingIndex >= 0) {

        library.lessons[
            existingIndex
        ] = lesson;

    } else {

        library.lessons.push(
            lesson
        );
    }

    saveLibrary(
        library
    );
}

// ============================================
// SAVE MANY
// ============================================

export function saveLessons(
    lessons = []
) {

    lessons.forEach(
        saveLesson
    );
}

// ============================================
// DELETE
// ============================================

export function deleteLesson(
    lessonId
) {

    const library =
        getLibrary();

    library.lessons =

        library.lessons.filter(

            lesson =>

                lesson.id !== lessonId
        );

    saveLibrary(
        library
    );
}