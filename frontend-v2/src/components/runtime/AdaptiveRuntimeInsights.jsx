import {

    buildAdaptiveRuntime

}

from "../../runtime/adaptiveRuntimeEngine";

export default function AdaptiveRuntimeInsights({

    lessonId,

    blocks = []

}) {

    const runtime =
        buildAdaptiveRuntime({

            lessonId,

            blocks
        });

    return (

        <div className="
            rounded-2xl
            border
            bg-white
            p-5
            space-y-4
        ">

            <div className="
                text-sm
                font-semibold
                opacity-70
            ">

                Adaptive Runtime

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-3
                text-sm
            ">

                Momentum:
                {" "}
                {
                    runtime.signals
                        .momentum
                        ?.status
                }

            </div>

            {runtime
              .continuityRecovery
              ?.shouldRecover && (

                <div className="
                    rounded-xl
                     bg-black/5
                     px-4
                      py-3
                     text-sm
                     ">

                  Continuity recovery activated

                </div>
                )}

            {runtime
                .reinforcementPlan
                .suggestedActions
                .map(

                    (action, index) => (

                        <div

                            key={index}

                            className="
                                rounded-xl
                                bg-black/5
                                px-4
                                py-3
                                text-sm
                            "
                        >

                            {action.message}

                        </div>
                    )
                )}
        </div>
    );
}