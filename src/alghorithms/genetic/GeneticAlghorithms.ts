import {getInterval} from "../../utils/interval/Interval";
import {calculatePopulationFitnessXY} from "../../utils/fitness/Fitness";
import {singlePointCrossover} from "../../utils/crossover/Crossover";
import {binaryArrayToNumber, integerToBinaryArray} from "../../utils/binary/IntegerBit";
import {mutation} from "../../utils/mutation/Mutation";
import {inversion} from "../../utils/inversion/Inversion";


export type GeneticOptions = {
    populationSize: number,
    randomizerFunction: (minimum: number, maximum: number, count: number) => number[],
    crossoverProbability: number,
    finalEpoh: number
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


export function geneticAlgorithm(options: GeneticOptions, usedFunction: FunctionOptions) {

    let interval = getInterval(usedFunction.minimum, usedFunction.maximum, usedFunction.precision);

    let currentPopulation: Population = {
        x: options.randomizerFunction(usedFunction.minimum, usedFunction.maximum, options.populationSize),
        y: options.randomizerFunction(usedFunction.minimum, usedFunction.maximum, options.populationSize)
    }

    let computedPopulation = calculatePopulationFitnessXY(interval, usedFunction.function, currentPopulation);
    console.log(`first population:${computedPopulation.fitnessPopulation}`);
    console.log(`minimum:${computedPopulation.minimum}`)

    for (let epoh = 0; epoh < options.finalEpoh; epoh++) {
        let newPopulation: Population = {
            x: [],
            y: []
        };

        while (newPopulation.x.length <= currentPopulation.y.length) {
            //select parents(panmix...) JUST FUNCTION
            const parent1:Chromosome = {
                x: currentPopulation.x[Math.floor(Math.random() * currentPopulation.x.length)],
                y: currentPopulation.y[Math.floor(Math.random() * currentPopulation.y.length)]
            }

            const parent2:Chromosome = {
                x: currentPopulation.x[Math.floor(Math.random() * currentPopulation.x.length)],
                y: currentPopulation.y[Math.floor(Math.random() * currentPopulation.y.length)]
            }

            //crossover PROBABILLITY - param and function
            //Need to consider that we choose first or second child
            const child: Chromosome = {
                x: binaryArrayToNumber(singlePointCrossover(integerToBinaryArray(parent1.x), integerToBinaryArray(parent2.x)).child2),
                y: binaryArrayToNumber(singlePointCrossover(integerToBinaryArray(parent1.y), integerToBinaryArray(parent2.y)).child2)
            }

            //mutation
            const mutateChild: Chromosome = {
                x:binaryArrayToNumber(mutation(integerToBinaryArray(child.x), 1)),
                y:binaryArrayToNumber(mutation(integerToBinaryArray(child.y), 1))
            }

            //inversion
            const inversionedChild: Chromosome = {
                x: binaryArrayToNumber(inversion(integerToBinaryArray(mutateChild.x))),
                y: binaryArrayToNumber(inversion(integerToBinaryArray(mutateChild.y)))
            }

            newPopulation.x.push(inversionedChild.x);
            newPopulation.y.push(inversionedChild.y);
        }
        console.log(`${epoh}.${newPopulation}`);
        let computedNewPopultaion = calculatePopulationFitnessXY(interval, usedFunction.function, newPopulation);
        console.log(`minimum at population:`)
        console.log(`x:${interval[newPopulation.x[computedNewPopultaion.minimum.index]]}`);
        console.log(`y:${interval[computedNewPopultaion.minimum.value]}`);

        currentPopulation = newPopulation;
    }

    return currentPopulation;
}