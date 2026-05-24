export default function CinematicComposerShell({

    title = "Semantic Composer",

    subtitle =
        "Orchestrate learning momentum",

    children

}) {

    return (

        <div className="
            min-h-screen
            bg-[#f7f7f5]
        ">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div className="
                sticky
                top-0
                z-20
                border-b
                bg-white/80
                backdrop-blur-xl
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-5
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <div className="
                            text-xl
                            font-semibold
                            tracking-tight
                        ">

                            {title}

                        </div>

                        <div className="
                            text-sm
                            opacity-50
                            mt-1
                        ">

                            {subtitle}

                        </div>

                    </div>

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <button className="
                            rounded-xl
                            border
                            px-4
                            py-2
                            text-sm
                            hover:bg-black/5
                            transition-colors
                        ">

                            Preview

                        </button>

                        <button className="
                            rounded-xl
                            bg-black
                            text-white
                            px-4
                            py-2
                            text-sm
                            hover:opacity-90
                            transition-opacity
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
                px-6
                py-8
            ">

                {children}

            </div>

        </div>
    );
}