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

    fitnessPopulation: number[]
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

        //console.log("x", interval[population.x[i]],"y", interval[population.y[i]], "result", result);



        // console.log("FITNESS X INDEX", population.x[i]);
        // console.log("FITNESS Y INDEX", population.y[i]);
        // console.log("FITNESS X", interval[population.x[i]]);
        // console.log("FITNESS Y", interval[population.y[i]]);
        // console.log("FITNESS RESULT",result);
        // console.log("RESULT = ", result);
        // console.log("XY = ", interval[population.x[i]], interval[population.y[i]]);
        // console.log("INDEX = ",  population.x[i] ,  population.y[i]);

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

    return {minimum, maximum, fitnessPopulation}
}

//
// "noUnusedLocals": true,
//     "noUnusedParameters": true,