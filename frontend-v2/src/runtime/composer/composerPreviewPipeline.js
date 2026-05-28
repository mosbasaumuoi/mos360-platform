import {

    createVisualFlow

}

    from "../_future/composerLayoutRuntime";

export function createRuntimePreview({

    blocks = []

}) {

    return createVisualFlow(
        blocks
    );
}