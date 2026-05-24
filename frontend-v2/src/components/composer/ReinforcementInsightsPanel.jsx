import {

    buildLearningSignals

}

from "../../runtime/adaptiveSignalEngine";

import {

    buildReinforcementPlan

}

from "../../runtime/reinforcementTimingEngine";

export default function ReinforcementInsightsPanel({

    lessonId

}) {

    const signals =
        buildLearningSignals(
            lessonId
        );

    const plan =
        buildReinforcementPlan(
            signals
        );

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

                Reinforcement Timing

            </div>

            {plan.suggestedActions
                .length === 0 && (

                <div className="
                    text-sm
                    opacity-50
                ">

                    Learning flow looks healthy

                </div>
            )}

            {plan.suggestedActions.map(

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