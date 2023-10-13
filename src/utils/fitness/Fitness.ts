import {Population} from "../../alghorithms/genetic/GeneticAlghorithms";


export function calculatePopulationFitnessXY(interval: number[], fitness: (x: number, y: number) => number, population: Population) {
    let minimum: {
        value: number,
        index: number
    } = {
        value: fitness(interval[population.x[0]], interval[population.y[0]]),
        index: 0
    }

    const fitnessPopulation: number[] = [];

    for (let i = 0; i < population.x.length; i++) {
        const result = fitness(interval[population.x[i]], interval[population.y[i]]);

        if (Math.abs(result) <= Math.abs(minimum.value)) {
            minimum.value = result;
            minimum.index = i;
        }

        fitnessPopulation.push(result);
    }

    return {minimum, fitnessPopulation}
}

//
// "noUnusedLocals": true,
//     "noUnusedParameters": true,