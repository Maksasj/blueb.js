export type Pointer = number | null;
export type Matrix = number[][];
export declare enum BlueberryAllocationEnum {
    Matrix = 0,
    Model = 1,
    Array = 2
}
export type BlueberryAllocation = {
    ptr: Pointer;
    kind: BlueberryAllocationEnum;
};
export type PeachMatrixMapped = {
    rows: number;
    cols: number;
    value: Float32Array;
};
export type BlueberryModelMapped = {
    weights: PeachMatrixMapped[];
    biases: PeachMatrixMapped[];
    neurons: PeachMatrixMapped[];
    count: number;
};
export declare function bluebCreateInt32Array(list: number[]): Pointer;
export declare function bluebCreateFloatArray(list: number[]): Pointer;
export declare function bluebMapMatrix(matrixPtr: Pointer): PeachMatrixMapped | null;
export declare function bluebMapModel(modelPtr: Pointer): BlueberryModelMapped | null;
