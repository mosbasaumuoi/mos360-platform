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
            space-y-5
        ">

            {/* ==================================
                HEADER
            ================================== */}

            <div className="
                flex
                items-center
                justify-between
            ">

                <div>

                    <div className="
                        text-sm
                        font-semibold
                        opacity-70
                    ">

                        Reinforcement Runtime

                    </div>

                    <div className="
                        text-xs
                        opacity-50
                        mt-1
                    ">

                        Adaptive semantic reinforcement layer

                    </div>

                </div>

                <div className="
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    bg-black/5
                ">

                    {plan.reinforcementState}

                </div>

            </div>

            {/* ==================================
                RUNTIME METRICS
            ================================== */}

            <div className="
                grid
                grid-cols-2
                gap-3
            ">

                <MetricCard
                    label="Density"
                    value={`${ plan.reinforcementDensity }% `}
                />

                <MetricCard
                    label="Continuity Risk"
                    value={plan.continuityRisk}
                />

                <MetricCard
                    label="Recovery Priority"
                    value={plan.recoveryPriority}
                />

                <MetricCard
                    label="Actions"
                    value={
                        plan.suggestedActions.length
                    }
                />

            </div>

            {/* ==================================
                HEALTHY STATE
            ================================== */}

            {plan.suggestedActions
                .length === 0 && (

                <div className="
                    rounded-xl
                    bg-black/5
                    px-4
                    py-4
                    text-sm
                    opacity-70
                ">

                    Reinforcement flow looks healthy

                </div>
            )}

            {/* ==================================
                ACTIONS
            ================================== */}

            {plan.suggestedActions.map(

                (action, index) => (

                    <div

                        key={index}

                        className="
                            rounded-xl
                            border
                            px-4
                            py-4
                            space-y-2
                        "
                    >

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div className="
                                text-sm
                                font-medium
                            ">

                                {action.type}

                            </div>

                            <div className="
                                text-xs
                                opacity-50
                            ">

                                {action.priority}

                            </div>

                        </div>

                        <div className="
                            text-sm
                            opacity-70
                        ">

                            {action.message}

                        </div>

                    </div>
                )
            )}

        </div>
    );
}

// ============================================
// METRIC CARD
// ============================================

function MetricCard({

    label,

    value

}) {

    return (

        <div className="
            rounded-xl
            bg-black/5
            px-4
            py-3
        ">

            <div className="
                text-xs
                opacity-50
            ">

                {label}

            </div>

            <div className="
                text-sm
                font-semibold
                mt-1
            ">

                {value}

            </div>

        </div>
    );
}
