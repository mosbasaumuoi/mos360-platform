export default function SemanticRuntimeBlock({

    block,

    onFocus

}) {

    return (

        <div

            onClick={onFocus}

            className={`
                rounded-3xl
                border
                cursor-pointer

                transition-all

                // ====================
                // FLOW TRANSITIONS
                // ====================

                ${block.flowTransition === "cinematic"
                    ? "duration-700"
                    : ""
                }

                ${block.flowTransition === "breathing"
                    ? "duration-1000"
                    : ""
                }

                ${block.flowTransition === "soft"
                    ? "duration-500"
                    : ""
                }

                ${block.flowTransition === "light"
                    ? "duration-300"
                    : ""
                }

                // ====================
                // FLOW ROLE
                // ====================

                ${block.flowRole === "entry"
                    ? "mt-16"
                    : ""
                }

                ${block.flowRole === "resolution"
                    ? "mb-24"
                    : ""
                }

                ${block.flowRole === "recovery"
                    ? "max-w-2xl mx-auto"
                    : ""
                }

                // ====================
                // FLOW INTENSITY
                // ====================

                ${block.flowIntensity === "high"
                    ? "shadow-lg"
                    : ""
                }

                ${block.flowIntensity === "low"
                    ? "opacity-90"
                    : ""
                }

                // ====================
                // SEMANTIC SURFACE
                // ====================

                ${block.semanticSurface === "immersive"
                    ? "bg-white"
                    : ""
                }

                ${block.semanticSurface === "reflection"
                    ? "bg-black/[0.02]"
                    : ""
                }

                ${block.semanticSurface === "support"
                    ? "bg-black/[0.015]"
                    : ""
                }

                ${block.semanticSurface === "recovery"
                    ? "bg-black/[0.01]"
                    : ""
                }

                ${block.semanticSurface === "challenge"
                    ? "border-black/20"
                    : ""
                }

                // ====================
                // FOCUS
                // ====================

                ${block.focusState === "active"
                    ? "scale-[1.015]"
                    : ""
                }

                ${block.focusState === "near"
                    ? "opacity-85"
                    : ""
                }

                ${block.focusState === "dimmed"
                    ? "opacity-30 scale-[0.985]"
                    : ""
                }

                // ====================
                // SPACING
                // ====================

                ${block.surfaceSpacing === "expanded"
                    ? "p-10"
                    : "p-8"
                }

                ${block.surfaceSpacing === "breathing"
                    ? "py-14"
                    : ""
                }

                ${block.adaptiveState === "recovery"
                    ? "opacity-80"
                    : ""
                }

                ${block.adaptiveState === "guided"
                    ? "ring-1 ring-black/10"
                    : ""
                }

                ${block.adaptiveState === "immersive"
                    ? "scale-[1.01]"
                    : ""
                }
            `}
        >

            {/* ================================= */}
            {/* RUNTIME BODY */}
            {/* ================================= */}

            <RuntimeBlockRenderer
                block={block}
            />

            {/* ===================================== */}
            {/* PROGRESSION SUPPORT */}
            {/* ===================================== */}

            <div className="
                mt-6
                text-sm
                opacity-45
                leading-relaxed
            ">

                {block.progressionGuidance}

            </div>

            <div className="
                mt-3
                text-xs
                opacity-35
                leading-relaxed
            ">

                {block.sessionContinuity}

            </div>

            <div className="
                mt-4
                rounded-2xl
                bg-black/[0.02]
                px-4
                py-3
            ">

                <div className="
                    text-[11px]
                    uppercase
                    tracking-[0.2em]
                    opacity-30
                    mb-2
                ">

                    Mastery State

                </div>

                <div className="
                    text-sm
                    leading-relaxed
                    opacity-60
                ">

                    {block.masterySupport}

                </div>

                <div className="
                    mt-4
                    rounded-2xl
                    border
                    border-black/[0.04]
                    px-4
                    py-3
                ">

                    <div className="
                        text-[11px]
                        uppercase
                        tracking-[0.2em]
                        opacity-30
                        mb-2
                    ">

                        Adaptive Difficulty

                    </div>

                    <div className="
                        mt-4
                        rounded-2xl
                        bg-black/[0.015]
                        px-4
                        py-3
                    ">

                        <div className="
                            text-[11px]
                            uppercase
                            tracking-[0.2em]
                            opacity-30
                            mb-2
                        ">

                            Reinforcement Intelligence

                        </div>

                        <div className="
                            mt-4
                            rounded-2xl
                            border
                            border-black/[0.04]
                            px-4
                            py-3
                        ">

                            <div className="
                                text-[11px]
                                uppercase
                                tracking-[0.2em]
                                opacity-30
                                mb-2
                            ">

                                Semantic Routing

                            </div>

                            <div className="
                                mt-4
                                rounded-2xl
                                bg-black/[0.015]
                                px-4
                                py-3
                            ">

                                <div className="
                                    text-[11px]
                                    uppercase
                                    tracking-[0.2em]
                                    opacity-30
                                    mb-2
                                ">

                                    Capability Graph

                                </div>

                                <div className="
                                    mt-4
                                    rounded-2xl
                                    border
                                    border-black/[0.04]
                                    px-4
                                    py-3
                                ">

                                    <div className="
                                        text-[11px]
                                        uppercase
                                        tracking-[0.2em]
                                        opacity-30
                                        mb-2
                                    ">

                                        Dynamic Topology

                                    </div>

                                    <div className="
                                        text-sm
                                        leading-relaxed
                                        opacity-60
                                    ">

                                        {block.topologySupport}

                                    </div>

                                </div>

                                <div className="
                                    text-sm
                                    leading-relaxed
                                    opacity-60
                                ">

                                    {block.capabilitySupport}

                                </div>

                            </div>

                            <div className="
                                text-sm
                                leading-relaxed
                                opacity-60
                            ">

                                {block.semanticSupport}

                            </div>

                        </div>

                        <div className="
                            text-sm
                            leading-relaxed
                            opacity-60
                        ">

                            {block.reinforcementSupport}

                        </div>

                    </div>

                    <div className="
                        text-sm
                        leading-relaxed
                        opacity-60
                    ">

                        {block.difficultySupport}

                    </div>

                </div>

            </div>

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

/* ========================================= */
/* VIDEO */
/* ========================================= */

function VideoRuntimeBlock({

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
                    text-3xl
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

/* ========================================= */
/* CHECKPOINT */
/* ========================================= */

function CheckpointRuntimeBlock({

    block

}) {

    return (

        <div className="
            max-w-2xl
            mx-auto
            text-center
            py-4
            space-y-6
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
                text-3xl
                font-semibold
                leading-relaxed
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

/* ========================================= */
/* REINFORCEMENT */
/* ========================================= */

function ReinforcementRuntimeBlock({

    block

}) {

    return (

        <div className="
            max-w-xl
            mx-auto
            py-2
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

/* ========================================= */
/* PRACTICE */
/* ========================================= */

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
                text-3xl
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
                p-8
                text-sm
                leading-relaxed
            ">

                Active semantic learning experience

            </div>

        </div>
    );
}

/* ========================================= */
/* QUIZ */
/* ========================================= */

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
                text-3xl
                font-semibold
                tracking-tight
            ">

                {block.title ||
                    "Learning Challenge"}
            </div>

            <div className="
                space-y-4
            ">

                <div className="
                    rounded-2xl
                    border
                    p-5
                    text-sm
                ">

                    Option A

                </div>

                <div className="
                    rounded-2xl
                    border
                    p-5
                    text-sm
                ">

                    Option B

                </div>

            </div>

        </div>
    );
}

/* ========================================= */
/* DEFAULT */
/* ========================================= */

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