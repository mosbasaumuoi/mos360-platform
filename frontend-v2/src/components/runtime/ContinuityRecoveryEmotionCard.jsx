import {

    buildRecoveryEmotion

}

from "../../runtime/continuityRecoveryEmotionEngine";

export default function ContinuityRecoveryEmotionCard() {

    const recovery =
        buildRecoveryEmotion();

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

                Continuity Recovery

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
                        recovery
                            .emotionalMessage
                    }

                </div>

                <div className="
                    text-xs
                    opacity-50
                ">

                    Recovery stage:
                    {" "}
                    {
                        recovery
                            .recoveryStage
                    }

                </div>

            </div>

            <div className="
                text-xs
                opacity-50
            ">

                {
                    recovery
                        .inactiveDays
                }
                {" "}
                inactive days detected

            </div>

        </div>
    );
}