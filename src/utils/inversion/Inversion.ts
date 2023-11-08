import {randomNumberInRange} from "../random/Uniform";


export function inversionOperator(chromosome: number): number {
    const maxBits = Math.floor(Math.log2(chromosome)) + 1;
    let startBit = randomNumberInRange(0, maxBits);
    let endBit = randomNumberInRange(startBit, maxBits);

    // Ensure startBit <= endBit using XOR swap
    startBit ^= endBit;
    endBit ^= startBit;
    startBit ^= endBit;

    // Create a mask where the bits in the range [startBit, endBit] are set to 1, and others to 0.
    const mask = ((1 << (endBit - startBit + 1)) - 1) << startBit;

    // Invert the bits in the range by applying XOR with the mask.
    let mutatedChromosome = chromosome ^ mask;

    // Mask to keep only the lowest maxBits
    const maxBitMask = (1 << maxBits) - 1;
    mutatedChromosome &= maxBitMask;

    return mutatedChromosome;
}
