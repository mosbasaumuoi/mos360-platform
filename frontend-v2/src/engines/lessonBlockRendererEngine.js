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

        return `

<section
    id="lesson-primary-video"
    class="lesson-video-block cinematic-spacing"
>

    <div class="video-block-shell">

        <div class="lesson-video-top">

            <div class="lesson-video-label">

                VIDEO LESSON

            </div>

            <div
                id="videoStatus"
                class="lesson-video-status"
            >

                Sẵn sàng học

            </div>

        </div>

        <iframe
            class="lesson-video-frame"
            src="${block.videoUrl || ""}"
            title="${block.title || ""}"
            allowfullscreen
        ></iframe>

        <div class="lesson-video-controls">

            <button
                id="playVideoBtn"
                class="lesson-video-play-btn"
            >

                ▶

            </button>

            <div class="video-progress">

                <div
                    class="video-progress-fill"
                ></div>

                </div>

            </div>

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

        ${block.content || ""}

    </div>

</section>

        `;
    }

    // ========================================
    // WORKFLOW
    // ========================================

    if (block.type === "workflow") {

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

            ${(block.steps || [])

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

            ${block.content || ""}

        </p>

    </div>

</section>

        `;
    }

    // ========================================
    // PRACTICE
    // ========================================

    if (block.type === "practice") {

        return `

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

            ${block.title || ""}

        </h2>

        <div class="practice-content">

            ${block.content || ""}

        </div>

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
    // QUIZ
    // ========================================

    if (block.type === "quiz") {

        return `

<section class="lesson-quiz-block cinematic-spacing">

    <div class="quiz-shell">

        <div class="quiz-label">

            QUICK CHECK
        </div>

        <h2>

            Kiểm tra nhanh

        </h2>

    </div>

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

            ${block.message || ""}

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