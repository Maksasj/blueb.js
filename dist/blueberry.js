"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bluebMseCost = exports.bluebTrainGradientDescent = exports.bluebCreateModel = exports.bluebCreateMatrix = exports.blueberryInstance = void 0;
const blueberry_heap_1 = require("./blueberry_heap");
const blueberry_memory_1 = require("./blueberry_memory");
const blueberry_utils_1 = require("./blueberry_utils");
exports.blueberryInstance = null;
function initBlueberry() {
    return __awaiter(this, void 0, void 0, function* () {
        const env = (0, blueberry_utils_1.make_environment)({
            "rand": blueberry_utils_1.rand,
            "powf": Math.pow,
            "assert": blueberry_utils_1.assert
        });
        WebAssembly.instantiateStreaming(fetch('./blueberry.wasm'), {
            env: env
        }).then((w) => {
            if (exports.blueberryInstance !== null)
                return;
            exports.blueberryInstance = {
                wasm: w.instance,
                allocations: []
            };
            (0, blueberry_heap_1.initializeHeap)(exports.blueberryInstance);
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
            let model = bluebCreateModel([2, 2, 1]);
            // Train network and print result
            for (let i = 0; i < 100; ++i) {
                bluebTrainGradientDescent(model, inputs, outputs, 4, 1, 0.05);
                const cost = bluebMseCost(model, inputs, outputs, 4);
                console.log(cost);
            }
            console.log((0, blueberry_memory_1.bluebMapModel)(model));
        });
    });
}
initBlueberry();
function bluebCreateMatrix(matrix) {
    if (exports.blueberryInstance === null)
        return null;
    let arr = [];
    for (var row of matrix)
        arr = arr.concat(row);
    const ex = exports.blueberryInstance.wasm.exports;
    const matrixPtr = ex.paech_new_matrix(matrix[0].length, matrix.length);
    exports.blueberryInstance.allocations.push({
        ptr: matrixPtr,
        kind: blueberry_memory_1.BlueberryAllocationEnum.Matrix
    });
    let mapped = (0, blueberry_memory_1.bluebMapMatrix)(matrixPtr);
    if (mapped == null)
        return null;
    mapped.value.set(arr);
    return matrixPtr;
}
exports.bluebCreateMatrix = bluebCreateMatrix;
function bluebCreateModel(arr) {
    if (exports.blueberryInstance === null)
        return null;
    const ex = exports.blueberryInstance.wasm.exports;
    const arch = (0, blueberry_memory_1.bluebCreateInt32Array)(arr);
    let model = ex.blueb_new_model(arch, arr.length);
    ex.blueb_rand_model(model, -1.0, 1.0);
    // (ex.lemon_free as Function)(arch); // Todo fix this
    exports.blueberryInstance.allocations.push({
        ptr: model,
        kind: blueberry_memory_1.BlueberryAllocationEnum.Model
    });
    return model;
}
exports.bluebCreateModel = bluebCreateModel;
function bluebTrainGradientDescent(model, inputs, outputs, sampleCount, epoch, learningRate) {
    if (exports.blueberryInstance === null)
        return;
    const ex = exports.blueberryInstance.wasm.exports;
    ex.blueb_train_gradient_descent(model, inputs, outputs, sampleCount, epoch, learningRate);
}
exports.bluebTrainGradientDescent = bluebTrainGradientDescent;
function bluebMseCost(model, inputs, outputs, sampleCount) {
    if (exports.blueberryInstance === null)
        return 0.0;
    const ex = exports.blueberryInstance.wasm.exports;
    return ex.blueb_mse_cost(model, inputs, outputs, sampleCount);
}
exports.bluebMseCost = bluebMseCost;
