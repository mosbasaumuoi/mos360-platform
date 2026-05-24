import {

    TOOLBAR_BLOCKS,

    insertToolbarBlock

}

from "../../runtime/composerToolbarEngine";

export default function ComposerBlockToolbar({

    blocks = [],

    onBlocksChange

}) {

    return (

        <div className="
            rounded-2xl
            border
            bg-white
            p-4
            flex
            flex-wrap
            gap-3
        ">

            {TOOLBAR_BLOCKS.map(

                block => (

                    <button

                        key={block.type}

                        onClick={() => {

                            onBlocksChange(

                                insertToolbarBlock({

                                    blocks,

                                    type:
                                        block.type
                                })
                            );
                        }}

                        className="
                            rounded-xl
                            border
                            px-4
                            py-2
                            text-sm
                            transition-all
                            hover:bg-black/5
                        "
                    >

                        {block.label}

                    </button>
                )
            )}

        </div>
    );
}