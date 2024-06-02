"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeHeap = void 0;
const heapSize = 4096;
// Initializing heap
function initializeHeap(instance) {
    if (instance === null)
        return;
    const ex = instance.wasm.exports;
    const memory = ex.memory;
    const heap = new Uint8Array(memory.buffer, ex.__heap_base, heapSize);
    ex.lemon_init_i32(heap.byteOffset, heapSize);
}
exports.initializeHeap = initializeHeap;
