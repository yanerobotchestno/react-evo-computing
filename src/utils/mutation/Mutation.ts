import {randomNumberInRange} from "../random/Uniform";


export function mutation(chromosome: number): number {
    const maxBits = Math.floor(Math.log2(chromosome)) + 1;
    const bitPosition = 1 << randomNumberInRange(0, maxBits);
    const mutatedChromosome = chromosome ^ bitPosition;
    const maxBitMask = (1 << maxBits) - 1;
    return mutatedChromosome & maxBitMask;

}


// export function mutation(binary: number[], count: number): number[] {
//     const mutated: number[] = binary.slice();
//
//     for (let i = 0; i < count; i++) {
//         const selectedIndex = Math.floor(Math.random() * binary.length);
//
//         mutated[selectedIndex] = mutated[selectedIndex] ^ 1;
//     }
//     return mutated;
// }
