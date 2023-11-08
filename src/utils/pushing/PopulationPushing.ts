import {Population} from "../../alghorithms/genetic/GeneticAlghorithms";
import {CalculatedPopulation} from "../fitness/Fitness";

export function elite(chromosomeFitness: number, calculatedPopulation: CalculatedPopulation): boolean {
    const sortedPopulation = calculatedPopulation.fitnessPopulation.sort();
    console.log("SORTED", sortedPopulation);
    const first25 = Math.floor(sortedPopulation.length/4);

    return chromosomeFitness <= sortedPopulation[first25];
}

export function selectionWithReplacement(chromosomeFitness: number, calculatedPopulation: CalculatedPopulation): boolean {
    const sum = calculatedPopulation.fitnessPopulation.reduce((total, currentFitness) => total + currentFitness, 0);
    const randomPoint = sum * Math.random();
    return chromosomeFitness < randomPoint;
}