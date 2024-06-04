import { blueberryInstance } from "./blueberry";
import { peachMapMatrix } from "./blueberry.map";
import { Pointer } from "./blueberry.mem";

export function peachSigmoid(n: number) : number {
    if (blueberryInstance === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_sigmoid as Function)(n);
}

export function peachRelu(n: number) : number {
    if (blueberryInstance === null)
        return 0.0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_relu as Function)(n);
}

export function paechNewMatrix(rows: number, cols: number) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_new_matrix as Function)(rows, cols);
}
export function paechNewMatrixSquare(size: number ) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_new_matrix_square as Function)(size, size);
}
export function paechNewMatrixRandom(rows: number, cols: number, min: number, max: number) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_new_matrix_random as Function)(rows, cols, min, max);
}

export function paechCopyMatrix(src: Pointer) : Pointer  {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_copy_matrix as Function)(src);
}

export function paechCopyMatrixEmpty(src: Pointer) : Pointer  {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.paech_copy_matrix_empty as Function)(src);
}

export function peachFreeMatrix(matrix: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_free_matrix as Function)(matrix);
}

export function peachGetMatrixRows(matrix: Pointer) : number {
    if (blueberryInstance === null)
        return 0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_free_matrix as Function)(matrix);
}

export function peachGetMatrixCols(matrix: Pointer) : number {
    if (blueberryInstance === null)
        return 0;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_get_matrix_cols as Function)(matrix);
}

export function peachGetMatrixValues(matrix: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_get_matrix_values as Function)(matrix);
}

export function peachMatrixFill(target: Pointer, value: number) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_fill as Function)(target, value);
}

export function peachMatrixRand(target: Pointer, min: number, max: number) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_rand as Function)(target, min, max);
}

export function peachMatrixFillValues(dst: Pointer, values: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_fill_values as Function)(dst, values);
}

export function peachMatrixCopyContentTarget(dst: Pointer, src: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_copy_content_target as Function)(dst, src);
}

export function peachMatrixScale(target: Pointer, value: number) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_scale as Function)(target, value);
}

export function peachMatrixSum(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_sum as Function)(a, b);
}

export function peachMatrixSub(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_sub as Function)(a, b);
}

export function peachMatrixMul(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_mul as Function)(a, b);
}

export function peachMatrixDiv(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_div as Function)(a, b);
}

export function peachMatrixDot(a: Pointer, b: Pointer) : Pointer {
    if (blueberryInstance === null)
        return null;

    const ex = blueberryInstance.wasm.exports;
    return (ex.peach_matrix_dot as Function)(a, b);
}

export function peachMatrixSumTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_sum_target as Function)(target, b);
}

export function peachMatrixSubTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_sub_target as Function)(target, b);
}

export function peachMatrixMulTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_mul_target as Function)(target, b);
}

export function peachMatrixDivTarget(target: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_div_target as Function)(target, b);
}

export function peachMatrixDotTarget(target: Pointer, a: Pointer, b: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_dot_target as Function)(target, a, b);
}

export function peachMatrixApplySigmoid(target: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_apply_sigmoid as Function)(target);
}

export function peachMatrixApplyRelu(target: Pointer) {
    if (blueberryInstance === null)
        return;

    const ex = blueberryInstance.wasm.exports;
    (ex.peach_matrix_apply_relu as Function)(target);
}

export function peachMatrixPrint(m: Pointer) {
    if (blueberryInstance === null)
        return;

    console.log(peachMapMatrix(m));
}
