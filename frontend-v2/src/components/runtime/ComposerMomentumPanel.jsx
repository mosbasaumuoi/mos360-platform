import {

    calculateMomentumScore,

    getMomentumStatus,

    getMomentumMessage

}

from "../../runtime/composerMomentumEngine";

export default function ComposerMomentumPanel({

    blocks = []

}) {

    const score =
        calculateMomentumScore(
            blocks
        );

    const status =
        getMomentumStatus(
            score
        );

    const message =
        getMomentumMessage(
            status
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

                Momentum Analysis

            </div>

            <div className="
                flex
                items-center
                justify-between
            ">

                <div>

                    <div className="
                        text-3xl
                        font-bold
                    ">

                        {score}

                    </div>

                    <div className="
                        text-xs
                        opacity-50
                    ">

                        Momentum Score

                    </div>

                </div>

                <div className="
                    text-xs
                    uppercase
                    tracking-wide
                    opacity-60
                ">

                    {status}

                </div>

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-3
                text-sm
            ">

                {message}

            </div>

        </div>
    );
}