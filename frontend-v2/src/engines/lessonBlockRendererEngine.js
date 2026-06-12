// ============================================
// LESSON BLOCK RENDERER ENGINE
// Cinematic Semantic Runtime
// ============================================

import {
    validateLessonBlock
}
    from "../contracts/lessonBlock.contract.js";

// ============================================
// BLOCK ICONS
// ============================================

function getCalloutIcon(
    variant
) {

    if (variant === "warning") {
        return "⚠️";
    }

    if (variant === "important") {
        return "📌";
    }

    if (variant === "mindset") {
        return "🧠";
    }

    return "💡";
}

// ============================================
// RENDER BLOCK
// ============================================

export function renderLessonBlock(

    block,
    index = 0

) {

    const validBlock =

        validateLessonBlock(
            block
        );

    if (!validBlock) {

        return "";
    }

    // ========================================
    // VIDEO
    // ========================================

    if (block.type === "video") {

        const videoUrl =

            block.videoUrl
            ||
            block.media?.[0]?.url
            ||
            block.media?.[0]?.value
            ||
            "";

        console.log(
            "VIDEO URL",
            videoUrl,
            block
        );

        return `

        <section
            id="lesson-primary-video"
            class="lesson-video-block cinematic-spacing"
        >

            <div
                class="video-block-shell"
                style="
                    overflow: visible;
                    transform: none;
                "
            >

                <div class="lesson-video-top">

                    <div class="lesson-video-label">

                        VIDEO LESSON

                    </div>

                    <div
                        id="videoStatus"
                        class="lesson-video-status"
                    >

                        Video bài học

                    </div>

                </div>

                <iframe
                    class="lesson-video-frame"
                    style="
                        position: relative;
                        z-index: 1;
                        border: none;
                    "
                    src="${videoUrl}"
                    title="${block.title || ""}"
                    frameborder="0"
                    allowfullscreen
                ></iframe>

            </div>

        </section>

    `;
    }

    // ========================================
    // TEXT
    // ========================================

    if (block.type === "text") {

        return `

<section class="lesson-text-block cinematic-spacing">

    <div class="lesson-rich-text">

        ${

            block.content

            ||

            block.resources?.find(
                item =>
                    item.type === "content"
            )?.value

            ||

            ""

        }

    </div>

</section>

        `;
    }

    // ========================================
    // WORKFLOW
    // ========================================

    if (block.type === "workflow") {

        const workflowSteps =

            block.steps
            ||
            block.sequence?.nodes
            ||
            [];
        
        return `

<section class="workflow-block cinematic-spacing">

    <div class="workflow-shell">

        <div class="workflow-top">

            <div class="workflow-label">

                WORKFLOW

            </div>

            <div class="workflow-progress-line"></div>

        </div>

        <h2>

            ${block.title || "Workflow"}

        </h2>

        <ol class="workflow-list">

            ${workflowSteps

                .map(

                    (
                        step,
                        stepIndex
                    ) => `

<li class="workflow-step">

    <div class="workflow-step-number">

        ${stepIndex + 1}

    </div>

    <div class="workflow-step-content">

        ${step}

    </div>

</li>

                `
                )

                .join("")}

        </ol>

    </div>

</section>

        `;
    }

    // ========================================
    // CALLOUT
    // ========================================

    if (block.type === "callout") {

        return `

<section class="lesson-callout-block cinematic-spacing">

    <div class="callout-card ${block.variant || "tip"}">

        <div class="callout-top">

            <div class="callout-icon">

                ${getCalloutIcon(
            block.variant
        )}

            </div>

            <div class="callout-label">

                ${block.variant || "TIP"}

            </div>

        </div>

        <h3>

            ${block.title || ""}

        </h3>

        <p>

            ${

            block.content

            ||

            block.resources?.[0]?.value

            ||

            ""

            }

        </p>

    </div>

</section>

        `;
    }

    
    // ========================================
    // RESOURCE
    // ========================================

    if (block.type === "resource") {

        return `

<section class="lesson-resource-block cinematic-spacing">

    <details class="resource-details">

        <summary>

            📦 Tài liệu & thực hành

        </summary>

        <div class="resource-collapse">

            ${(block.resources || [])

                .map(resource => `

<a
    href="${resource.url || "#"}"
    target="_blank"
    class="lesson-resource-item"
>

    <span>

        ${resource.title}

    </span>

</a>

                `)

                .join("")}

        </div>

    </details>

</section>

        `;
    }
    
    // ========================================
    // CHECKPOINT
    // ========================================

    if (block.type === "checkpoint") {

        return `

<section class="checkpoint-block cinematic-spacing">

    <div class="checkpoint-card">

        <div class="checkpoint-glow"></div>

        <div class="checkpoint-label">

            LEARNING CHECKPOINT

        </div>

        <h2>

            ${block.title || ""}

        </h2>

        <p>

            ${block.content || ""}

        </p>

        <div class="checkpoint-progression">

            <div class="checkpoint-line"></div>

            <span>

                Tiếp tục duy trì nhịp học tập
            </span>

        </div>

    </div>

</section>

    `;
    }
 
    // ========================================
    // PRACTICE
    // ========================================

    if (block.type === "practice") {

        const practiceTasks =

            block.tasks
            ||
            block.activities
            ||
            [];

        return renderPracticeSection([
            {
                title:
                    block.title ||
                    "Thực hành",

                tasks:
                    practiceTasks
            }
        ]);
    }    

    // ========================================
    // QUIZ
    // ========================================

    if (block.type === "quiz") {

        return "";

    }

    return "";
}

// ============================================
// RENDER BLOCKS
// ============================================

export function renderLessonBlocks(

    blocks = []

) {

    return blocks
        .map(

            (
                block,
                index
            ) =>

                renderLessonBlock(
                    block,
                    index
                )
        )
        .join("");
}

// ============================================
// BIND PRACTICE MISSIONS
// ============================================

export function bindPracticeMissions() {

    document

        .querySelectorAll(
            ".practice-mission-item"
        )

        .forEach((item) => {

            item.onclick = () => {

                item.classList.toggle(
                    "completed"
                );
            };
        });
}

export function bindQuizInteractions() {

    document

        .querySelectorAll(
            ".quiz-shell"
        )

        .forEach(shell => {

            let selected = null;

            const answers =
                shell.querySelectorAll(
                    ".quiz-answer-item"
                );

            answers.forEach(btn => {

                btn.onclick = () => {

                    answers.forEach(
                        a => a.classList.remove(
                            "selected"
                        )
                    );

                    btn.classList.add(
                        "selected"
                    );

                    selected =
                        Number(
                            btn.dataset.answer
                        );
                };
            });

            const submitBtn =
                shell.querySelector(
                    ".quiz-submit-btn"
                );

            const result =
                shell.querySelector(
                    ".quiz-result"
                );

            submitBtn.onclick = () => {

                if (
                    selected === null
                ) {

                    result.innerHTML =
                        "⚠️ Hãy chọn đáp án";

                    return;
                }

                const correct =
                    Number(
                        shell.dataset.correct
                    );

                if (
                    selected === correct
                ) {

                    result.innerHTML =
                        "✅ Chính xác";

                } else {

                    result.innerHTML =
                        "❌ Chưa đúng";
                }
            };
        });
}
// ============================================
// RENDER PRACTICE SECTION
// ============================================

export function renderPracticeSection(

    practice = []

) {

    if (

        !Array.isArray(practice)
        ||
        !practice.length

    ) {

        return "";
    }

    return practice.map((item) => `

<section class="lesson-practice-block cinematic-spacing">

    <div class="practice-shell">

        <div class="practice-top">

            <div class="practice-label">

                THỰC HÀNH

            </div>

            <div class="practice-badge">

                APPLY NOW

            </div>

        </div>

        <h2>

            ${item.title || ""}

        </h2>

        <div class="practice-mission-list">

            ${(item.tasks || [])

            .map(

                (
                    task,
                    taskIndex
                ) => `

<div
    class="practice-mission-item"
    data-mission="${taskIndex}"
>

    <button
        class="practice-check-btn"
    >

        <span>

            ✓

        </span>

    </button>

    <div class="practice-mission-content">

        ${task}

    </div>

</div>

                    `
            )

            .join("")}

        </div>

    </div>

</section>

    `).join("");
}