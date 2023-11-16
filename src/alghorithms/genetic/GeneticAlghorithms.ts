import WebWorker from './worker/WebWorker';
import workerApp from "./worker/WorkerApp";

import {getInterval} from "../../utils/interval/Interval";
import {CalculatedPopulation, calculatePopulationFitnessXY} from "../../utils/fitness/Fitness";
import {chromosomeCrossover} from "../../utils/crossover/Crossover";
import {fnTime} from "../../utils/timings";

export type Population = {
    x: number[],
    y: number[],
    precision: number
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

export type ChartData = {
    minimum: number[],
    populationIndex: number[]
}

export async function genAlgh(options: GeneticParams, progressSetter: (i: number) => void) {
    let chartData: ChartData = {
       minimum:[],
        populationIndex: []
    }

    //1. почат. мом. часу
    let epoch = 0;
    //2. генер. почат. попул.
    let interval = getInterval(options.constraints.minimum, options.constraints.maximum, options.precision);
    //console.log("INTERVAL", interval.length)
    let population: Population = {
        x: options.arrayRandomFunction(0, interval.length - 1, options.populationSize),
        y: options.arrayRandomFunction(0, interval.length - 1, options.populationSize),
        precision: options.precision
    }
    //3. Вычислить приспособленность каждой особи
    let fitnessPopulation: CalculatedPopulation = {...calculatePopulationFitnessXY(interval, options.fitnessFunction, population)};

    chartData.minimum.push(fitnessPopulation.minimum.value);
    chartData.populationIndex.push(0);

    // console.log("x")
    // console.log(population.x)
    // console.log("y")
    // console.log(population.y)
    // console.log(fitnessPopulation.calculatedPopulation);
    // console.logf();
    // console.log(`minimum fitnessPopulation[${fitnessPopulation.minimum.index}] in population gives ${fitnessPopulation.minimum.value}`);
    // console.log(`maximum fitnessPopulation[${fitnessPopulation.maximum.index}] in population gives ${fitnessPopulation.maximum.value}`);


    while (epoch < options.finalEpoch) {
        progressSetter(epoch);
        await new Promise((rs) => setTimeout(rs, 0));

        const newPopulation: Population = {x: [], y: [], precision: options.precision};

        let newPopulationFitness: number[] = [];
        let newPopulationMaximum: { value: number; index: number } = {value: Number.MIN_VALUE, index: 0};
        let newPopulationMinimum: { value: number; index: number } = {value: Number.MAX_VALUE, index: 0};

        while (newPopulation.x.length < options.populationSize) {

            fnTime.countCycles++;


            /*populationPushingName: string, fitnessFunctionName: string,
              inversionFunctionName: string, mutationFunctionName: string, selectionFunctionName: string,
              crossoverFunctionName: string, crossoverProbability: number, mutationProbability: number,
`              population: Population, fitnessPopulation: CalculatedPopulation, interval: number[]*/
            // const worker = WebWorker(workerApp);
            // worker.postMessage({
            //     populationPushingName: options.populationPushing.name,
            //     fitnessFunctionName: options.fitnessFunction.name,
            //     inversionFunctionName: options.inversionFunction.name,
            //     mutationFunctionName: options.mutationFunction.name,
            //     selectionFunctionName: options.selectionFunction.name,
            //     crossoverFunctionName: options.crossoverFunction.name,
            //     crossoverProbability: options.crossoverProbability,
            //     mutationProbability: options.mutationProbability
            //     , population, fitnessPopulation, interval
            // });

            //!!!!!!!!!!!!
            const selectedParents = options.selectionFunction(population, fitnessPopulation, interval);

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

            ///!!!!!!!

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


        if (!options.stopFunction(epoch, options.finalEpoch, options.distance, population, fitnessPopulation, {
            minimum: newPopulationMinimum,
            maximum: newPopulationMaximum,
            calculatedPopulation: newPopulationFitness,
            sortedFitnessPopulation: [5, 2, 1]
        })
        ) {
            break;
        }

        population = {...newPopulation};

        fitnessPopulation = {
            minimum: newPopulationMinimum,
            maximum: newPopulationMaximum,
            calculatedPopulation: newPopulationFitness,
            sortedFitnessPopulation: [...newPopulationFitness].sort()
        };


        chartData.minimum.push(fitnessPopulation.minimum.value);
        chartData.populationIndex.push(epoch);
        // console.log("fitnessPopulation.minimum.value", fitnessPopulation.minimum.value);
        // console.log("epoch", epoch);

        epoch++;
        //console.log("EPOH", epoch)


        // console.log("NEW POPULATION");
        // console.log(population)
        // console.log(fitnessPopulation.calculatedPopulation);
        // console.log();
        // console.log(`minimum fitnessPopulation[${fitnessPopulation.minimum.index}] in population gives ${fitnessPopulation.minimum.value}`);
        // // console.log(`fitness(${interval[population.x[fitnessPopulation.minimum.index]]}, ${interval[population.y[fitnessPopulation.minimum.index]]}) = ${options.fitnessFunction(interval[population.x[fitnessPopulation.minimum.index]], interval[population.y[fitnessPopulation.minimum.index]])}`);
        // console.log(`maximum fitnessPopulation[${fitnessPopulation.maximum.index}] in population gives ${fitnessPopulation.maximum.value}`);
    }

    progressSetter(options.finalEpoch);

    console.log(fnTime)

    return {population, fitnessPopulation, interval, chartData};
}

