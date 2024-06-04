import { blueberryInstance } from "./blueberry";
import { bluebGetModelBiasesLayer, bluebGetModelLayerCount, bluebGetModelNeuronLayer, bluebGetModelWeightLayer, bluebNewModel } from "./blueberry.h";
import { Pointer, bluebMapFloat32Array, bluebMapInt32Array, bluebNewInt32Array } from "./blueberry.mem";
import { paechNewMatrix, peachGetMatrixCols, peachGetMatrixRows, peachGetMatrixValues } from "./peach.h";
import { concatenateArrays } from "./blueberry.utils";

// Mapping for peach C matrix
export type PeachMatrix = {
    rows: number;
    cols: number;

    value: Float32Array;

    // Pointer to original C structure
    pointer: Pointer;
}

// Mapping for blueberry C model
export type BlueberryModel = {
    weights: PeachMatrix[];
    biases: PeachMatrix[];
    neurons: PeachMatrix[];

    count: number;
    
    // Pointer to original C structure
    pointer: Pointer
};

export function peachMapMatrix(matrixPtr: Pointer) : PeachMatrix | null {
    if(blueberryInstance === null)
        return null;

    if(matrixPtr === null)
        return null;

    const rows = peachGetMatrixRows(matrixPtr);
    const cols = peachGetMatrixCols(matrixPtr);
    const valuePtr = peachGetMatrixValues(matrixPtr);

    if(valuePtr === null)
        return null;

    const value = bluebMapFloat32Array(valuePtr, rows * cols);

    if(value === null)
        return null;

    return {
        rows: rows, 
        cols: cols, 
        value: value,
        pointer: matrixPtr
    };
}

export function bluebMapModel(modelPtr: Pointer) : BlueberryModel | null {
    if(modelPtr === null)
        return null;

    const count = bluebGetModelLayerCount(modelPtr); 
    let weights: PeachMatrix[] = [];
    let biases: PeachMatrix[] = [];
    let neurons: PeachMatrix[] = [];
    
    if(count <= 0)
        return null;

    for(let i = 0; i < count; ++i) {
        let neuron = peachMapMatrix(bluebGetModelNeuronLayer(modelPtr, i));
        if(neuron != null)
            neurons.push(neuron);

        if(i <= 0)
            continue;

        let weight = peachMapMatrix(bluebGetModelWeightLayer(modelPtr, i - 1));
        if(weight != null)
            weights.push(weight);
        
        let biase = peachMapMatrix(bluebGetModelBiasesLayer(modelPtr, i - 1));
        if(biase != null)
            biases.push(biase);
    }

    return {
        weights: [],
        biases: [],
        neurons: [],
        count: count,

        pointer: modelPtr
    };
}

export function bluebCreateModel(arr: number[]): BlueberryModel | null {
    const archPtr = bluebNewInt32Array(arr.length);
    if(archPtr === null)
        return null;
    
    const archMap = bluebMapInt32Array(archPtr, arr.length);
    if(archMap === null)
        return null;
    
    archMap.set(arr)

    const ptr = bluebNewModel(archPtr, arr.length);
    if(ptr === null)
        return null;

    return bluebMapModel(ptr);
}

export function paechCreateMatrix(matrix: number[][]): PeachMatrix | null {
    const rows = matrix[0].length;
    const cols = matrix.length;

    const ptr = paechNewMatrix(rows, cols);
    if(ptr === null)
        return null;
    
    const map = peachMapMatrix(ptr);
    if(map === null)
        return null;

    map.value.set(concatenateArrays<number>(matrix));
    
    return map;
}