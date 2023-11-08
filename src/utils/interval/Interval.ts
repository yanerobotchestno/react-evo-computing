import {Population} from "../../alghorithms/genetic/GeneticAlghorithms";


export function getInterval(minimum: number, maximum: number, precision: number) {
    const length = maximum - minimum;
    const count = (length / precision) + 1;
    const maxBits = Math.floor(Math.log2(count)) + 1;

    const usedPrecision = length / (2 ** maxBits - 1);

    if (usedPrecision > precision) throw Error("Interval: interval precision exceeds parameter precision");

    const interval: number[] = [];

    interval.push(minimum);

    for (let i = 1; i < (2 ** maxBits - 1); i++) {
        interval.push(interval[i - 1] + usedPrecision)
    }

    if (interval.length !== (2 ** maxBits - 1)) throw Error("Interval: count exceeds mapping length");
    return interval;
}


export function appendInterval(interval: number[], population: Population) {
    let x: number[] = [];
    let y: number[] = [];

    for (let i = 0; i < population.x.length; i++) {
        x.push(interval[population.x[i]]);
        y.push(interval[population.y[i]]);
    }

    return {x,y};
}