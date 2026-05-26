import {

    useComposerPreviewStore

}

    from "../../runtime/composer/composerPreviewStore";

export default function CinematicComposerShell({

    title = "Semantic Composer",

    subtitle =
    "Orchestrate learning momentum",

    children

}) {

    const {

        previewEnabled,

        togglePreview

    } = useComposerPreviewStore();

    return (

        <div className="
            runtime-composer
            min-h-screen
            bg-neutral-100
            text-neutral-900
        ">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div className="
                sticky
                top-0
                z-20
                border-b
                border-neutral-200
                bg-white/80
                backdrop-blur-xl
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-8
                    py-6
                    flex
                    items-center
                    justify-between
                ">

                    {/* ===================== */}
                    {/* TITLE */}
                    {/* ===================== */}

                    <div className="
                        space-y-1
                    ">

                        <div className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-neutral-900
                        ">

                            {title}

                        </div>

                        <div className="
                            text-sm
                            text-neutral-500
                        ">

                            {subtitle}

                        </div>

                    </div>

                    {/* ===================== */}
                    {/* ACTIONS */}
                    {/* ===================== */}

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <button

                            onClick={
                                togglePreview
                            }

                            className={`
                                rounded-2xl
                                border
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                                ${previewEnabled

                                    ? `
                                        border-orange-500
                                        bg-orange-500
                                        text-white
                                        shadow-md
                                      `

                                    : `
                                        border-neutral-200
                                        bg-white
                                        text-neutral-700
                                        hover:border-orange-300
                                        hover:bg-orange-50
                                      `
                                }
                            `}
                        >

                            {previewEnabled

                                ? "Previewing"

                                : "Preview"
                            }

                        </button>

                        <button className="
                            rounded-2xl
                            bg-black
                            text-white
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            shadow-sm
                            hover:opacity-90
                            transition-all
                            duration-200
                        ">

                            Publish

                        </button>

                    </div>

                </div>

            </div>

            {/* ========================= */}
            {/* MAIN WORKSPACE */}
            {/* ========================= */}

            <div className="
                max-w-7xl
                mx-auto
                px-8
                py-10
            ">

                {children}

            </div>

        </div>
    );
}