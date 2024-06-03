import { initializeHeap } from './blueberry_heap';

import { BlueberryAllocation, BlueberryAllocationEnum, Matrix, Pointer, bluebCreateInt32Array, bluebMapMatrix, bluebMapModel } from './blueberry_memory';
import { make_environment, rand, assert, } from './blueberry_utils'

import wasmUrl from './blueberry.wasm?url';
import { bluebMseCost, bluebNewModel, bluebTrainGradientDescent } from './blueberry.h';

export type BlueberryInstance = {
    wasm: WebAssembly.Instance;

    // Lets track all allocations, if we ever need to clear
    allocations: BlueberryAllocation[];
};

export let blueberryInstance: BlueberryInstance | null = null;

async function initBlueberry() {
    const env = make_environment({
        "rand": rand,
        "powf": Math.pow,
        "assert": assert
    }) as any;

    WebAssembly.instantiateStreaming(fetch(wasmUrl), {
        env: env
    }).then((w) => {
        if (blueberryInstance !== null)
            return;

        blueberryInstance = {
            wasm: w.instance,
            allocations: []
        };

        initializeHeap(blueberryInstance);

        const inputs = bluebCreateMatrix([
            [0.0, 0.0],
            [0.0, 1.0],
            [1.0, 0.0],
            [1.0, 1.0]
        ]);

        const outputs = bluebCreateMatrix([
            [0.0],
            [0.0],
            [0.0],
            [1.0]
        ]);

        // Create model
        let model = bluebNewModel([2, 2, 1]);

        // Train network and print result
        for (let i = 0; i < 100; ++i) {
            bluebTrainGradientDescent(model, inputs, outputs, 4, 1, 0.05);

            const cost = bluebMseCost(model, inputs, outputs, 4);
            console.log(cost);
        }

        console.log(bluebMapModel(model));
    })
}

initBlueberry();

export function bluebCreateMatrix(matrix: Matrix): Pointer {
    if (blueberryInstance === null)
        return null;

    let arr: number[] = [];
    for (var row of matrix)
        arr = arr.concat(row);

    const ex = blueberryInstance.wasm.exports;

    const matrixPtr = (ex.paech_new_matrix as Function)(matrix[0].length, matrix.length);
    blueberryInstance.allocations.push({
        ptr: matrixPtr,
        kind: BlueberryAllocationEnum.Matrix
    });

    let mapped = bluebMapMatrix(matrixPtr);

    if(mapped == null)
        return null;

    mapped.value.set(arr);

    return matrixPtr;
}
