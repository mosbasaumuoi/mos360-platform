export default function ComposerRuntimeRail({

    blocks = [],

    interactionState

}) {

    const selectedBlock =

        blocks[
        interactionState
            ?.selectedBlockIndex || 0
        ];

    return (

        <div className="
            space-y-5
        ">

            {/* ====================== */}
            {/* PROGRESSION */}
            {/* ====================== */}

            <RuntimeRailCard

                label="Progression"

                value={
                    selectedBlock
                        ?.progressionSupport
                }
            />

            {/* ====================== */}
            {/* MASTERY */}
            {/* ====================== */}

            <RuntimeRailCard

                label="Mastery"

                value={
                    selectedBlock
                        ?.masterySupport
                }
            />

            {/* ====================== */}
            {/* SEMANTIC */}
            {/* ====================== */}

            <RuntimeRailCard

                label="Semantic"

                value={
                    selectedBlock
                        ?.semanticSupport
                }
            />

        </div>
    );
}

/* ======================================== */
/* CARD */
/* ======================================== */

function RuntimeRailCard({

    label,

    value

}) {

    if (!value) {

        return null;
    }

    return (

        <div className="
            rounded-2xl
            border
            border-black/[0.05]
            bg-white/70
            backdrop-blur-sm
            px-5
            py-4
        ">

            <div className="
                text-[11px]
                uppercase
                tracking-[0.2em]
                opacity-30
                mb-2
            ">

                {label}

            </div>

            <div className="
                text-sm
                leading-relaxed
                opacity-60
            ">

                {value}

            </div>

        </div>
    );
}