import {

    getLatestMilestone

}

from "../../runtime/progressionMemoryEngine";

export default function ProgressionMemoryCard() {

    const milestone =
        getLatestMilestone();

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

                Progression Memory

            </div>

            {!milestone && (

                <div className="
                    text-sm
                    opacity-50
                ">

                    Your learning journey is starting

                </div>
            )}

            {milestone && (

                <div className="
                    rounded-xl
                    bg-black/5
                    px-4
                    py-3
                    space-y-1
                ">

                    <div className="
                        text-sm
                        font-medium
                    ">

                        {milestone.title}

                    </div>

                    <div className="
                        text-xs
                        opacity-50
                    ">

                        Progress remembered

                    </div>

                </div>
            )}

        </div>
    );
}