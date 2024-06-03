import { blueberryInstance } from "./blueberry";
import { BlueberryAllocationEnum, Pointer, bluebCreateInt32Array, bluebMapModel } from "./blueberry_memory";

// Todo since blueberry.h.ts is just WASM->ts bindings
// this function should not really accept array as input
// This function probably should accept just a pointer to an array
export function bluebNewModel(arr: number[]): Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    const arch = bluebCreateInt32Array(arr);
    let model = (ex.blueb_new_model as Function)(arch, arr.length);
    (ex.blueb_rand_model as Function)(model, -1.0, 1.0);
    // (ex.lemon_free as Function)(arch); // Todo fix this

    blueberryInstance.allocations.push({
        ptr: model,
        kind: BlueberryAllocationEnum.Model
    });

    return model;
}

export function bluebFreeModel(model: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_free_model as Function)(model);
}

export function bluebGetModelLayerCount(model: Pointer): number {
    if (blueberryInstance === null)
        return 0;

    if(model === null)
        return 0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_layer_count as Function)(model);
}

export function bluebGetModelNeuronLayer(model: Pointer, layer: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_neuron_layer as Function)(model, layer);
}

export function bluebGetModelWeightLayer(model: Pointer, layer: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_weight_layer as Function)(model, layer);
}

export function bluebGetModelBiasesLayer(model: Pointer, layer: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_biases_layer as Function)(model, layer);
}

export function bluebCopyModel(model: Pointer): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_copy_model as Function)(model);
}

export function bluebFillModel(model: Pointer, value: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_fill_model as Function)(model, value);
}

export function bluebRandModel(model: Pointer, min: number, max: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_rand_model as Function)(model, min, max);
}

export function bluebFeedValues(model: Pointer, array: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feed_values as Function)(model, array);
}

export function bluebFeed(model: Pointer, matrix: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feed as Function)(model, matrix);
}

export function bluebForward(model: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_forward as Function)(model);
}

export function bluebFeedForwardValues(model: Pointer, array: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feedforward_values as Function)(model, array);
}

export function bluebFeedForward(model: Pointer, matrix: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feedforward as Function)(model, matrix);
}

export function bluebMseCost(model: Pointer, inputs: Pointer, outputs: Pointer, count: number): number {
    if (blueberryInstance === null)
        return 0.0;

    if(model === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_mse_cost as Function)(model, inputs, outputs, count);
}

export function bluebMseCostArr(model: Pointer, inputs: Pointer, outputs: Pointer, count: number): number {
    if (blueberryInstance === null)
        return 0.0;

    if(model === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_mse_cost_arr as Function)(model, inputs, outputs, count);
}

export function bluebFiniteDifference(model: Pointer, gradient: Pointer, inputs: Pointer, outputs: Pointer, count: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_finite_difference as Function)(model, gradient, inputs, outputs, count);
}

export function bluebFiniteDifferenceArr(model: Pointer, gradient: Pointer, inputs: Pointer, outputs: Pointer, count: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_finite_difference_arr as Function)(model, gradient, inputs, outputs, count);
}

export function bluebLearnGradient(model: Pointer, gradient: Pointer, learningRate: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_learn_gradient as Function)(model, gradient, learningRate);
}

export function bluebTrainGradientDescent(model: Pointer, inputs: Pointer, outputs: Pointer, sampleCount: number, epoch: number, learningRate: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_train_gradient_descent as Function)(model, inputs, outputs, sampleCount, epoch, learningRate);
}

export function bluebTrainGradientDescentArr(model: Pointer, inputs: Pointer, outputs: Pointer, sampleCount: number, epoch: number, learningRate: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_train_gradient_descent_arr as Function)(model, inputs, outputs, sampleCount, epoch, learningRate);
}

export function bluebPrintModel(model: Pointer) {
    if (blueberryInstance === null)
        return;

    console.log(bluebMapModel(model));
}
