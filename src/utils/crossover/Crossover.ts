/*
* Wrote following next guide:
* https://medium.com/geekculture/crossover-operators-in-ga-cffa77cdd0c8
*/


import {getRandomInt} from "../random/Uniform";

export function singlePointCrossover(
    parent1: number[],
    parent2: number[],
) {
    console.log(parent1)
    console.log(parent2)
    console.log("!!!!!!!!!!!!!!!!!!!!!"+parent1.length)
    console.log("!!!!!!!!!!!!!!!!!!!!!"+parent2.length)
    if (parent1.length !== parent2.length) {
        throw new Error("SinglePointCrossover: parents must have the same length");
    }
    // Generate a random crossover point.
    const crossoverPoint = getRandomInt(0, parent1.length);

    // Create two empty child chromosomes.
    const child1: number[] = [];
    const child2: number[] = [];

    // Iterate over the parent chromosomes and copy the genes to the children,
    for (let i = 0; i < parent1.length; i++) {
        if (i < crossoverPoint) {
            child1[i] = parent1[i];
            child2[i] = parent2[i];
        } else {
            child1[i] = parent2[i];
            child2[i] = parent1[i];
        }
    }

    return {child1, child2}
}

export function dualPointCrossover
(
    parent1: number[],
    parent2: number[],
) {
    if (parent1.length !== parent2.length) {
        throw new Error("DualPointCrossover: parents must have the same length");
    }
    // Generate a random crossover points.
    const crossoverPointStart = getRandomInt(0, parent1.length);
    const crossoverPointEnds = getRandomInt(0, parent1.length);

    // Create two empty child chromosomes.
    const child1: number[] = [];
    const child2: number[] = [];

    // Iterate over the parent chromosomes and copy the genes to the children,
    // respecting the constraints.
    for (let i = 0; i < parent1.length; i++) {
        if (i < crossoverPointStart || i > crossoverPointEnds) {
            child1[i] = parent1[i];
            child2[i] = parent2[i];
        } else {
            child1[i] = parent2[i];
            child2[i] = parent1[i];
        }
    }

    return {child1, child2}
}