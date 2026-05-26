import { useState } from "react";

import {

    createInteractionState

}

    from "./composerInteractionRuntime";

import {

    createFocusState

}

    from "./composerFocusRuntime";

export function useComposerInteractionStore() {

    const [

        interactionState,
        setInteractionState

    ] = useState(
        createInteractionState()
    );

    const [

        focusState,
        setFocusState

    ] = useState(
        createFocusState()
    );

    return {

        interactionState,
        setInteractionState,

        focusState,
        setFocusState
    };
}