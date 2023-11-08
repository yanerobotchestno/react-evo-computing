import {getInterval} from "../../utils/interval/Interval";
import {CalculatedPopulation, calculatePopulationFitnessXY} from "../../utils/fitness/Fitness";
import {chromosomeCrossover} from "../../utils/crossover/Crossover";
import React from "react";


export type GeneticOptions = {
    populationSize: number,
    randomizerFunction: (minimum: number, maximum: number, count: number) => number[],
    crossoverProbability: number,
    finalEpoh: number,
    mutationProbability: number,
    crossover: (a: number, b: number) => [number, number],
    mutation: (mutationProbability: number, chromosome: number) => number,
    inversion: (chromosome: number) => number,
    debugMode: boolean
}


export type FunctionOptions = {
    function: (x: number, y: number) => number,
    minimum: number,
    maximum: number,
    precision: number
}


export type Population = {
    x: number[],
    y: number[]
}


export type Chromosome = {
    x: number,
    y: number
}

export type GeneticParams = {
    distance: number;

    constraints: {
        minimum: number;
        maximum: number;
    },
    precision: number;

    arrayRandomFunction: (minimum: number, maximum: number, count: number) => number[];
    populationSize: number;
    finalEpoch: number;

    fitnessFunction: (x: number, y: number) => number;

    selectionFunction: (population: Population, fitnessPopulation: CalculatedPopulation, interval: number[]) => Chromosome[];

    crossoverFunction: (a: number, b: number) => [number, number];
    crossoverProbability: number;

    mutationProbability: number;
    mutationFunction: (chromosome: number) => number;

    inversionProbability: number;
    inversionFunction: (chromosome: number) => number;

    populationPushing: (fitnessChromosome: number, calculatedPopulation: CalculatedPopulation) => boolean;

    stopFunction: (epoch: number, currentEpoch: number, distance: number, population: Population, calculatedPopulation: CalculatedPopulation, newCalculatedPopulation: CalculatedPopulation) => boolean;
}

export async function genAlgh(options: GeneticParams, progressSetter: (i: number) => void) {
    //1. почат. мом. часу
    let epoch = 0;
    //2. генер. почат. попул.
    let interval = getInterval(options.constraints.minimum, options.constraints.maximum, options.precision);
    console.log("INTERVAL", interval.length)
    let population: Population = {
        x: options.arrayRandomFunction(0, interval.length - 1, options.populationSize),
        y: options.arrayRandomFunction(0, interval.length - 1, options.populationSize),
    }
    //3. Вычислить приспособленность каждой особи
    let fitnessPopulation: CalculatedPopulation = {...calculatePopulationFitnessXY(interval, options.fitnessFunction, population)};

    console.log("x")
    console.log(population.x)
    console.log("y")
    console.log(population.y)
    console.log(fitnessPopulation.fitnessPopulation);
    console.log();
    console.log(`minimum fitnessPopulation[${fitnessPopulation.minimum.index}] in population gives ${fitnessPopulation.minimum.value}`);
    console.log(`maximum fitnessPopulation[${fitnessPopulation.maximum.index}] in population gives ${fitnessPopulation.maximum.value}`);

    while (epoch < options.finalEpoch) {
        progressSetter(epoch);
        await new Promise((rs) => setTimeout(rs, 0));

        const newPopulation: Population = {x: [], y: []};

        let newPopulationFitness: number[] = [];
        let newPopulationMaximum: { value: number; index: number } = {value: Number.MIN_VALUE, index: 0};
        let newPopulationMinimum: { value: number; index: number } = {value: Number.MAX_VALUE, index: 0};

        while (newPopulation.x.length < options.populationSize) {

            //Шаг 4. Выбрать особи
            const selectedParents = options.selectionFunction(population, fitnessPopulation, interval);

            // console.log()
            // if (isNaN(options.fitnessFunction(interval[selectedParents[0].x], interval[selectedParents[0].y])) || isNaN(options.fitnessFunction(interval[selectedParents[1].x], interval[selectedParents[1].y]))) {
            //     console.log(newPopulation.x.length)
            //     console.log("NAN!!!!!!!!!!!");
            //     console.log("____0_____")
            //     console.log([selectedParents[0].x]);
            //     console.log([selectedParents[0].y]);
            //     console.log(interval[selectedParents[0].x]);
            //     console.log(interval[selectedParents[0].y]);
            //     console.log("____1_____")
            //     console.log([selectedParents[1].x]);
            //     console.log([selectedParents[1].y]);
            //     console.log(interval[selectedParents[1].x]);
            //     console.log(interval[selectedParents[1].y]);
            // } else {
            //     console.log(newPopulation.x.length)
            //     console.log(`fitness(${interval[selectedParents[0].x]}, ${interval[selectedParents[0].y]}) = ${options.fitnessFunction(interval[selectedParents[0].x], interval[selectedParents[0].y])}`);
            //     console.log(`fitness(${interval[selectedParents[1].x]}, ${interval[selectedParents[1].y]}) = ${options.fitnessFunction(interval[selectedParents[1].x], interval[selectedParents[1].y])}`);
            // }
            // console.log()


            const childIndex = (Math.random() <= 0.5) ? 0 : 1;
            const crossoverResult = (Math.random() < options.crossoverProbability) ? selectedParents[childIndex] : chromosomeCrossover(selectedParents, options.crossoverFunction)[childIndex];

            const mutationResult = (Math.random() < options.mutationProbability) ? crossoverResult :
                {
                    x: options.mutationFunction(crossoverResult.x),
                    y: options.mutationFunction(crossoverResult.y)
                }

            const inversionResult: Chromosome = (Math.random() < options.mutationProbability) ? mutationResult :
                {
                    x: options.inversionFunction(mutationResult.x),
                    y: options.inversionFunction(mutationResult.y)
                }

            const fitnessMember = options.fitnessFunction(interval[inversionResult.x], interval[inversionResult.y]);

            if (options.populationPushing(fitnessMember, fitnessPopulation)) {
                newPopulation.x.push(inversionResult.x);
                newPopulation.y.push(inversionResult.y);
                newPopulationFitness.push(fitnessMember);
            } else {
                continue;
            }

            if (newPopulation.x.length !== newPopulation.y.length) {
                throw Error("GeneticAlgorithm: x length exceeds y length")
            }

            if (fitnessMember > newPopulationMaximum.value) {
                newPopulationMaximum.value = fitnessMember;
                newPopulationMaximum.index = newPopulation.x.length - 1;
            }

            if (fitnessMember < newPopulationMinimum.value) {
                newPopulationMinimum.value = fitnessMember;
                newPopulationMinimum.index = newPopulation.y.length - 1;
            }
        }

        if(!options.stopFunction(epoch, options.finalEpoch, options.distance, population, fitnessPopulation, fitnessPopulation = {
            minimum: newPopulationMinimum,
            maximum: newPopulationMaximum,
            fitnessPopulation: newPopulationFitness
        })
        ) {
            epoch = options.finalEpoch;
        }

        population = {...newPopulation};

        fitnessPopulation = {
            minimum: newPopulationMinimum,
            maximum: newPopulationMaximum,
            fitnessPopulation: newPopulationFitness
        };

        epoch++;
        console.log("EPOH", epoch)


        console.log("NEW POPULATION");
        console.log(population)
        console.log(fitnessPopulation.fitnessPopulation);
        console.log();
        console.log(`minimum fitnessPopulation[${fitnessPopulation.minimum.index}] in population gives ${fitnessPopulation.minimum.value}`);
        // console.log(`fitness(${interval[population.x[fitnessPopulation.minimum.index]]}, ${interval[population.y[fitnessPopulation.minimum.index]]}) = ${options.fitnessFunction(interval[population.x[fitnessPopulation.minimum.index]], interval[population.y[fitnessPopulation.minimum.index]])}`);
        console.log(`maximum fitnessPopulation[${fitnessPopulation.maximum.index}] in population gives ${fitnessPopulation.maximum.value}`);
    }
    progressSetter(options.finalEpoch);

    return {population, fitnessPopulation, interval};
}

