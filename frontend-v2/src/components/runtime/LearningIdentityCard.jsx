import {

    buildLearningIdentity

}

from "../../runtime/learningIdentityEngine";

export default function LearningIdentityCard() {

    const identity =
        buildLearningIdentity();

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

                Learning Identity

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
                        identity
                            .identityMessage
                    }

                </div>

                <div className="
                    text-xs
                    opacity-50
                ">

                    Identity stage:
                    {" "}
                    {
                        identity
                            .identityStage
                    }

                </div>

            </div>

        </div>
    );
}