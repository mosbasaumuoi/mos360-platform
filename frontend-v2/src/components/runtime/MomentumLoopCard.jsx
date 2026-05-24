import {

    buildMomentumLoop

}

from "../../runtime/momentumPreservationEngine";

export default function MomentumLoopCard() {

    const momentum =
        buildMomentumLoop();

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

                Momentum Loop

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-4
                text-sm
                leading-relaxed
            ">

                {
                    momentum
                        .nextMomentumAction
                }

            </div>

            <div className="
                text-xs
                opacity-50
            ">

                {
                    momentum
                        .streakDays
                }
                {" "}
                continuity days preserved

            </div>

        </div>
    );
}