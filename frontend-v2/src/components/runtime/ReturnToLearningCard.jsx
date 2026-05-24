import {

    buildReturnState

}

from "../../runtime/returnToLearningEngine";

export default function ReturnToLearningCard() {

    const state =
        buildReturnState();

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

                Return To Learning

            </div>

            <div className="
                rounded-xl
                bg-black/5
                px-4
                py-3
                text-sm
            ">

                {state.returnMessage}

            </div>

            {state.shouldRecover && (

                <div className="
                    text-xs
                    opacity-50
                ">

                    Recovery mode active

                </div>
            )}

        </div>
    );
}