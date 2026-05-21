// ============================================
// LESSON BLOCK RENDERER ENGINE
// Stable semantic learning renderer
// ============================================

import {
    validateLessonBlock
}
    from "../contracts/lessonBlock.contract.js";

// ============================================
// VIDEO RESOURCE
// ============================================

function getVideoResource(

    resources = []

) {

    return resources.find(

        resource =>

            resource.type === "video"
    );
}

// ============================================
// RENDER BLOCK
// ============================================

export function renderLessonBlock(

    block

) {

    const validBlock =

        validateLessonBlock(
            block
        );

    if (!validBlock) {

        return "";
    }

    // ========================================
    // TEXT
    // ========================================

    if (block.type === "text") {

        return `

<section class="lesson-text-block">

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

<section class="workflow-mini-card">

    <h3>

        ${block.title || "Workflow"}

    </h3>

    <ol>

        ${(block.steps || [])

                .map(step => `

<li>

    ${step}

</li>

            `)

                .join("")}

    </ol>

</section>

        `;
    }

    // ========================================
    // TIPS
    // ========================================

    if (block.type === "tips") {

        return `

<section class="tips-mini-card">

    <h3>

        ${block.title || "Tips"}

    </h3>

    <ul>

        ${(block.items || [])

                .map(item => `

<li>

    ${item}

</li>

            `)

                .join("")}

    </ul>

</section>

        `;
    }

    // ========================================
    // PRACTICAL
    // ========================================

    if (block.type === "practical") {

        return `

<section class="lesson-practical-block">

    <h2>

        Ứng dụng thực tế

    </h2>

    <p>

        ${block.content || ""}

    </p>

</section>

        `;
    }

    // ========================================
    // CHECKPOINT
    // ========================================

    if (block.type === "checkpoint") {

        return `

<section class="checkpoint-block">

    <div class="checkpoint-card">

        <div class="checkpoint-label">

            LEARNING CHECKPOINT

        </div>

        <h2>

            ${block.title || ""}

        </h2>

        <p>

            ${block.message || ""}

        </p>

    </div>

</section>

        `;
    }

    // ========================================
    // RESOURCE
    // ========================================

    if (block.type === "resource") {

        const video =

            getVideoResource(
                block.resources
            );

        return `

<section class="lesson-resource-block">

    ${video ? `

<div class="video-player-shell">

    <iframe
        class="lesson-video-frame"
        src="${video.url}"
        title="${video.title}"
        allowfullscreen
    ></iframe>

</div>

    ` : ""}

    <details class="resource-details">

        <summary>

            📦 Tài liệu & thực hành

        </summary>

        <div class="resource-collapse">

            ${(block.resources || [])

                .filter(

                    resource =>

                        resource.type !== "video"
                )

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
            renderLessonBlock
        )
        .join("");
}