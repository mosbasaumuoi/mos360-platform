// ============================================
// MOS360 ADMIN LIBRARY PAGE
// Runtime Library Manager
// ============================================

export function renderAdminLibraryPage() {

const runtimeLibrary =

    JSON.parse(

        localStorage.getItem(
            "mos360_runtime_library"
        )

        ||

        '{"lessons":[]}'
    );

const lessons =

    runtimeLibrary.lessons || [];

    const lessonCards =

        lessons.map(

            (
                lesson,
                index
            ) => `

        <div
            style="
                padding:20px;
                margin-bottom:16px;
                border:1px solid #222;
                border-radius:12px;
                background:#111;
            "
        >

            <div
                style="
                    font-size:12px;
                    color:#999;
                    margin-bottom:8px;
                "
            >

                LESSON ${index + 1}

            </div>

            <h3
                style="
                    margin:0;
                    color:white;
                "
            >

                ${lesson.title || lesson.id}

            </h3>

            <p
                style="
                    color:#888;
                    margin-top:8px;
                    margin-bottom:16px;
                "
            >

                ${lesson.courseId || ""}

            </p>

            <div
                style="
                    display:flex;
                    gap:10px;
                "
            >

                <button
                    class="runtime-view-btn"
                    data-id="${lesson.id}"
                >
                    View
                </button>

                <button
                    class="runtime-edit-btn"
                    data-id="${lesson.id}"
                >
                    Edit
                </button>

                <button
                    class="runtime-delete-btn"
                    data-id="${lesson.id}"
                >
                    Delete
                </button>

            </div>

        </div>

    `

        ).join("");

    const content = `

    <main
        style="
            padding:40px;
            max-width:1200px;
            margin:auto;
            color:white;
        "
    >

        <div
            style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            "
        >

            <h1>

                Runtime Library

            </h1>

            <button

                id="exportRuntimeBtn"

                style="
                    padding:12px 20px;
                    border:none;
                    border-radius:10px;
                    background:#ff9800;
                    color:white;
                    cursor:pointer;
                "

            >

                Export Library

            </button>

        </div>

        <p
            style="
                color:#888;
                margin-bottom:30px;
            "
        >

            Imported Runtime Lessons:
            ${lessons.length}

        </p>

        ${lessonCards}

    </main>

`;

document.querySelector(
    "#app"
).innerHTML = content;

    bindDeleteButtons();

    bindViewButtons();

    bindEditButtons();

    bindExportButton();

}

// ============================================
// DELETE LESSON
// ============================================

function bindDeleteButtons() {

document

    .querySelectorAll(
        ".runtime-delete-btn"
    )

    .forEach(

        button => {

            button.onclick = () => {

                const lessonId =

                    button.dataset.id;

                const runtimeLibrary =

                    JSON.parse(

                        localStorage.getItem(
                            "mos360_runtime_library"
                        )

                        ||

                        '{"lessons":[]}'
                    );

                runtimeLibrary.lessons =

                    (
                        runtimeLibrary.lessons
                        ||
                        []
                    ).filter(

                        lesson =>

                            lesson.id !== lessonId
                    );

                localStorage.setItem(

                    "mos360_runtime_library",

                    JSON.stringify(
                        runtimeLibrary
                    )
                );

                renderAdminLibraryPage();
            };
        }
    );

}

// ============================================
// EXPORT LIBRARY
// ============================================

function bindExportButton() {

const button =

    document.querySelector(
        "#exportRuntimeBtn"
    );

if (!button) {

    return;
}

button.onclick = () => {

    const runtimeLibrary =

        localStorage.getItem(
            "mos360_runtime_library"
        );

    const blob =

        new Blob(

            [runtimeLibrary],

            {
                type:
                    "application/json"
            }
        );

    const url =

        URL.createObjectURL(
            blob
        );

    const link =

        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        "runtime-library.json";

    link.click();

    URL.revokeObjectURL(
        url
    );
};
}
    // ============================================
    // VIEW LESSON
    // ============================================

    function bindViewButtons() {

        document

            .querySelectorAll(
                ".runtime-view-btn"
            )

            .forEach(

                button => {

                    button.onclick = () => {

                        const lessonId =

                            button.dataset.id;

                        const runtimeLibrary =

                            JSON.parse(

                                localStorage.getItem(
                                    "mos360_runtime_library"
                                )

                                ||

                                '{"lessons":[]}'
                            );

                        const lesson =

                            runtimeLibrary.lessons.find(

                                lesson =>

                                    lesson.id === lessonId
                            );

                        console.log(
                            "VIEW LESSON",
                            lesson
                        );

                        const blockSummary =

                            (lesson.blocks || [])

                                .map(

                                    (
                                        block,
                                        index
                                    ) =>

                                        `${index + 1}. ${block.type}`
                                )

                                .join("\n");

                        console.clear();

                        console.log(
                            "================================="
                        );

                        console.log(
                            "LESSON",
                            lesson.title
                        );

                        console.log(
                            "COURSE",
                            lesson.courseId
                        );

                        console.log(
                            "TOTAL BLOCKS",
                            (lesson.blocks || []).length
                        );

                        console.table(

                            (lesson.blocks || []).map(

                                (
                                    block,
                                    index
                                ) => ({

                                    order:
                                        index + 1,

                                    type:
                                        block.type
                                })
                            )
                        );
                    };
                }
            );
    }
// ============================================
// EDIT LESSON
// ============================================

function bindEditButtons() {

    document

        .querySelectorAll(
            ".runtime-edit-btn"
        )

        .forEach(

            button => {

                button.onclick = () => {

                    const lessonId =

                        button.dataset.id;

                    const runtimeLibrary =

                        JSON.parse(

                            localStorage.getItem(
                                "mos360_runtime_library"
                            )

                            ||

                            '{"lessons":[]}'
                        );

                    const lesson =

                        runtimeLibrary.lessons.find(

                            lesson =>

                                lesson.id === lessonId
                        );

                    if (!lesson) {

                        return;
                    }

                    const newTitle =

                        prompt(

                            "Lesson Title",

                            lesson.title
                        );

                    if (

                        !newTitle ||

                        !newTitle.trim()
                    ) {

                        return;
                    }

                    lesson.title =

                        newTitle.trim();

                    localStorage.setItem(

                        "mos360_runtime_library",

                        JSON.stringify(
                            runtimeLibrary
                        )
                    );

                    renderAdminLibraryPage();
                };
            }
        );
}