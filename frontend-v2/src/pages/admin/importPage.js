// ============================================
// MOS360 IMPORT PAGE
// Google Sheet import runtime
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

    saveImportedCourses,

    saveImportedLessons

}
    from "../../engines/runtimeImportEngine.js";    

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
            course và lesson runtime.

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

                Import Courses

            </button>

            <button
                id="importLessonsBtn"
                class="import-btn secondary"
            >

                Import Lessons

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
    // IMPORT COURSES
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

                    "Đang import courses...";

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

                saveImportedCourses(
                    result.data
                );

                statusEl.innerHTML =

                    `✅ Fetch ${result.data.length} courses thành công`;

                statusEl.innerHTML =

                    "✅ Import courses thành công (runtime foundation)";
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

                    "Đang import lessons...";

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

                saveImportedLessons(
                    result.data
                );

                statusEl.innerHTML =

                    `✅ Fetch ${result.data.length} lessons thành công`;

                statusEl.innerHTML =

                    "✅ Import lessons thành công (runtime foundation)";
            }
        );
}