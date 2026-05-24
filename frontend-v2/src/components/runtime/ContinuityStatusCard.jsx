import {

    getContinuityState

}

from "../../runtime/learningContinuityEngine";

export default function ContinuityStatusCard() {

    const continuity =
        getContinuityState();

    return (

        <div className="
            rounded-2xl
            border
            bg-white
            p-5
            space-y-3
        ">

            <div className="
                text-sm
                font-semibold
                opacity-70
            ">

                Learning Continuity

            </div>

            <div className="
                flex
                items-end
                gap-2
            ">

                <div className="
                    text-4xl
                    font-bold
                ">

                    {
                        continuity
                            .streakDays
                    }

                </div>

                <div className="
                    text-sm
                    opacity-50
                    mb-1
                ">

                    day streak

                </div>

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-3
                text-sm
            ">

                Continuity:
                {" "}
                {
                    continuity
                        .continuityStatus
                }

            </div>

        </div>
    );
}