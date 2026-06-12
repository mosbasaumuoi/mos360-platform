// ============================================
// MOS360 ADMIN LIBRARY PAGE
// KV-enabled: sync badge + delete đồng bộ KV
// ============================================

// ============================================
// LOAD LESSONS (localStorage + KV check)
// ============================================

async function loadLibraryLessons() {

    const runtimeLibrary =
        JSON.parse(
            localStorage.getItem(
                "mos360_runtime_library"
            )
            || '{"lessons":[]}'
        );

    const localLessons =
        runtimeLibrary.lessons || [];

    // ========================================
    // LẤY DANH SÁCH KV ĐỂ SO SÁNH
    // ========================================

    let kvLessonIds = new Set();

    try {

        const res =
            await fetch("/api/courses");

        if (res.ok) {

            const data = await res.json();

            const courses =
                Array.isArray(data.data)
                    ? data.data
                    : Array.isArray(data)
                        ? data
                        : [];

            courses.forEach(course => {

                (course.lessons || []).forEach(l => {

                    kvLessonIds.add(l.id);
                });
            });
        }

    } catch {

        // KV không khả dụng — badge sẽ hiện warning
    }

    return { localLessons, kvLessonIds };
}

// ============================================
// RENDER PAGE
// ============================================

export async function renderAdminLibraryPage() {

    // Hiện loading
    const app = document.querySelector("#app");

    app.innerHTML = `
        <main style="padding:40px;max-width:1200px;margin:auto;color:white;">
            <h1>Runtime Library</h1>
            <p style="color:#888;">Đang kiểm tra KV sync...</p>
        </main>
    `;

    const { localLessons, kvLessonIds } =
        await loadLibraryLessons();

    const lessonCards =

        localLessons.map(

            (lesson, index) => {

                const isSynced =
                    kvLessonIds.has(lesson.id);

                const badge = isSynced
                    ? `<span style="
                            display:inline-block;
                            padding:3px 10px;
                            border-radius:20px;
                            background:#1a3a1a;
                            color:#4caf50;
                            font-size:11px;
                            font-weight:600;
                        ">✅ Synced KV</span>`
                    : `<span style="
                            display:inline-block;
                            padding:3px 10px;
                            border-radius:20px;
                            background:#3a2a00;
                            color:#ff9800;
                            font-size:11px;
                            font-weight:600;
                        ">⚠️ Local only</span>`;

                return `
                <div style="
                    padding:20px;
                    margin-bottom:16px;
                    border:1px solid #222;
                    border-radius:12px;
                    background:#111;
                ">
                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:flex-start;
                        margin-bottom:8px;
                    ">
                        <div style="font-size:12px;color:#999;">
                            LESSON ${index + 1}
                        </div>
                        ${badge}
                    </div>

                    <h3 style="margin:0;color:white;">
                        ${lesson.title || lesson.id}
                    </h3>

                    <p style="color:#888;margin-top:6px;margin-bottom:16px;font-size:13px;">
                        ${lesson.courseId || ""}
                        &nbsp;·&nbsp;
                        ${(lesson.blocks || []).length} blocks
                    </p>

                    <div style="display:flex;gap:10px;">

                        <button
                            class="runtime-view-btn"
                            data-id="${lesson.id}"
                            style="
                                padding:8px 16px;
                                border:1px solid #333;
                                border-radius:8px;
                                background:transparent;
                                color:#ccc;
                                cursor:pointer;
                                font-size:13px;
                            "
                        >View</button>

                        <button
                            class="runtime-edit-btn"
                            data-id="${lesson.id}"
                            style="
                                padding:8px 16px;
                                border:1px solid #333;
                                border-radius:8px;
                                background:transparent;
                                color:#ccc;
                                cursor:pointer;
                                font-size:13px;
                            "
                        >Edit</button>

                        <button
                            class="runtime-delete-btn"
                            data-id="${lesson.id}"
                            data-synced="${isSynced}"
                            style="
                                padding:8px 16px;
                                border:1px solid #3a1a1a;
                                border-radius:8px;
                                background:transparent;
                                color:#f44336;
                                cursor:pointer;
                                font-size:13px;
                            "
                        >Delete</button>

                    </div>
                </div>
            `;
            }

        ).join("");

    const kvCount = kvLessonIds.size;
    const localCount = localLessons.length;
    const unsyncedCount =
        localLessons.filter(
            l => !kvLessonIds.has(l.id)
        ).length;

    app.innerHTML = `
        <main style="padding:40px;max-width:1200px;margin:auto;color:white;">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">
                <h1 style="margin:0;">Runtime Library</h1>

                <button
                    id="exportRuntimeBtn"
                    style="
                        padding:12px 20px;
                        border:none;
                        border-radius:10px;
                        background:#ff9800;
                        color:white;
                        cursor:pointer;
                        font-weight:600;
                    "
                >Export Library</button>
            </div>

            <div style="
                display:flex;
                gap:16px;
                margin-bottom:30px;
                flex-wrap:wrap;
            ">
                <div style="
                    padding:12px 20px;
                    background:#111;
                    border:1px solid #222;
                    border-radius:10px;
                    font-size:13px;
                    color:#888;
                ">
                    📦 Local: <strong style="color:white;">${localCount}</strong>
                </div>
                <div style="
                    padding:12px 20px;
                    background:#111;
                    border:1px solid #222;
                    border-radius:10px;
                    font-size:13px;
                    color:#888;
                ">
                    ☁️ KV: <strong style="color:#4caf50;">${kvCount}</strong>
                </div>
                ${unsyncedCount > 0 ? `
                <div style="
                    padding:12px 20px;
                    background:#1a1200;
                    border:1px solid #3a2a00;
                    border-radius:10px;
                    font-size:13px;
                    color:#ff9800;
                ">
                    ⚠️ Chưa sync: <strong>${unsyncedCount}</strong>
                </div>` : ""}
            </div>

            ${localCount === 0
                ? `<p style="color:#555;text-align:center;margin-top:60px;">
                    Chưa có lesson nào. Vào <a href="/admin/import" style="color:#ff9800;">Import</a> để thêm.
                   </p>`
                : lessonCards
            }

        </main>
    `;

    bindDeleteButtons();
    bindViewButtons();
    bindEditButtons();
    bindExportButton();
}

// ============================================
// DELETE — đồng bộ cả localStorage lẫn KV
// ============================================

function bindDeleteButtons() {

    document

        .querySelectorAll(".runtime-delete-btn")

        .forEach(button => {

            button.onclick = async () => {

                const lessonId =
                    button.dataset.id;

                const isSynced =
                    button.dataset.synced === "true";

                const confirmMsg = isSynced
                    ? `Xóa "${lessonId}" khỏi cả localStorage và Cloudflare KV?`
                    : `Xóa "${lessonId}" khỏi localStorage?`;

                if (!confirm(confirmMsg)) {
                    return;
                }

                // ====================================
                // XÓA LOCALSTORAGE
                // ====================================

                const runtimeLibrary =
                    JSON.parse(
                        localStorage.getItem(
                            "mos360_runtime_library"
                        )
                        || '{"lessons":[]}'
                    );

                runtimeLibrary.lessons =
                    (runtimeLibrary.lessons || [])
                        .filter(l => l.id !== lessonId);

                localStorage.setItem(
                    "mos360_runtime_library",
                    JSON.stringify(runtimeLibrary)
                );

                // Xóa trong import storage cũng
                try {
                    const importRaw =
                        localStorage.getItem(
                            "mos360_runtime_import_lessons"
                        );
                    if (importRaw) {
                        const importLessons =
                            JSON.parse(importRaw)
                                .filter(l => l.id !== lessonId);
                        localStorage.setItem(
                            "mos360_runtime_import_lessons",
                            JSON.stringify(importLessons)
                        );
                    }
                } catch { /* ignore */ }

                // ====================================
                // XÓA KV (nếu đã sync)
                // ====================================

                if (isSynced) {

                    try {

                        button.textContent = "Đang xóa...";
                        button.disabled = true;

                        const res = await fetch(
                            `/api/lessons/${lessonId}`,
                            { method: "DELETE" }
                        );

                        if (!res.ok) {
                            console.error(
                                "[MOS360] KV delete failed",
                                res.status
                            );
                        } else {
                            console.log(
                                "[MOS360] KV deleted:",
                                lessonId
                            );
                        }

                    } catch (err) {

                        console.error(
                            "[MOS360] KV delete error",
                            err
                        );
                    }
                }

                await renderAdminLibraryPage();
            };
        });
}

// ============================================
// VIEW LESSON
// ============================================

function bindViewButtons() {

    document

        .querySelectorAll(".runtime-view-btn")

        .forEach(button => {

            button.onclick = () => {

                const lessonId =
                    button.dataset.id;

                const runtimeLibrary =
                    JSON.parse(
                        localStorage.getItem(
                            "mos360_runtime_library"
                        )
                        || '{"lessons":[]}'
                    );

                const lesson =
                    runtimeLibrary.lessons.find(
                        l => l.id === lessonId
                    );

                if (!lesson) return;

                console.clear();
                console.log("=================================");
                console.log("LESSON", lesson.title);
                console.log("COURSE", lesson.courseId);
                console.log("BLOCKS", (lesson.blocks || []).length);
                console.table(
                    (lesson.blocks || []).map(
                        (block, i) => ({
                            order: i + 1,
                            type: block.type,
                            title: block.title || ""
                        })
                    )
                );
            };
        });
}

// ============================================
// EDIT LESSON (title) — lưu cả KV
// ============================================

function bindEditButtons() {

    document

        .querySelectorAll(".runtime-edit-btn")

        .forEach(button => {

            button.onclick = async () => {

                const lessonId =
                    button.dataset.id;

                const runtimeLibrary =
                    JSON.parse(
                        localStorage.getItem(
                            "mos360_runtime_library"
                        )
                        || '{"lessons":[]}'
                    );

                const lesson =
                    runtimeLibrary.lessons.find(
                        l => l.id === lessonId
                    );

                if (!lesson) return;

                const newTitle = prompt(
                    "Lesson Title",
                    lesson.title
                );

                if (!newTitle || !newTitle.trim()) return;

                lesson.title = newTitle.trim();

                localStorage.setItem(
                    "mos360_runtime_library",
                    JSON.stringify(runtimeLibrary)
                );

                await renderAdminLibraryPage();
            };
        });
}

// ============================================
// EXPORT LIBRARY
// ============================================

function bindExportButton() {

    const button =
        document.querySelector("#exportRuntimeBtn");

    if (!button) return;

    button.onclick = () => {

        const runtimeLibrary =
            localStorage.getItem(
                "mos360_runtime_library"
            );

        const blob = new Blob(
            [runtimeLibrary],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "runtime-library.json";
        link.click();

        URL.revokeObjectURL(url);
    };
}
