import {getInterval} from "../../utils/interval/Interval";
import {CalculatedPopulation, calculatePopulationFitnessXY} from "../../utils/fitness/Fitness";
import {chromosomeCrossover} from "../../utils/crossover/Crossover";


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

let maxIndex = 0;
//
// export function geneticAlgorithm(options: GeneticOptions, usedFunction: FunctionOptions) {
//
//     let interval = getInterval(usedFunction.minimum, usedFunction.maximum, usedFunction.precision);
//
//     let currentPopulation: Population = {
//         x: options.randomizerFunction(0, interval.length, options.populationSize),
//         y: options.randomizerFunction(0, interval.length, options.populationSize)
//     }
//
//     // console.log("GENERATED POPULATION: X ", currentPopulation.x);
//     // console.log("GENERATED POPULATION: Y ", currentPopulation.y);
//     let computedPopulation = calculatePopulationFitnessXY(interval, usedFunction.function, currentPopulation);
//     console.log(`first population:${computedPopulation.fitnessPopulation}`);
//     console.log(`minimum:${computedPopulation.minimum.value}`)
//
//     for (let epoch = 0; epoch < options.finalEpoh; epoch++) {
//         console.log(`EPOH ${epoch} STARTED`);
//
//         let newPopulation: Population = {
//             x: [],
//             y: []
//         };
//
//         // console.log("currentPopulation.x.length",currentPopulation.x.length)
//         // console.log("currentPopulation.y.length",currentPopulation.y.length)
//         // console.log("newPopulation.x.length",newPopulation.x.length)
//         // console.log("newPopulation.y.length",newPopulation.y.length)
//
//         while (newPopulation.x.length < currentPopulation.y.length) {
//             //select parents(panmix...) JUST FUNCTION
//             const parent1: Chromosome = {
//                 x: currentPopulation.x[Math.floor(Math.random() * currentPopulation.x.length)],
//                 y: currentPopulation.y[Math.floor(Math.random() * currentPopulation.y.length)]
//             }
//
//             const parent2: Chromosome = {
//                 x: currentPopulation.x[Math.floor(Math.random() * currentPopulation.x.length)],
//                 y: currentPopulation.y[Math.floor(Math.random() * currentPopulation.y.length)]
//             }
//
//             //crossover PROBABILLITY - param and function
//             //Need to consider that we choose first or second child
//
//
//             const childIndex = (Math.random() < 0.5) ? 0 : 1;
//
//             const child: Chromosome = {
//                 x: (options.crossover(parent1.x, parent2.x)[childIndex]),
//                 y: (options.crossover(parent1.y, parent2.y)[childIndex])
//             }
//
//             if (options.debugMode) {
//                 console.log("CROSSOVER PARENT X ", parent1.x)
//                 console.log("CROSSOVER PARENT Y ", parent1.y)
//                 console.log("CROSSOVER CHILD X ", child.x)
//                 console.log("CROSSOVER CHILD Y ", child.y)
//             }
//
//             if ((interval.length < child.x) || (interval.length < child.y)) {
//                 console.log("EXCEED MAX INDEX", interval.length);
//                 maxIndex = Math.max(child.x, maxIndex);
//                 maxIndex = Math.max(child.y, maxIndex);
//
//             }
//
//
//             //mutation
//             const mutateChild: Chromosome = {
//                 x: (options.mutation(options.mutationProbability, child.x)),
//                 y: (options.mutation(options.mutationProbability, child.y))
//             }
//
//             if (options.debugMode) {
//                 console.log("BEFORE MUTATION X", child.x)
//                 console.log("BEFORE MUTATION Y", child.y)
//                 console.log("AFTER MUTATION X", mutateChild.x)
//                 console.log("AFTER MUTATION Y", mutateChild.y)
//             }
//
//             if ((interval.length < mutateChild.x) || (interval.length < mutateChild.y)) {
//                 console.log("EXCEED MAX INDEX");
//                 maxIndex = Math.max(mutateChild.x, maxIndex)
//                 maxIndex = Math.max(mutateChild.y, maxIndex)
//             }
//             //inversion
//             const inversionChild: Chromosome = {
//                 x: (options.inversion((mutateChild.x))),
//                 y: (options.inversion((mutateChild.y)))
//             }
//
//             if (options.debugMode) {
//                 console.log("BEFORE inversionChild X", mutateChild.x)
//                 console.log("BEFORE inversionChild Y", mutateChild.y)
//                 console.log("AFTER inversionChild X", inversionChild.x)
//                 console.log("AFTER inversionChild Y", inversionChild.y)
//
//             }
//             if ((interval.length < inversionChild.x) || (interval.length < inversionChild.y)) {
//                 console.log("EXCEED MAX INDEX")
//                 maxIndex = Math.max(inversionChild.x, maxIndex)
//                 maxIndex = Math.max(inversionChild.y, maxIndex)
//             }
//
//             newPopulation.x.push(inversionChild.x);
//             newPopulation.y.push(inversionChild.y);
//
//             if (options.debugMode) {
//                 console.log("Pushed to new population X " + inversionChild.x)
//                 console.log("Pushed to new population Y " + inversionChild.y)
//             }
//         }
//
//         computedPopulation = calculatePopulationFitnessXY(interval, usedFunction.function, newPopulation);
//
//         if (options.debugMode) {
//             console.log("X")
//             console.log(`epoh ${epoch} ${newPopulation.x}`);
//             console.log("Y")
//             console.log(`epoh ${epoch} \n${newPopulation.y}`);
//             console.log(`minimum at population:`)
//             console.log(computedPopulation.minimum.value)
//             console.log(computedPopulation.minimum.index)
//             console.log(`maximum at population:`)
//             console.log(computedPopulation.maximum.value)
//             console.log(computedPopulation.maximum.index)
//             console.log("COMPUTED POPULATION")
//             console.log(computedPopulation.fitnessPopulation)
//
//             console.log(`x:${interval[newPopulation.x[computedPopulation.minimum.index]]}`);
//             console.log(`y:${interval[computedPopulation.minimum.value]}`);
//             console.log("BEFORE MERGE: X ", currentPopulation.x)
//             console.log("BEFORE MERGE: Y ", currentPopulation.y)
//         }
//
//         if (computedPopulation.minimum.value < usedFunction.precision) {
//             console.log("FINISH FINDED MINIMUM: " + computedPopulation.minimum.value + " AT X: " + currentPopulation.x[computedPopulation.minimum.index] + " AND Y: " +
//                 currentPopulation.y[computedPopulation.minimum.index]);
//             break;
//         }
//
//         currentPopulation = {...newPopulation};
//
//         // console.log("AFTER MERGE: X ", currentPopulation.x)
//         // console.log("AFTER MERGE: Y ", currentPopulation.y)
//     }
//
//     console.log("X", currentPopulation.x);
//     console.log("Y", currentPopulation.y);
//
//     console.log("MAXIMUM INDEX", maxIndex)
//     console.log("FINISH BY LAST EPOH MINIMUM: " + computedPopulation.minimum.value + " AT X: " + currentPopulation.x[computedPopulation.minimum.index] + " AND Y: " +
//         currentPopulation.y[computedPopulation.minimum.index]);
//     console.log("WEIRD " + currentPopulation.y[computedPopulation.minimum.value], currentPopulation.x[computedPopulation.minimum.value])
//     console.log("FINAL", computedPopulation.fitnessPopulation)
//     return currentPopulation;
// }


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

export function genAlgh(options: GeneticParams) {
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
        const newPopulation: Population = {x: [], y: []};

        let newPopulationFitness: number[] = [];
        let newPopulationMaximum: { value: number; index: number } = {value: Number.MIN_VALUE, index: 0};
        let newPopulationMinimum: { value: number; index: number } = {value: Number.MAX_VALUE, index: 0};

        while (newPopulation.x.length < options.populationSize) {

            //Шаг 4. Выбрать особи
            const selectedParents = options.selectionFunction(population, fitnessPopulation, interval);

            console.log()
            if (isNaN(options.fitnessFunction(interval[selectedParents[0].x], interval[selectedParents[0].y])) || isNaN(options.fitnessFunction(interval[selectedParents[1].x], interval[selectedParents[1].y]))) {
                console.log(newPopulation.x.length)
                console.log("NAN!!!!!!!!!!!");
                console.log("____0_____")
                console.log([selectedParents[0].x]);
                console.log([selectedParents[0].y]);
                console.log(interval[selectedParents[0].x]);
                console.log(interval[selectedParents[0].y]);
                console.log("____1_____")
                console.log([selectedParents[1].x]);
                console.log([selectedParents[1].y]);
                console.log(interval[selectedParents[1].x]);
                console.log(interval[selectedParents[1].y]);
            } else {
                console.log(newPopulation.x.length)
                console.log(`fitness(${interval[selectedParents[0].x]}, ${interval[selectedParents[0].y]}) = ${options.fitnessFunction(interval[selectedParents[0].x], interval[selectedParents[0].y])}`);
                console.log(`fitness(${interval[selectedParents[1].x]}, ${interval[selectedParents[1].y]}) = ${options.fitnessFunction(interval[selectedParents[1].x], interval[selectedParents[1].y])}`);
            }
            console.log()


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
        console.log(`fitness(${interval[population.x[fitnessPopulation.minimum.index]]}, ${interval[population.y[fitnessPopulation.minimum.index]]}) = ${options.fitnessFunction(interval[population.x[fitnessPopulation.minimum.index]], interval[population.y[fitnessPopulation.minimum.index]])}`);
        console.log(`maximum fitnessPopulation[${fitnessPopulation.maximum.index}] in population gives ${fitnessPopulation.maximum.value}`);
    }

    return {population, fitnessPopulation, interval};
}

