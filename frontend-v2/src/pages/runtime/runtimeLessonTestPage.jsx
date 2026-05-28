import {

    useMemo,

    useState

}

    from "react";

import ReactDOM

    from "react-dom/client";

import {

    getRuntimeLesson,

    getRuntimeLessonReadiness

}

    from "../../runtime/content/runtimeLessonService";

import {

    initializeRuntimeSession,

    enterLessonBlock

}

    from "../../runtime/session/runtimeSessionController";

import {

    createRuntimeSessionViewModel

}

    from "../../runtime/session/runtimeSessionViewModel";

import RuntimeSessionHud

    from "../../components/runtime/RuntimeSessionHud";

// ============================================
// FLOW BADGE
// ============================================

function FlowBadge({

    label

}) {

    return (

        <div className="
            inline-flex
            items-center
            rounded-full
            bg-black/5
            px-3
            py-1
            text-[11px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-neutral-600
        ">

            {label}

        </div>
    );
}

// ============================================
// SCORE CARD
// ============================================

function ScoreCard({

    title,

    value

}) {

    return (

        <div className="
            rounded-2xl
            border
            border-black/5
            bg-white
            p-5
        ">

            <div className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-neutral-400
            ">

                {title}

            </div>

            <div className="
                mt-3
                text-3xl
                font-semibold
                text-black
            ">

                {value}%

            </div>

        </div>
    );
}

// ============================================
// PAGE
// ============================================

export default function RuntimeLessonTestPage() {

    // ========================================
    // LESSON
    // ========================================

    const lesson =

        getRuntimeLesson(
            "excel-basics"
        );

    const readiness =

        getRuntimeLessonReadiness(
            "excel-basics"
        );

    // ========================================
    // NOT FOUND
    // ========================================

    if (!lesson) {

        return (

            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-[#f5f5f3]
            ">

                <div className="
                    rounded-3xl
                    border
                    border-black/5
                    bg-white
                    px-8
                    py-6
                    text-lg
                    font-medium
                ">

                    Runtime lesson not found

                </div>

            </div>
        );
    }

    // ========================================
    // SESSION
    // ========================================

    const initialSession =

        useMemo(

            () =>

                initializeRuntimeSession({

                    lesson
                }),

            [lesson]
        );

    const [

        session,

        setSession

    ] = useState(
        initialSession
    );

    const sessionViewModel =

        createRuntimeSessionViewModel({

            session,

            lesson
        });

    // ========================================
    // RENDER
    // ========================================

    return (

        <div className="
            min-h-screen
            bg-[#f5f5f3]
            px-8
            py-10
        ">

            <div className="
                max-w-7xl
                mx-auto
                space-y-8
            ">

                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="
                    rounded-[32px]
                    border
                    border-black/5
                    bg-white
                    p-8
                ">

                    <div className="
                        flex
                        items-start
                        justify-between
                        gap-10
                    ">

                        <div>

                            <div className="
                                text-xs
                                uppercase
                                tracking-[0.22em]
                                text-orange-500
                            ">

                                MOS360 Runtime

                            </div>

                            <h1 className="
                                mt-3
                                text-4xl
                                font-semibold
                                tracking-tight
                            ">

                                {lesson.title}

                            </h1>

                            <p className="
                                mt-4
                                max-w-3xl
                                text-neutral-600
                                leading-relaxed
                            ">

                                Runtime-governed semantic lesson execution preview.

                            </p>

                            <div className="
                                mt-6
                                flex
                                flex-wrap
                                gap-3
                            ">

                                <FlowBadge
                                    label={lesson.status}
                                />

                                <FlowBadge
                                    label={lesson.semanticVersion}
                                />

                                <FlowBadge
                                    label={`${lesson.blocks.length} blocks`}
                                />

                            </div>

                        </div>

                        <div className="
                            rounded-3xl
                            border
                            border-orange-200
                            bg-orange-50
                            px-6
                            py-5
                            min-w-[260px]
                        ">

                            <div className="
                                text-xs
                                uppercase
                                tracking-[0.18em]
                                text-orange-500
                            ">

                                Runtime Readiness

                            </div>

                            <div className="
                                mt-3
                                text-5xl
                                font-semibold
                                tracking-tight
                            ">

                                {readiness.progression}%

                            </div>

                            <div className="
                                mt-3
                                text-sm
                                font-medium
                            ">

                                {

                                    readiness.readyForRuntime

                                        ? "Runtime Ready"

                                        : "Needs Stabilization"
                                }

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================================= */}
                {/* SCORES */}
                {/* ================================= */}

                <div className="
                    grid
                    grid-cols-3
                    gap-5
                ">

                    <ScoreCard

                        title="Structure"

                        value={
                            readiness.scores.structure
                        }
                    />

                    <ScoreCard

                        title="Flow"

                        value={
                            readiness.scores.flow
                        }
                    />

                    <ScoreCard

                        title="Block Quality"

                        value={
                            readiness.scores.blockQuality
                        }
                    />

                </div>

                {/* ================================= */}
                {/* MAIN */}
                {/* ================================= */}

                <div className="
                    grid
                    grid-cols-[1fr_320px]
                    gap-8
                    items-start
                ">

                    {/* ============================= */}
                    {/* BLOCKS */}
                    {/* ============================= */}

                    <div className="
                        space-y-5
                    ">

                        {

                            lesson.blocks.map(

                                (block, index) => (

                                    <button

                                        key={block.id}

                                        onClick={() => {

                                            const nextSession =

                                                enterLessonBlock({

                                                    session,

                                                    lesson,

                                                    blockIndex:
                                                        index
                                                });

                                            setSession(
                                                nextSession
                                            );
                                        }}

                                        className={`
                                            w-full
                                            text-left
                                            rounded-[28px]
                                            border
                                            bg-white
                                            p-7
                                            transition-all

                                            ${session.currentBlockIndex === index

                                                ? `
                                                    border-orange-400
                                                    bg-orange-50/40
                                                    shadow-[0_10px_40px_rgba(255,120,0,0.12)]
                                                `

                                                : `
                                                    border-black/5
                                                    hover:border-orange-200
                                                    hover:shadow-md
                                                `}
                                        `}
                                    >

                                        <div className="
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-3
                                        ">

                                            <FlowBadge
                                                label={block.type}
                                            />

                                            <FlowBadge
                                                label={block.lessonFlow}
                                            />

                                            <FlowBadge
                                                label={block.semanticSurface}
                                            />

                                        </div>

                                        <h2 className="
                                            mt-5
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                        ">

                                            {block.title}

                                        </h2>

                                        <p className="
                                            mt-4
                                            whitespace-pre-wrap
                                            leading-relaxed
                                            text-neutral-700
                                        ">

                                            {block.content}

                                        </p>

                                        <div className="
                                            mt-6
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <div className="
                                                text-xs
                                                uppercase
                                                tracking-[0.18em]
                                                text-neutral-400
                                            ">

                                                Runtime Progression

                                            </div>

                                            <div className="
                                                text-sm
                                                font-semibold
                                            ">

                                                {

                                                    Math.round(

                                                        (
                                                            (index + 1)
                                                            /
                                                            lesson.blocks.length
                                                        ) * 100
                                                    )
                                                }%

                                            </div>

                                        </div>

                                        <div className="
                                            mt-2
                                            h-2
                                            overflow-hidden
                                            rounded-full
                                            bg-neutral-100
                                        ">

                                            <div

                                                className={`
                                                    h-full
                                                    rounded-full
                                                    transition-all

                                                    ${session.currentBlockIndex >= index

                                                        ? `
                                                            bg-orange-500
                                                        `

                                                        : `
                                                            bg-neutral-200
                                                        `}
                                                `}

                                                style={{

                                                    width:

                                                        session.currentBlockIndex >= index

                                                            ? "100%"

                                                            : "0%"
                                                }}
                                            />

                                        </div>

                                    </button>
                                )
                            )
                        }

                    </div>

                    {/* ============================= */}
                    {/* HUD */}
                    {/* ============================= */}

                    <RuntimeSessionHud

                        sessionViewModel={
                            sessionViewModel
                        }
                    />

                </div>

                {/* ================================= */}
                {/* VALIDATION */}
                {/* ================================= */}

                {

                    readiness.validationErrors.length > 0 && (

                        <div className="
                            rounded-[28px]
                            border
                            border-red-200
                            bg-red-50
                            p-7
                        ">

                            <div className="
                                text-sm
                                font-semibold
                                text-red-600
                            ">

                                Runtime Validation Issues

                            </div>

                            <div className="
                                mt-4
                                space-y-3
                            ">

                                {

                                    readiness.validationErrors.map(

                                        (error) => (

                                            <div

                                                key={error}

                                                className="
                                                    rounded-2xl
                                                    bg-white/70
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    text-red-600
                                                "
                                            >

                                                {error}

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

// ============================================
// RENDER PAGE
// ============================================

export function renderRuntimeLessonTestPage() {

    const app =

        document.querySelector(
            "#app"
        );

    app.innerHTML = `

        <div
            id="runtime-lesson-root"
            class="min-h-screen"
        ></div>
    `;

    const root =

        ReactDOM.createRoot(

            document.querySelector(
                "#runtime-lesson-root"
            )
        );

    root.render(

        <RuntimeLessonTestPage />
    );
}