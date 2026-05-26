import {

    updateBlockField

}

from "../../runtime/composer/blockEditingEngine";

export default function SemanticBlockEditor({

    blocks = [],

    selectedBlockIndex,

    onBlocksChange

}) {

    const selectedBlock =
        blocks[selectedBlockIndex];

    // ========================================
    // NO BLOCK SELECTED
    // ========================================

    if (!selectedBlock) {

        return (

            <div className="
                rounded-2xl
                border
                p-5
                bg-white
                text-sm
                opacity-50
            ">

                Select a block to edit

            </div>
        );
    }

    return (

        <div className="
            rounded-2xl
            border
            p-5
            bg-white
            space-y-4
        ">

            <div>

                <div className="
                    text-xs
                    opacity-50
                    mb-1
                ">

                    Block Type

                </div>

                <div className="
                    font-semibold
                ">

                    {selectedBlock.type}

                </div>

            </div>

            <div>

                <div className="
                    text-xs
                    opacity-50
                    mb-1
                ">

                    Priority

                </div>

                <select

                    value={
                        selectedBlock.priority ||
                        "normal"
                    }

                    onChange={(event) => {

                        onBlocksChange(

                            updateBlockField({

                                blocks,

                                index:
                                    selectedBlockIndex,

                                field:
                                    "priority",

                                value:
                                    event.target.value
                            })
                        );
                    }}

                    className="
                        w-full
                        rounded-xl
                        border
                        px-3
                        py-2
                    "
                >

                    <option value="primary">
                        Primary
                    </option>

                    <option value="normal">
                        Normal
                    </option>

                    <option value="support">
                        Support
                    </option>

                </select>

            </div>

        </div>
    );
}