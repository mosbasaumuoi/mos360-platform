import {

    buildContinuityRitual

}

from "../../runtime/continuityRitualEngine";

export default function ContinuityRitualCard() {

    const ritual =
        buildContinuityRitual();

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

                Continuity Rhythm

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-4
                space-y-2
            ">

                <div className="
                    text-sm
                    leading-relaxed
                ">

                    {
                        ritual
                            .ritualMessage
                    }

                </div>

                <div className="
                    text-xs
                    opacity-50
                ">

                    Rhythm stage:
                    {" "}
                    {
                        ritual
                            .ritualStage
                    }

                </div>

            </div>

        </div>
    );
}