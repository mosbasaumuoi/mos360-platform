import React from "react";

import ReactDOM from "react-dom/client";

import ComposerWorkspace
    from "../../components/composer/ComposerWorkspace";

const mockBlocks = [

    {

        id: "intro",

        type: "hero",

        priority: "primary",

        semanticZone:
            "logic",

        title:
            "Runtime Intro",

        content:
            "Testing runtime convergence."
    },

    {

        id: "formula-training",

        type: "checkpoint",

        priority: "primary",

        semanticZone:
            "formula",

        title:
            "Formula Training",

        content:
            "Adaptive progression test."
    },

    {

        id: "reinforcement",

        type: "reinforcement",

        priority: "secondary",

        semanticZone:
            "logic",

        title:
            "Reinforcement",

        content:
            "Mastery stabilization test."
    }
];

export async function renderRuntimeTestPage() {

    const app =

        document.querySelector(
            "#app"
        );

    app.innerHTML = `

      <div
        id="runtime-test-root"
        class="
        min-h-screen
        bg-neutral-100
        text-neutral-900
        "
      ></div>

    `;

    const root =

        ReactDOM.createRoot(

            document.querySelector(
                "#runtime-test-root"
            )
        );

    root.render(

        <React.StrictMode>

            <div className="
                    min-h-screen
                    bg-neutral-100
                    text-neutral-900
                ">

                <ComposerWorkspace

                    blocks={mockBlocks}

                    onBlocksChange={
                        console.log
                    }

                />

            </div>

        </React.StrictMode>
    );
}