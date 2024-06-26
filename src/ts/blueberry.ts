import { initializeHeap } from './blueberry.heap';

import { BlueberryAllocation } from './blueberry.mem';
import { make_environment, rand, assert } from './blueberry.utils'

import wasmUrl from './blueberry.wasm?url';

export * from './blueberry.h'
export * from './blueberry.heap'
export * from './blueberry.map'
export * from './blueberry.mem'
export * from './blueberry.utils'

export * from './lemon.h'

export * from './peach.h'
export * from './peach.map'

export type BlueberryInstance = {
    wasm: WebAssembly.Instance;

    // Lets track all allocations, if we ever need to clear
    allocations: BlueberryAllocation[];
};

export let blueberryInstance: BlueberryInstance | null = null;

export async function bluebInit() : Promise<BlueberryInstance | null> {
    const env = make_environment({
        "rand": rand,
        "powf": Math.pow,
        "assert": assert
    }) as any;

    const w = await WebAssembly.instantiateStreaming(fetch(wasmUrl), {
        env: env
    });

    blueberryInstance = {
        wasm: w.instance,
        allocations: []
    };

    initializeHeap(blueberryInstance);
    console.log("Initialized blueberry instance");

    return blueberryInstance;
}
