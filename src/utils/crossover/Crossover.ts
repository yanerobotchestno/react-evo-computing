/*
* Wrote following next guide:
* https://medium.com/geekculture/crossover-operators-in-ga-cffa77cdd0c8
*/


import {randomNumberInRange} from "../random/Uniform";
import {Chromosome} from "../../alghorithms/genetic/GeneticAlghorithms";

export function chromosomeCrossover(parents: Chromosome[], crossover: (a: number, b: number) => [number, number]): Chromosome[] {
    const childX = crossover(parents[0].x, parents[1].x);
    const childY = crossover(parents[0].y, parents[1].y);

    return [{
        x: childX[0],
        y: childY[0]
    }, {
        x: childX[1],
        y: childY[1]
    }]
}

export function crossoverSinglePoint(a: number, b: number): [number, number] {
    const maxBits = Math.floor(Math.log2(Math.max(Math.abs(a), Math.abs(b)))) + 1;
    const bits = randomNumberInRange(0, maxBits);
    const mask1 = 2 ** bits - 1;
    const mask2 = Number.MAX_SAFE_INTEGER ^ mask1;
    const res1 = (a & mask1) | (b & mask2);
    const res2 = (b & mask1) | (a & mask2);
    return [res1, res2];
}


export function crossoverDualPoint(a: number, b: number): [number, number] {
    const maxBits = Math.floor(Math.log2(Math.max(Math.abs(a), Math.abs(b)))) + 1;
    const firstPoint = randomNumberInRange(0, maxBits);
    const secondPoint = randomNumberInRange(0, maxBits);

    const baseMask = 2 ** firstPoint - 1;
    const maskRight = 2 ** secondPoint - 1;

    const maskLeft = Number.MAX_SAFE_INTEGER ^ baseMask;

    const maskCenter = baseMask ^ maskRight;

    const res1 = (a & maskLeft) | (b & maskCenter) | (a & maskRight);
    const res2 = (b & maskLeft) | (a & maskCenter) | (b & maskRight);

    return [res1, res2];
}

//
// export function dualPointCrossover
// (
//     parent1: number[],
//     parent2: number[],
// ) {
//     if (parent1.length !== parent2.length) {
//         throw new Error("DualPointCrossover: parents must have the same length");
//     }
//     // Generate a random crossover points.
//     const crossoverPointStart = getRandomInt(0, parent1.length);
//     const crossoverPointEnds = getRandomInt(0, parent1.length);
//
//     // Create two empty child chromosomes.
//     const child1: number[] = [];
//     const child2: number[] = [];
//
//     // Iterate over the parent chromosomes and copy the genes to the children,
//     // respecting the constraints.
//     for (let i = 0; i < parent1.length; i++) {
//         if (i < crossoverPointStart || i > crossoverPointEnds) {
//             child1[i] = parent1[i];
//             child2[i] = parent2[i];
//         } else {
//             child1[i] = parent2[i];
//             child2[i] = parent1[i];
//         }
//     }
//
//     return {child1, child2}
// }