// ============================================
// MOS360 IMPORT PAGE
// Runtime-governed spreadsheet import
// ============================================

import {

    renderAppLayout

}

    from "../../layouts/appLayout.js";

import {

    fetchSheetTab

}

    from "../../engines/googleSheetEngine.js";

import {

    importRuntimeLessons,

    getImportedLessons

}

    from "../../engines/runtimeImportEngine.js";

import {

    getRuntimeLessonReadiness

}

    from "../../runtime/content/runtimeLessonService";

// ============================================
// RENDER IMPORT PAGE
// ============================================

export function renderImportPage() {

    const content = `

<div class="import-page">

    <div class="import-header">

        <div class="import-badge">

            GOOGLE SHEET IMPORT

        </div>

        <h1>

            Import khóa học MOS360

        </h1>

        <p>

            Paste Google Sheet ID để import
            runtime lessons.

        </p>

    </div>

    <div class="import-card">

        <label>

            Google Sheet ID

        </label>

        <input
            type="text"
            id="sheetIdInput"
            placeholder="Ví dụ: 1abcXYZ..."
        />

        <div class="import-actions">

            <button
                id="importCoursesBtn"
                class="import-btn"
            >

                Load Courses

            </button>

            <button
                id="importLessonsBtn"
                class="import-btn secondary"
            >

                Import Runtime Lessons

            </button>

        </div>

        <div id="importStatus">

        </div>

    </div>

</div>

    `;

    document.querySelector(
        "#app"
    ).innerHTML =

        renderAppLayout(
            content
        );

    bindImportActions();
}

// ============================================
// BIND ACTIONS
// ============================================

function bindImportActions() {

    const statusEl =

        document.querySelector(
            "#importStatus"
        );

    // ========================================
    // LOAD COURSES
    // ========================================

    document
        .querySelector(
            "#importCoursesBtn"
        )
        ?.addEventListener(

            "click",

            async () => {

                const sheetId =

                    document.querySelector(
                        "#sheetIdInput"
                    ).value;

                if (!sheetId) {

                    statusEl.innerHTML =

                        "Vui lòng nhập Sheet ID";

                    return;
                }

                statusEl.innerHTML =

                    "Đang load courses...";

                const result =

                    await fetchSheetTab({

                        sheetId,

                        tabName:
                            "courses"
                    });

                if (!result.ok) {

                    statusEl.innerHTML =

                        "❌ Không thể fetch courses";

                    return;
                }

                console.log(
                    "COURSES",
                    result.data
                );

                statusEl.innerHTML =

                    `
                    <div class="
                        rounded-2xl
                        border
                        border-green-500/20
                        bg-black/20
                        p-5
                        mt-5
                    ">

                        <div class="
                            text-xl
                            text-green-400
                            font-semibold
                        ">

                            ✅ Courses Loaded

                        </div>

                        <div class="
                            mt-3
                            text-sm
                            text-neutral-400
                        ">

                            ${result.data.length} courses detected

                        </div>

                    </div>
                    `;
            }
        );

    // ========================================
    // IMPORT LESSONS
    // ========================================

    document
        .querySelector(
            "#importLessonsBtn"
        )
        ?.addEventListener(

            "click",

            async () => {

                const sheetId =

                    document.querySelector(
                        "#sheetIdInput"
                    ).value;

                if (!sheetId) {

                    statusEl.innerHTML =

                        "Vui lòng nhập Sheet ID";

                    return;
                }

                statusEl.innerHTML =

                    "Đang import runtime lessons...";

                const result =

                    await fetchSheetTab({

                        sheetId,

                        tabName:
                            "lessons"
                    });

                if (!result.ok) {

                    statusEl.innerHTML =

                        "❌ Không thể fetch lessons";

                    return;
                }

                console.log(
                    "LESSONS",
                    result.data
                );

                // ====================================
                // IMPORT INTO RUNTIME
                // ====================================

                const importResult =

                    await importRuntimeLessons(
                        result.data
                    );

                console.log(
                    "IMPORT RESULT",
                    importResult
                );

                // ====================================
                // IMPORTED LESSONS
                // ====================================

                const importedLessons =

                    importResult?.importedLessons
                    ||
                    getImportedLessons()
                    ||
                    [];

                console.log(
                    "IMPORTED LESSONS",
                    importedLessons
                );

                // ====================================
                // FIRST LESSON READINESS
                // ====================================

                const firstLesson =

                    importedLessons?.[0];

                const readiness =

                    firstLesson

                        ? getRuntimeLessonReadiness(
                            firstLesson.id
                        )

                        : {

                            progression: 0,

                            readyForRuntime: false,

                            validationErrors: []
                        };

                console.log(
                    "RUNTIME READINESS",
                    readiness
                );

                // ====================================
                // STATUS UI
                // ====================================

                statusEl.innerHTML =

                    `
                <div class="
                    rounded-2xl
                    border
                    border-orange-500/20
                    bg-black/20
                    p-5
                    mt-5
                ">

                    <div class="
                        text-sm
                        text-neutral-400
                    ">

                        Runtime Readiness

                    </div>

                    <div class="
                        mt-2
                        text-3xl
                        font-semibold
                        text-white
                    ">

                        ${readiness.progression}%

                    </div>

                    <div class="
                        mt-2
                        text-sm
                        text-orange-300
                    ">

                        ${readiness.readyForRuntime

                        ? "✅ Runtime Ready"

                        : "⚠️ Needs Stabilization"
                    }

                    </div>

                    <div class="
                        mt-4
                        text-xs
                        text-neutral-500
                    ">

                        Imported ${importedLessons.length} runtime lessons

                    </div>

                </div>
                `;
            }
        );
}