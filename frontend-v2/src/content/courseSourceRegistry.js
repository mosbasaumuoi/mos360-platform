// ============================================
// COURSE SOURCE REGISTRY
// Auto-discovery manifest content system
// ============================================

// ============================================
// COURSE MANIFESTS
// ============================================

const manifestModules =

    import.meta.glob(

        "./courses/**/course.manifest.js",

        {

            eager: true
        }

    );

// ============================================
// LESSON MODULES
// ============================================

const lessonModules =

    import.meta.glob(

        "./courses/**/*.lesson.js",

        {

            eager: true
        }

    );

// ============================================
// EXTRACT MODULE EXPORT
// ============================================

function extractModuleExport(

    module

) {

    const values =

        Object.values(
            module
        );

    return values[0];
}

// ============================================
// COURSE SOURCES
// ============================================

export const COURSE_SOURCES =

    Object.values(
        manifestModules
    )

        .map(
            extractModuleExport
        )

        .filter(Boolean);

// ============================================
// LESSON SOURCES
// ============================================

export const LESSON_SOURCES =

    Object.values(
        lessonModules
    )

        .map(
            extractModuleExport
        )

        .filter(Boolean);