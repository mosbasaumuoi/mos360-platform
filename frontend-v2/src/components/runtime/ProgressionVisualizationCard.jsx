import {

    buildProgressionVisualization

}

from "../../runtime/progressionVisualizationEngine";

export default function ProgressionVisualizationCard() {

    const progression =
        buildProgressionVisualization();

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

                Learning Progression

            </div>

            <div className="
                flex
                items-end
                gap-3
            ">

                <div className="
                    text-5xl
                    font-bold
                    tracking-tight
                ">

                    {
                        progression
                            .streakDays
                    }

                </div>

                <div className="
                    text-sm
                    opacity-50
                    mb-1
                ">

                    continuity days

                </div>

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-3
                text-sm
            ">

                Stage:
                {" "}
                {
                    progression
                        .progressionStage
                }

            </div>

            <div className="
                text-xs
                opacity-50
            ">

                {
                    progression
                        .milestoneCount
                }
                {" "}
                progression memories preserved

            </div>

        </div>
    );
}