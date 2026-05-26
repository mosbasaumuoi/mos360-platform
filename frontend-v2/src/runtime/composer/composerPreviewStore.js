import { useState } from "react";

export function useComposerPreviewStore() {

    const [

        previewEnabled,
        setPreviewEnabled

    ] = useState(false);

    function togglePreview() {

        setPreviewEnabled(

            previous => !previous
        );
    }

    return {

        previewEnabled,

        togglePreview
    };
}