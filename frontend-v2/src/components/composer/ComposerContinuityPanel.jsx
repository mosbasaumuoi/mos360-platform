import {

    analyzeContinuity

}

from "../../runtime/composerContinuityEngine";

export default function ComposerContinuityPanel({

    blocks = []

}) {

    const analysis =
        analyzeContinuity(
            blocks
        );

    return (

        <div className="
            rounded-2xl
            border
            bg-white
            p-5
            space-y-5
        ">

            <div className="
                text-sm
                font-semibold
                opacity-70
            ">

                Runtime Continuity

            </div>

            {/* ===================== */}
            {/* PACING WARNINGS */}
            {/* ===================== */}

            {analysis.pacingWarnings
                .length > 0 && (

                <div>

                    <div className="
                        text-xs
                        opacity-50
                        mb-2
                    ">

                        Pacing

                    </div>

                    <div className="
                        space-y-2
                    ">

                        {analysis
                            .pacingWarnings
                            .map(

                                (warning, index) => (

                                    <div

                                        key={index}

                                        className="
                                            rounded-xl
                                            bg-black/5
                                            px-3
                                            py-2
                                            text-sm
                                        "
                                    >

                                        {warning}

                                    </div>
                                )
                            )}
                    </div>

                </div>
            )}

            {/* ===================== */}
            {/* FATIGUE WARNINGS */}
            {/* ===================== */}

            {analysis.fatigueWarnings
                .length > 0 && (

                <div>

                    <div className="
                        text-xs
                        opacity-50
                        mb-2
                    ">

                        Fatigue

                    </div>

                    <div className="
                        space-y-2
                    ">

                        {analysis
                            .fatigueWarnings
                            .map(

                                (warning, index) => (

                                    <div

                                        key={index}

                                        className="
                                            rounded-xl
                                            bg-black/5
                                            px-3
                                            py-2
                                            text-sm
                                        "
                                    >

                                        {warning}

                                    </div>
                                )
                            )}
                    </div>

                </div>
            )}

            {/* ===================== */}
            {/* REINFORCEMENT */}
            {/* ===================== */}

            {analysis
                .reinforcementSuggestions
                .length > 0 && (

                <div>

                    <div className="
                        text-xs
                        opacity-50
                        mb-2
                    ">

                        Reinforcement

                    </div>

                    <div className="
                        space-y-2
                    ">

                        {analysis
                            .reinforcementSuggestions
                            .map(

                                (
                                    suggestion,
                                    index
                                ) => (

                                    <div

                                        key={index}

                                        className="
                                            rounded-xl
                                            bg-black/5
                                            px-3
                                            py-2
                                            text-sm
                                        "
                                    >

                                        {suggestion}

                                    </div>
                                )
                            )}
                    </div>

                </div>
            )}

        </div>
    );
}