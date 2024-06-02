"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluebMapModel = exports.bluebMapMatrix = exports.bluebCreateFloatArray = exports.bluebCreateInt32Array = exports.BlueberryAllocationEnum = void 0;
const blueberry_1 = require("./blueberry");
const u32size = 4;
const floatSize = 4;
var BlueberryAllocationEnum;
(function (BlueberryAllocationEnum) {
    BlueberryAllocationEnum[BlueberryAllocationEnum["Matrix"] = 0] = "Matrix";
    BlueberryAllocationEnum[BlueberryAllocationEnum["Model"] = 1] = "Model";
    BlueberryAllocationEnum[BlueberryAllocationEnum["Array"] = 2] = "Array";
})(BlueberryAllocationEnum || (exports.BlueberryAllocationEnum = BlueberryAllocationEnum = {}));
;
function bluebCreateInt32Array(list) {
    if (blueberry_1.blueberryInstance === null)
        return null;
    const ex = blueberry_1.blueberryInstance.wasm.exports;
    const memory = ex.memory;
    const ptr = ex.lemon_malloc_i32(u32size * list.length);
    const array = new Int32Array(memory.buffer, ptr, list.length);
    array.set(list);
    blueberry_1.blueberryInstance.allocations.push({
        ptr: ptr,
        kind: BlueberryAllocationEnum.Array
    });
    return ptr;
}
exports.bluebCreateInt32Array = bluebCreateInt32Array;
function bluebCreateFloatArray(list) {
    if (blueberry_1.blueberryInstance === null)
        return null;
    const ex = blueberry_1.blueberryInstance.wasm.exports;
    const memory = ex.memory;
    const ptr = ex.lemon_malloc_i32(floatSize * list.length);
    const array = new Float32Array(memory.buffer, ptr, list.length);
    array.set(list);
    blueberry_1.blueberryInstance.allocations.push({
        ptr: ptr,
        kind: BlueberryAllocationEnum.Array
    });
    return ptr;
}
exports.bluebCreateFloatArray = bluebCreateFloatArray;
function bluebMapMatrix(matrixPtr) {
    if (blueberry_1.blueberryInstance == null)
        return null;
    if (matrixPtr == null)
        return null;
    const ex = blueberry_1.blueberryInstance.wasm.exports;
    const memory = ex.memory;
    const rows = ex.peach_get_matrix_rows(matrixPtr);
    const cols = ex.peach_get_matrix_cols(matrixPtr);
    const valuePtr = ex.peach_get_matrix_values(matrixPtr);
    const value = new Float32Array(memory.buffer, valuePtr, rows * cols);
    let matrix = {
        rows: rows,
        cols: cols,
        value: value
    };
    return matrix;
}
exports.bluebMapMatrix = bluebMapMatrix;
function bluebMapModel(modelPtr) {
    if (blueberry_1.blueberryInstance == null)
        return null;
    if (modelPtr == null)
        return null;
    const ex = blueberry_1.blueberryInstance.wasm.exports;
    let model = {
        weights: [],
        biases: [],
        neurons: [],
        count: ex.blueb_get_model_layer_count(modelPtr)
    };
    if (model.count <= 0)
        return null;
    for (let i = 0; i < model.count; ++i) {
        if (i > 0) {
            let weights = bluebMapMatrix(ex.blueb_get_model_weight_layer(modelPtr, i - 1));
            if (weights != null)
                model.weights.push(weights);
            let biases = bluebMapMatrix(ex.blueb_get_model_biases_layer(modelPtr, i - 1));
            if (biases != null)
                model.biases.push(biases);
        }
        let neurons = bluebMapMatrix(ex.blueb_get_model_neuron_layer(modelPtr, i));
        if (neurons != null)
            model.neurons.push(neurons);
    }
    return model;
}
exports.bluebMapModel = bluebMapModel;
