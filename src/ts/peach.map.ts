import { blueberryInstance, concatenateArrays } from "./blueberry";
import { Pointer, bluebMapFloat32Array } from "./blueberry.mem";
import { internalPeachGetMatrixCols, internalPeachGetMatrixRows, internalPeachGetMatrixValues, internalPeachNewMatrix } from "./peach.h";

// Mapping for peach C matrix
export type PeachMatrix = {
    rows: number;
    cols: number;

    value: Float32Array;

    // Pointer to original C structure
    pointer: Pointer;
}

export function peachMapMatrix(matrixPtr: Pointer) : PeachMatrix | null {
    if(blueberryInstance === null)
        return null;

    if(matrixPtr === null)
        return null;

    const rows = internalPeachGetMatrixRows(matrixPtr);
    const cols = internalPeachGetMatrixCols(matrixPtr);
    const valuePtr = internalPeachGetMatrixValues(matrixPtr);

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

export function paechNewMatrix(matrix: number[][]): PeachMatrix | null {
    const rows = matrix[0].length;
    const cols = matrix.length;

    const ptr = internalPeachNewMatrix(rows, cols);
    if(ptr === null)
        return null;
    
    const map = peachMapMatrix(ptr);
    if(map === null)
        return null;

    map.value.set(concatenateArrays<number>(matrix));
    
    return map;
}