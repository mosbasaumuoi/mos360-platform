import {

    TOOLBAR_BLOCKS,

    insertToolbarBlock

}

    from "../../runtime/composer/composerToolbarEngine";

export default function ComposerBlockToolbar({

    blocks = [],

    onBlocksChange

}) {

    return (

        <div className="
            flex
            flex-wrap
            items-center
            gap-3
        ">

            {TOOLBAR_BLOCKS.map(

                (block) => (

                    <button

                        key={block.type}

                        onClick={() => {

                            const updatedBlocks =

                                insertToolbarBlock({

                                    blocks,

                                    type:
                                        block.type
                                });

                            onBlocksChange(
                                updatedBlocks
                            );
                        }}

                        className="
                            group
                            relative

                            rounded-2xl
                            border
                            border-neutral-200

                            bg-white

                            px-5
                            py-2.5

                            text-sm
                            font-medium
                            text-neutral-700

                            shadow-sm

                            transition-all
                            duration-200

                            hover:-translate-y-[1px]
                            hover:border-orange-300
                            hover:bg-orange-50
                            hover:text-orange-700
                            hover:shadow-md
                        "
                    >

                        <span className="
                            relative
                            z-10
                        ">

                            {block.label}

                        </span>

                    </button>
                )
            )}

        </div>
    );
}