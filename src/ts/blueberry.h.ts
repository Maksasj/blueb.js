import { blueberryInstance } from "./blueberry";
import { bluebMapModel } from "./blueberry.map";
import { BlueberryAllocationEnum, Pointer } from "./blueberry.mem";

export function internalBluebNewModel(arr: Pointer, length: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(arr === null)
        return null;

    if(length <= 0)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_new_model as Function)(arr, length);
}

export function internalBluebFreeModel(model: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_free_model as Function)(model);
}

export function internalBluebGetModelLayerCount(model: Pointer): number {
    if (blueberryInstance === null)
        return 0;

    if(model === null)
        return 0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_layer_count as Function)(model);
}

export function internalBluebGetModelNeuronLayer(model: Pointer, layer: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_neuron_layer as Function)(model, layer);
}

export function internalBluebGetModelWeightLayer(model: Pointer, layer: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_weight_layer as Function)(model, layer);
}

export function internalBluebGetModelBiasesLayer(model: Pointer, layer: number): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_get_model_biases_layer as Function)(model, layer);
}

export function internalBluebCopyModel(model: Pointer): Pointer {
    if (blueberryInstance === null)
        return null;

    if(model === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_copy_model as Function)(model);
}

export function internalBluebFillModel(model: Pointer, value: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_fill_model as Function)(model, value);
}

export function internalBluebRandModel(model: Pointer, min: number, max: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_rand_model as Function)(model, min, max);
}

export function internalBluebFeedValues(model: Pointer, array: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feed_values as Function)(model, array);
}

export function internalBluebFeed(model: Pointer, matrix: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feed as Function)(model, matrix);
}

export function internalBluebForward(model: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_forward as Function)(model);
}

export function internalBluebFeedForwardValues(model: Pointer, array: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feedforward_values as Function)(model, array);
}

export function internalBluebFeedForward(model: Pointer, matrix: Pointer) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_feedforward as Function)(model, matrix);
}

export function internalBluebMseCost(model: Pointer, inputs: Pointer, outputs: Pointer, count: number): number {
    if (blueberryInstance === null)
        return 0.0;

    if(model === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_mse_cost as Function)(model, inputs, outputs, count);
}

export function internalBluebMseCostArr(model: Pointer, inputs: Pointer, outputs: Pointer, count: number): number {
    if (blueberryInstance === null)
        return 0.0;

    if(model === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_mse_cost_arr as Function)(model, inputs, outputs, count);
}

export function internalBluebFiniteDifference(model: Pointer, gradient: Pointer, inputs: Pointer, outputs: Pointer, count: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_finite_difference as Function)(model, gradient, inputs, outputs, count);
}

export function internalBluebFiniteDifferenceArr(model: Pointer, gradient: Pointer, inputs: Pointer, outputs: Pointer, count: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_finite_difference_arr as Function)(model, gradient, inputs, outputs, count);
}

export function internalBluebLearnGradient(model: Pointer, gradient: Pointer, learningRate: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    return (ex.blueb_learn_gradient as Function)(model, gradient, learningRate);
}

export function internalBluebTrainGradientDescent(model: Pointer, inputs: Pointer, outputs: Pointer, sampleCount: number, epoch: number, learningRate: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_train_gradient_descent as Function)(model, inputs, outputs, sampleCount, epoch, learningRate);
}

export function internalBluebTrainGradientDescentArr(model: Pointer, inputs: Pointer, outputs: Pointer, sampleCount: number, epoch: number, learningRate: number) {
    if (blueberryInstance === null)
        return;

    if(model === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.blueb_train_gradient_descent_arr as Function)(model, inputs, outputs, sampleCount, epoch, learningRate);
}

export function internalBluebPrintModel(model: Pointer) {
    if (blueberryInstance === null)
        return;

    console.log(bluebMapModel(model));
}
