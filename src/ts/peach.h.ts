import { blueberryInstance } from "./blueberry";
import { peachMapMatrix } from "./peach.map";
import { Pointer } from "./blueberry.mem";

export function internalPeachSigmoid(n: number) : number {
    if (blueberryInstance === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_sigmoid as Function)(n);
}

export function internalPeachRelu(n: number) : number {
    if (blueberryInstance === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_relu as Function)(n);
}

export function internalPeachNewMatrix(rows: number, cols: number) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_new_matrix as Function)(rows, cols);
}
export function internalPeachNewMatrixSquare(size: number ) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_new_matrix_square as Function)(size, size);
}
export function internalPeachNewMatrixRandom(rows: number, cols: number, min: number, max: number) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_new_matrix_random as Function)(rows, cols, min, max);
}

export function internalPeachCopyMatrix(src: Pointer) : Pointer  {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_copy_matrix as Function)(src);
}

export function internalPeachCopyMatrixEmpty(src: Pointer) : Pointer  {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_copy_matrix_empty as Function)(src);
}

export function internalPeachFreeMatrix(matrix: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_free_matrix as Function)(matrix);
}

export function internalPeachGetMatrixRows(matrix: Pointer) : number {
    if (blueberryInstance === null)
        return 0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_free_matrix as Function)(matrix);
}

export function internalPeachGetMatrixCols(matrix: Pointer) : number {
    if (blueberryInstance === null)
        return 0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_get_matrix_cols as Function)(matrix);
}

export function internalPeachGetMatrixValues(matrix: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_get_matrix_values as Function)(matrix);
}

export function internalPeachMatrixFill(target: Pointer, value: number) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_fill as Function)(target, value);
}

export function internalPeachMatrixRand(target: Pointer, min: number, max: number) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_rand as Function)(target, min, max);
}

export function internalPeachMatrixFillValues(dst: Pointer, values: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_fill_values as Function)(dst, values);
}

export function internalPeachMatrixCopyContentTarget(dst: Pointer, src: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_copy_content_target as Function)(dst, src);
}

export function internalPeachMatrixScale(target: Pointer, value: number) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_scale as Function)(target, value);
}

export function internalPeachMatrixSum(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_sum as Function)(a, b);
}

export function internalPeachMatrixSub(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_sub as Function)(a, b);
}

export function internalPeachMatrixMul(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_mul as Function)(a, b);
}

export function internalPeachMatrixDiv(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_div as Function)(a, b);
}

export function internalPeachMatrixDot(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_dot as Function)(a, b);
}

export function internalPeachMatrixSumTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_sum_target as Function)(target, b);
}

export function internalPeachMatrixSubTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_sub_target as Function)(target, b);
}

export function internalPeachMatrixMulTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_mul_target as Function)(target, b);
}

export function internalPeachMatrixDivTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_div_target as Function)(target, b);
}

export function internalPeachMatrixDotTarget(target: Pointer, a: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_dot_target as Function)(target, a, b);
}

export function internalPeachMatrixApplySigmoid(target: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_apply_sigmoid as Function)(target);
}

export function internalPeachMatrixApplyRelu(target: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_apply_relu as Function)(target);
}

export function internalPeachMatrixPrint(m: Pointer) {
    if (blueberryInstance === null)
        return;

    console.log(peachMapMatrix(m));
}
