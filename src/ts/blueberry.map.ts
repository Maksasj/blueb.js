import { blueberryInstance, internalBluebGetModelBiasesLayer, internalBluebGetModelLayerCount, internalBluebGetModelNeuronLayer, internalBluebGetModelWeightLayer, internalBluebNewModel } from "./blueberry";
import { Pointer, bluebMapFloat32Array, bluebMapInt32Array, bluebNewInt32Array } from "./blueberry.mem";
import { concatenateArrays } from "./blueberry.utils";
import { PeachMatrix, peachMapMatrix } from "./peach.map";

// Mapping for blueberry C model
export type BlueberryModel = {
    weights: PeachMatrix[];
    biases: PeachMatrix[];
    neurons: PeachMatrix[];

    count: number;
    
    // Pointer to original C structure
    pointer: Pointer
};

export function bluebMapModel(modelPtr: Pointer) : BlueberryModel | null {
    if(modelPtr === null)
        return null;

    const count = internalBluebGetModelLayerCount(modelPtr); 
    let weights: PeachMatrix[] = [];
    let biases: PeachMatrix[] = [];
    let neurons: PeachMatrix[] = [];
    
    if(count <= 0)
        return null;

    for(let i = 0; i < count; ++i) {
        let neuron = peachMapMatrix(internalBluebGetModelNeuronLayer(modelPtr, i));
        if(neuron != null)
            neurons.push(neuron);

        if(i <= 0)
            continue;

        let weight = peachMapMatrix(internalBluebGetModelWeightLayer(modelPtr, i - 1));
        if(weight != null)
            weights.push(weight);
        
        let biase = peachMapMatrix(internalBluebGetModelBiasesLayer(modelPtr, i - 1));
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

    const ptr = internalBluebNewModel(archPtr, arr.length);
    if(ptr === null)
        return null;

    return bluebMapModel(ptr);
}

