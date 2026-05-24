import {

    buildSustainableProgression

}

from "../../runtime/sustainableProgressionEngine";

export default function SustainableProgressionCard() {

    const sustainability =
        buildSustainableProgression();

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

                Sustainable Progression

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
                        sustainability
                            .sustainabilityMessage
                    }

                </div>

                <div className="
                    text-xs
                    opacity-50
                ">

                    Sustainability stage:
                    {" "}
                    {
                        sustainability
                            .sustainabilityStage
                    }

                </div>

            </div>

            <div className="
                text-xs
                opacity-50
            ">

                Progression health:
                {" "}
                {
                    sustainability
                        .progressionHealth
                }
                /100

            </div>

        </div>
    );
}