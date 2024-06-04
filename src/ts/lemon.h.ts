import { blueberryInstance } from "./blueberry";
import { Pointer } from "./blueberry.mem";

export function lemon_init(heap: Pointer, size: number) {
    if (blueberryInstance === null)
        return;

    if (heap === null)
        return;

    if (size <= 0)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.lemon_init as Function)(heap, size);
}

export function lemon_malloc(size: number) : Pointer {
    if (blueberryInstance === null)
        return null;

    if (size <= 0)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.lemon_malloc as Function)(size);
}

export function lemon_free(block: Pointer) {
    if (blueberryInstance === null)
        return;

    if(block == null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.lemon_free as Function)(block);
}