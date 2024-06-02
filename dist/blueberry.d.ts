import { BlueberryAllocation, Matrix, Pointer } from './blueberry_memory';
export type BlueberryInstance = {
    wasm: WebAssembly.Instance;
    allocations: BlueberryAllocation[];
};
export declare let blueberryInstance: BlueberryInstance | null;
export declare function bluebCreateMatrix(matrix: Matrix): Pointer;
export declare function bluebCreateModel(arr: number[]): Pointer;
export declare function bluebTrainGradientDescent(model: Pointer, inputs: Pointer, outputs: Pointer, sampleCount: number, epoch: number, learningRate: number): void;
export declare function bluebMseCost(model: Pointer, inputs: Pointer, outputs: Pointer, sampleCount: number): number;
