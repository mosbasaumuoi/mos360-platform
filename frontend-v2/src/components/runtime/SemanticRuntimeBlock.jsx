export default function SemanticRuntimeBlock({

    block,

    onFocus

}) {

    return (

        <div

            onClick={onFocus}

            className={`
relative
overflow - hidden
rounded - 3xl
border
cursor - pointer
transition - all

                ${
    block.flowTransition === "cinematic"
    ? "duration-700"
    : ""
}

                ${
    block.flowTransition === "breathing"
    ? "duration-1000"
    : ""
}

                ${
    block.flowTransition === "soft"
    ? "duration-500"
    : ""
}

                ${
    block.flowTransition === "light"
    ? "duration-300"
    : ""
}

                ${
    block.flowRole === "entry"
    ? "mt-12"
    : ""
}

                ${
    block.flowRole === "resolution"
    ? "mb-20"
    : ""
}

                ${
    block.flowRole === "recovery"
    ? "max-w-2xl mx-auto"
    : ""
}

                ${
    block.flowIntensity === "high"
    ? "shadow-xl"
    : ""
}

                ${
    block.flowIntensity === "low"
    ? "opacity-90"
    : ""
}

                ${
    block.semanticSurface === "immersive"
    ? "bg-white"
    : ""
}

                ${
    block.semanticSurface === "reflection"
    ? "bg-black/[0.02]"
    : ""
}

                ${
    block.semanticSurface === "support"
    ? "bg-black/[0.015]"
    : ""
}

                ${
    block.semanticSurface === "recovery"
    ? "bg-black/[0.01]"
    : ""
}

                ${
    block.semanticSurface === "challenge"
    ? "border-black/20"
    : ""
}

                ${
    block.focusState === "active"
    ? "scale-[1.01]"
    : ""
}

                ${
    block.focusState === "near"
    ? "opacity-90"
    : ""
}

                ${
    block.focusState === "dimmed"
    ? "opacity-40 scale-[0.985]"
    : ""
}

                ${
    block.surfaceSpacing === "expanded"
    ? "px-8 py-8"
    : "px-7 py-6"
}

                ${
    block.surfaceSpacing === "breathing"
    ? "py-12"
    : ""
}

                ${
    block.adaptiveState === "recovery"
    ? "opacity-80"
    : ""
}

                ${
    block.adaptiveState === "guided"
    ? "ring-1 ring-black/10"
    : ""
}

                ${
    block.adaptiveState === "immersive"
    ? "scale-[1.01]"
    : ""
}
`}
        >

            <RuntimeBlockRenderer
                block={block}
            />

            {block.progressionGuidance && (

                <div className="
                    mt-6
                    text-sm
                    text-neutral-500
                    leading-relaxed
                    max-w-2xl
                ">

                    {block.progressionGuidance}

                </div>

            )}

            {block.sessionContinuity && (

                <div className="
                    mt-4
                    text-xs
                    text-neutral-400
                    leading-relaxed
                    tracking-wide
                ">

                    {block.sessionContinuity}

                </div>

            )}

            {block.progressionSupport && (

                <div className="
                    mt-5
                    text-sm
                    text-neutral-500
                    leading-relaxed
                    max-w-2xl
                ">

                    {block.progressionSupport}

                </div>

            )}

        </div>
    );
}

/* ========================================= */
/* BLOCK RENDERER */
/* ========================================= */

function RuntimeBlockRenderer({

    block

}) {

    switch (block.type) {

        case "video":

            return (
                <VideoRuntimeBlock
                    block={block}
                />
            );

        case "checkpoint":

            return (
                <CheckpointRuntimeBlock
                    block={block}
                />
            );

        case "reinforcement":

            return (
                <ReinforcementRuntimeBlock
                    block={block}
                />
            );

        case "practice":

            return (
                <PracticeRuntimeBlock
                    block={block}
                />
            );

        case "quiz":

            return (
                <QuizRuntimeBlock
                    block={block}
                />
            );

        default:

            return (
                <DefaultRuntimeBlock
                    block={block}
                />
            );
    }
}

function VideoRuntimeBlock({

    block

}) {

    return (

        <div className="
            space-y-5
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.25em]
                opacity-30
            ">

                Immersive Lesson

            </div>

            <div className="
                aspect-video
                rounded-[2rem]
                bg-black/[0.04]
            " />

            <div className="
                space-y-4
                max-w-2xl
            ">

                <div className="
                    text-[2rem]
                    font-semibold
                    tracking-tight
                    leading-tight
                ">

                    {block.title ||
                        "Cinematic Learning Flow"}

                </div>

                <div className="
                    text-base
                    leading-relaxed
                    opacity-60
                ">

                    Progression-oriented immersive learning experience

                </div>

            </div>

        </div>
    );
}

function CheckpointRuntimeBlock({

    block

}) {

    return (

        <div className="
            max-w-2xl
            mx-auto
            text-center
            py-4
            space-y-5
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.25em]
                opacity-30
            ">

                Reflection Point

            </div>

            <div className="
                text-[2rem]
                font-semibold
                leading-tight
                tracking-tight
            ">

                {block.title ||
                    "Pause and reconnect with your progression"}

            </div>

            <div className="
                text-sm
                opacity-55
                leading-relaxed
            ">

                Continuity reinforcement moment

            </div>

        </div>
    );
}

function ReinforcementRuntimeBlock({

    block

}) {

    return (

        <div className="
            max-w-xl
            mx-auto
            py-3
            space-y-4
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.25em]
                opacity-30
            ">

                Momentum Support

            </div>

            <div className="
                text-lg
                leading-relaxed
                font-medium
            ">

                {block.message ||
                    "Your progression is still moving forward"}

            </div>

        </div>
    );
}

function PracticeRuntimeBlock({

    block

}) {

    return (

        <div className="
            space-y-6
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.25em]
                opacity-30
            ">

                Active Practice

            </div>

            <div className="
                text-[2rem]
                font-semibold
                tracking-tight
            ">

                {block.title ||
                    "Hands-on Progression"}

            </div>

            <div className="
                rounded-[2rem]
                border
                bg-black/[0.02]
                p-6
                text-sm
                leading-relaxed
            ">

                Active semantic learning experience

            </div>

        </div>
    );
}

function QuizRuntimeBlock({

    block

}) {

    return (

        <div className="
            space-y-6
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.25em]
                opacity-30
            ">

                Progression Check

            </div>

            <div className="
                text-[2rem]
                font-semibold
                tracking-tight
            ">

                {block.title ||
                    "Learning Challenge"}

            </div>

        </div>
    );
}

function DefaultRuntimeBlock({

    block

}) {

    return (

        <div className="
            space-y-4
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.25em]
                opacity-30
            ">

                Semantic Runtime

            </div>

            <div className="
                text-2xl
                font-semibold
                tracking-tight
            ">

                {block.title ||
                    "Learning Runtime Block"}

            </div>

            <div className="
                text-sm
                opacity-60
                leading-relaxed
                max-w-2xl
            ">

                Progression-oriented semantic runtime rendering

            </div>

        </div>
    );
}
