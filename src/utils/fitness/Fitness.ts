import {Population} from "../../alghorithms/genetic/GeneticAlghorithms";


export type CalculatedPopulation = {
    minimum: {
        value: number,
        index: number
    },

    maximum: {
        value: number,
        index: number
    },

    calculatedPopulation: number[],
    sortedFitnessPopulation: number[]
}

export function calculatePopulationFitnessXY(interval: number[], fitness: (x: number, y: number) => number, population: Population): CalculatedPopulation {
    let minimum: {
        value: number,
        index: number
    } = {
        value: fitness(interval[population.x[0]], interval[population.y[0]]),
        index: 0
    }

    let maximum = {...minimum};

    const fitnessPopulation: number[] = [];

    if (population.x.length !== population.y.length) {
        throw Error("Fitness: x and y array have a different length")
    }

    for (let i = 0; i < population.x.length; i++) {
        const result = fitness(interval[population.x[i]], interval[population.y[i]]);

        if (Math.abs(result) < Math.abs(minimum.value)) {
            minimum.value = result;
            minimum.index = i;
        }

        if (Math.abs(result) > Math.abs(maximum.value)) {
            maximum.value = result;
            maximum.index = i;
        }

        fitnessPopulation.push(result);
    }

    return {minimum, maximum, calculatedPopulation: fitnessPopulation, sortedFitnessPopulation: [...fitnessPopulation].sort()}
}

//
// "noUnusedLocals": true,
//     "noUnusedParameters": true,