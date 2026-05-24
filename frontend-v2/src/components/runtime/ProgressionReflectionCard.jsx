import {

    buildProgressionReflection

}

from "../../runtime/progressionReflectionEngine";

export default function ProgressionReflectionCard() {

    const reflection =
        buildProgressionReflection();

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

                Progression Reflection

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
                        reflection
                            .reflectionMessage
                    }

                </div>

                <div className="
                    text-xs
                    opacity-50
                ">

                    Reflection stage:
                    {" "}
                    {
                        reflection
                            .reflectionStage
                    }

                </div>

            </div>

            <div className="
                text-xs
                opacity-50
            ">

                {
                    reflection
                        .memoryCount
                }
                {" "}
                progression memories reflected

            </div>

        </div>
    );
}