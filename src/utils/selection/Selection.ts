import {Chromosome, Population} from "../../alghorithms/genetic/GeneticAlghorithms";
import {randomNumberInRange} from "../random/Uniform";
import {calculateEuclideanDistance} from "./Utils";
import {CalculatedPopulation} from "../fitness/Fitness";

export function panmix(population: Population, calculatedPopulation: CalculatedPopulation, interval: number[]): [Chromosome, Chromosome] {
    const firstChromosome = randomNumberInRange(0, population.x.length - 1);
    const secondChromosome = randomNumberInRange(0, population.y.length - 1);

    return [{
        x: population.x[firstChromosome],
        y: population.y[firstChromosome]
    }, {
        x: population.x[secondChromosome],
        y: population.y[secondChromosome]
    }]
}

export function outBreedingEuclid(population: Population, calculatedPopulation: CalculatedPopulation, interval: number[]): [Chromosome, Chromosome] {
    if (population.x.length !== population.y.length) throw Error("OutBreedingEuclid: x and y length different");

    let elementIndex = randomNumberInRange(0, population.x.length - 1);

    let firstElement: Chromosome = {
        x: population.x[elementIndex],
        y: population.y[elementIndex]
    }

    let secondElement = {...firstElement};
    let calculatedDistance = calculateEuclideanDistance(secondElement.x, secondElement.y, firstElement.x, firstElement.y);

    // let maximum: Chromosome = {x: population.x[0], y: population.y[0]}
    // let minimum: Chromosome = {x: population.x[0], y: population.y[0]}


    //TODO: optimize loop
    for (let i = 0; i < population.x.length; i++) {
        const distance = calculateEuclideanDistance(firstElement.x, firstElement.y, population.x[i], population.y[i]);

        if (calculatedDistance < distance) {
            secondElement = {
                x: population.x[i],
                y: population.y[i]
            }

            calculatedDistance = distance;
            // console.log("must grow", distance)
        }
    }

    // console.log("FINDED!");
    // console.log(firstElement);
    // console.log(secondElement);
    // console.log(calculateEuclideanDistance(firstElement.x, firstElement.y, secondElement.x, secondElement.y));
    // console.log("OUTBREEDING")
    // console.log(minimum);
    // console.log(calculateEuclideanDistance(firstElement.x, firstElement.y, minimum.x, minimum.y));
    // console.log(maximum);
    // console.log(calculateEuclideanDistance(firstElement.x, firstElement.y, maximum.x, maximum.y));
    // console.log("OUTBREEDING")

    return [firstElement, secondElement]
}


export function inBreedingEuclid(population: Population, calculatedPopulation: CalculatedPopulation, interval: number[]): [Chromosome, Chromosome] {
    if (population.x.length !== population.y.length) throw Error("InBreedingEuclid: x and y length different");

    let elementIndex = randomNumberInRange(0, population.x.length - 1);

    let firstElement: Chromosome = {
        x: population.x[elementIndex],
        y: population.y[elementIndex]
    }

    let secondElement = {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER};
    let calculatedDistance = calculateEuclideanDistance(secondElement.x, secondElement.y, firstElement.x, firstElement.y);

    for (let i = 0; i < population.x.length; i++) {
        if ((population.x[i] === firstElement.x) && (population.y[i] === firstElement.y)) {
            continue;
        }

        const distance = calculateEuclideanDistance(firstElement.x, firstElement.y, population.x[i], population.y[i]);

        if (calculatedDistance > distance) {
            secondElement = {
                x: population.x[i],
                y: population.y[i]
            }

            calculatedDistance = distance;
            // console.log("must down", distance)
        }
    }

    // console.log("FINDED!");
    // console.log(firstElement);
    // console.log(secondElement);
    // console.log(calculateEuclideanDistance(firstElement.x, firstElement.y, secondElement.x, secondElement.y));
    // console.log("INBREEDING")

    return [firstElement, secondElement]
}

export function selection(population: Population, calculatedPopulation: CalculatedPopulation, interval: number[]): [Chromosome, Chromosome] {
    const parent1: Chromosome = {
        x: population.x[calculatedPopulation.minimum.index],
        y: population.y[calculatedPopulation.minimum.index]
    };

    let parent2: Chromosome = {
        x: population.x[0],
        y: population.y[0]
    };

    let parent2Computed = calculatedPopulation.calculatedPopulation[0];

    const mediumFitness = (calculatedPopulation.maximum.value + calculatedPopulation.minimum.value) / 2;

    // for (let i = 0; i < calculatedPopulation.fitnessPopulation.length; i++) {
    //     if ((population.x[i] === parent1.x) && (population.y[i] === parent1.y)) {
    //         continue;
    //     }
    //
    //     if (calculatedPopulation.fitnessPopulation[i] < parent2Computed) {
    //         parent2Computed = calculatedPopulation.fitnessPopulation[i];
    //         parent2 = {
    //             x: population.x[i],
    //             y: population.y[i]
    //         }
    //     }
    // }
    let i = randomNumberInRange(0, population.x.length-1);

    while(calculatedPopulation.calculatedPopulation[i] < mediumFitness){
        if ((population.x[i] === parent1.x) && (population.y[i] === parent1.y)) {
            i = randomNumberInRange(0, population.x.length-1);
            continue;
        }

        if (calculatedPopulation.calculatedPopulation[i] < mediumFitness) {
            parent2Computed = calculatedPopulation.calculatedPopulation[i];
            parent2 = {
                x: population.x[i],
                y: population.y[i]
            }
            break;
        }

        i = randomNumberInRange(0, population.x.length-1);
    }

    // console.log("SELECTION")
    // console.log(interval[parent1.x])
    // console.log(interval[parent1.y])
    // console.log(interval[parent2.x])
    // console.log(interval[parent2.y])

    return [parent1, parent2];
}
