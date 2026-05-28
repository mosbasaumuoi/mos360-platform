export default function RuntimeSessionHud({

    sessionViewModel

}) {

    if (!sessionViewModel) {

        return null;
    }

    return (

        <div className="
            sticky
            top-6
            rounded-3xl
            border
            bg-white/95
            backdrop-blur
            p-6
            shadow-sm
            space-y-5
        ">

            {/* ===================== */}
            {/* HEADER */}
            {/* ===================== */}

            <div>

                <div className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-orange-500
                ">

                    Runtime Session

                </div>

                <h2 className="
                    mt-2
                    text-2xl
                    font-semibold
                ">

                    {sessionViewModel.lessonTitle}

                </h2>

            </div>

            <div className="
                flex
                items-center
                justify-between
            ">

                <div className="
                    text-sm
                    text-neutral-500
                ">

                    Session Status

                </div>

                <div className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                ${sessionViewModel.status === "active"

                                ? `
                    bg-green-100
                    text-green-700
                `

                                : `
                    bg-neutral-100
                    text-neutral-600
                `}
     `}>

                    {sessionViewModel.status}

                </div>

            </div>
            
            {/* ===================== */}
            {/* PROGRESSION */}
            {/* ===================== */}

            <div className="
                space-y-2
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    text-sm
                ">

                    <span>

                        Progression

                    </span>

                    <span className="
                        font-semibold
                    ">

                        {sessionViewModel.progression}%

                    </span>

                </div>

                <div className="
                    h-3
                    overflow-hidden
                    rounded-full
                    bg-neutral-200
                ">

                    <div

                        className="
                            h-full
                            rounded-full
                            bg-orange-500
                            transition-all
                        "

                        style={{

                            width:

                                `${sessionViewModel.progression}%`
                        }}
                    />

                </div>

            </div>

            {/* ===================== */}
            {/* MOMENTUM */}
            {/* ===================== */}

            <div className="
                rounded-2xl
                bg-neutral-50
                p-4
                space-y-2
            ">

                <div className="
                    text-sm
                    text-neutral-500
                ">

                    Momentum State

                </div>

                <div className="
                    text-lg
                    font-semibold
                ">

                    {
                        sessionViewModel
                            .momentum
                            .momentumState
                    }

                </div>

            </div>

            {/* ===================== */}
            {/* ENGAGEMENT */}
            {/* ===================== */}

            <div className="
                rounded-2xl
                bg-neutral-50
                p-4
                space-y-2
            ">

                <div className="
                    text-sm
                    text-neutral-500
                ">

                    Engagement

                </div>

                <div className="
                    text-lg
                    font-semibold
                ">

                    {
                        sessionViewModel
                            .engagement
                            .engagementLevel
                    }

                </div>

            </div>

        </div>
    );
}