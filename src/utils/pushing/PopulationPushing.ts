import {CalculatedPopulation} from "../fitness/Fitness";

export function standardSelection(chromosomeFitness: number, calculatedPopulation: CalculatedPopulation): boolean {
    const randomPoint = Math.random() * calculatedPopulation.calculatedPopulation.reduce((sum, current) => sum + current, 0);
    return chromosomeFitness >= randomPoint;
}

export function elite(chromosomeFitness: number, calculatedPopulation: CalculatedPopulation): boolean {
    const sortedPopulation = calculatedPopulation.sortedFitnessPopulation;
    //console.log("SORTED", sortedPopulation);
    const first25 = Math.floor(sortedPopulation.length/4);
    return chromosomeFitness <= sortedPopulation[first25];
}

export function selectionWithReplacement(chromosomeFitness: number, calculatedPopulation: CalculatedPopulation): boolean {
    const index = calculatedPopulation.calculatedPopulation.findIndex(fitness => fitness === chromosomeFitness);
    return index === -1;

    // const sum = (calculatedPopulation.calculatedPopulation.reduce((total, currentFitness) => total + currentFitness, 0))//calculatedPopulation.calculatedPopulation.length;
    // const randomPoint = ((sum/calculatedPopulation.calculatedPopulation.length) * Math.random());
    //
    // if((chromosomeFitness < randomPoint) && (calculatedPopulation.sortedFitnessPopulation.findIndex(fitness => fitness === chromosomeFitness) === -1)){
    //     console.log("RandomPoint",randomPoint,"Sum",sum,"TrueSum",sum/calculatedPopulation.calculatedPopulation.length);
    //     return true;
    // }
    // return false;
}