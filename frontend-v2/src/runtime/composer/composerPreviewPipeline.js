import {

    createVisualFlow

}

    from "./composerLayoutRuntime";

export function createRuntimePreview({

    blocks = []

}) {

    return createVisualFlow(
        blocks
    );
}