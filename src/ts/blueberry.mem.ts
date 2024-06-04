import { blueberryInstance } from "./blueberry";

const u32size: number = 4;
const floatSize: number = 4;

export type Pointer = number | null;

export enum BlueberryAllocationEnum {
    Matrix,
    Model,
    Array,
    Default
};

export type BlueberryAllocation = {
    pointer: Pointer;
    kind: BlueberryAllocationEnum;
};

export function bluebNewInt32Array(size: number): Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    const ptr = (ex.lemon_malloc_i32 as Function)(u32size * size);

    /* Todo
    blueberryInstance.allocations.push({
        ptr: ptr,
        kind: BlueberryAllocationEnum.Array
    });
    */

    return ptr;
}

export function bluebNewFloat32Array(size: number): Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    const ptr = (ex.lemon_malloc_i32 as Function)(floatSize * size);

    /* Todo
    blueberryInstance.allocations.push({
        ptr: ptr,
        kind: BlueberryAllocationEnum.Array
    });
    */

    return ptr;
}

export function bluebMapFloat32Array(pointer: Pointer, size: number) : Float32Array | null {
    if(blueberryInstance === null)
        return null;

    if(pointer === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    const memory = ex.memory as any;

    return new Float32Array(memory.buffer as any, pointer, size);
}

export function bluebMapInt32Array(pointer: Pointer, size: number) : Int32Array | null {
    if(blueberryInstance === null)
        return null;

    if(pointer === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    const memory = ex.memory as any;

    return new Int32Array(memory.buffer as any, pointer, size);
}
