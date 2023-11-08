import {Population} from "../../alghorithms/genetic/GeneticAlghorithms";
import {calculateEuclideanDistance} from "../selection/Utils";
import {CalculatedPopulation} from "../fitness/Fitness";

export function stopByIterationCount(maxEpoch: number, currentEpoch: number, distance: number, population: Population, calculatedPopulation: CalculatedPopulation, newCalculatedPopulation: CalculatedPopulation): boolean {
    return currentEpoch < maxEpoch;
}

export function parentDistance(epoch: number, currentEpoch: number, distance: number, population: Population, calculatedPopulation: CalculatedPopulation, newCalculatedPopulation: CalculatedPopulation): boolean {
    let condition = true;

    for (let i = 1; i < population.x.length; i++) {
        if (calculateEuclideanDistance(population.x[i - 1], population.y[i - 1], population.x[i], population.y[i]) > distance) {
            condition = false;
        }
    }

    return condition;
}


export function populationDistance(epoch: number, currentEpoch: number, distance: number, population: Population, calculatedPopulation: CalculatedPopulation, newCalculatedPopulation: CalculatedPopulation): boolean {
    let condition = true;

    const firstPopulation = (calculatedPopulation.maximum.value + calculatedPopulation.minimum.value) / 2;
    const secondPopulation = (newCalculatedPopulation.maximum.value + newCalculatedPopulation.minimum.value) / 2;

    if (Math.abs(firstPopulation - secondPopulation) > distance) {
        condition = false;
    }

    return condition;
}


export function justEpoch(epoch: number, currentEpoch: number, distance: number, population: Population, calculatedPopulation: CalculatedPopulation, newCalculatedPopulation: CalculatedPopulation): boolean {
    return true;
}
