import {chromosomeCrossover} from "../../../utils/crossover/Crossover";
import {Chromosome, GeneticParams, Population} from "../GeneticAlghorithms";
import {CalculatedPopulation} from "../../../utils/fitness/Fitness";
import {
    getCrossoverFunction, getInversionFunction,
    getMutationFunction, getPopulationPushingFunction,
    getSelectionFunction, getTestFunction
} from "../../../pages/GeneticAlghorithm/GeneticAlghorithm";

const work = (populationPushingName: string, fitnessFunctionName: string,
              inversionFunctionName: string, mutationFunctionName: string, selectionFunctionName: string,
              crossoverFunctionName: string, crossoverProbability: number, mutationProbability: number,
              population: Population, fitnessPopulation: CalculatedPopulation, interval: number[]) => {
    const selectedParents = getSelectionFunction(selectionFunctionName)(population, fitnessPopulation, interval);

    const childIndex = (Math.random() <= 0.5) ? 0 : 1;
    const crossoverResult = (Math.random() < crossoverProbability) ? selectedParents[childIndex] : chromosomeCrossover(selectedParents, getCrossoverFunction(crossoverFunctionName))[childIndex];

    const mutationResult = (Math.random() < mutationProbability) ? crossoverResult :
        {
            x: getMutationFunction(mutationFunctionName)(crossoverResult.x),
            y: getMutationFunction(mutationFunctionName)(crossoverResult.y)
        }

    const inversionResult: Chromosome = (Math.random() < mutationProbability) ? mutationResult :
        {
            x: getInversionFunction(inversionFunctionName)(mutationResult.x),
            y: getInversionFunction(inversionFunctionName)(mutationResult.y)
        }

    const fitnessMember = getTestFunction(fitnessFunctionName)(interval[inversionResult.x], interval[inversionResult.y]);

    if (getPopulationPushingFunction(populationPushingName)(fitnessMember, fitnessPopulation)) {
        return [inversionResult.x, inversionResult.y]
    }
}

export default () => {
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener('message', e => {
        // eslint-disable-line no-restricted-globals
        if (!e) return;

        const {populationPushingName, fitnessFunctionName,
            inversionFunctionName, mutationFunctionName, selectionFunctionName,
            crossoverFunctionName, crossoverProbability, mutationProbability,
            population, fitnessPopulation, interval

        } = e.data as {
            populationPushingName: string, fitnessFunctionName: string,
            inversionFunctionName: string, mutationFunctionName: string, selectionFunctionName: string,
            crossoverFunctionName: string, crossoverProbability: number, mutationProbability: number,
            population: Population, fitnessPopulation: CalculatedPopulation, interval: number[]
        };

        console.log(populationPushingName, fitnessFunctionName,
            inversionFunctionName, mutationFunctionName, selectionFunctionName,
            crossoverFunctionName, crossoverProbability, mutationProbability,
            population, fitnessPopulation, interval);
    })
}
