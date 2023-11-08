import {Chromosome, Population} from "../../alghorithms/genetic/GeneticAlghorithms";
import {randomNumberInRange} from "../random/Uniform";
import { hammingDistance} from "./Utils";
import {CalculatedPopulation} from "../fitness/Fitness";


export function outBreedingHamming(population: Population, calculatedPopulation: CalculatedPopulation | undefined, interval: number[] = []): Chromosome[] {
    console.log(interval)
    if (population.x.length !== population.y.length) throw Error("OutBreedingHamming: x and y length different");

    let elementIndex = randomNumberInRange(0, population.x.length - 1);

    let firstElement: Chromosome = {
        x: population.x[elementIndex],
        y: population.y[elementIndex]
    }

    let secondElement = {...firstElement};
    let calculatedDistanceX = hammingDistance(interval[firstElement.x], interval[secondElement.x]);
    let calculatedDistanceY = hammingDistance(interval[firstElement.y], interval[secondElement.y]);

    for (let i = 0; i < population.x.length; i++) {
        const distanceX = hammingDistance(interval[firstElement.x], interval[population.x[i]]);
        const distanceY = hammingDistance(interval[firstElement.y], interval[population.y[i]]);

        if ((calculatedDistanceX < distanceX) && (calculatedDistanceY <= distanceY)) {
            secondElement = {
                x: population.x[i],
                y: population.y[i]
            }

            calculatedDistanceX = distanceX;
            console.log("must grow X", distanceX)
        }

        if ((calculatedDistanceX <= distanceX) && (calculatedDistanceY < distanceY)) {
            secondElement = {
                x: population.x[i],
                y: population.y[i]
            }

            calculatedDistanceY = distanceY;

            console.log("must grow Y", distanceY)
        }
    }

    return [firstElement, secondElement]
}