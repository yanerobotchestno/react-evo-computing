import "./Genetic.css"
import {genAlgh, GeneticParams} from "../GeneticAlghorithms";
import {uniformInteger} from "../../../utils/random/Uniform";
import {matyasFunction} from "../../../utils/functions/Functions";
import {inversionOperator} from "../../../utils/inversion/Inversion";
import {mutation} from "../../../utils/mutation/Mutation";
import {crossoverSinglePoint} from "../../../utils/crossover/Crossover";
import {selection} from "../../../utils/selection/Selection";
import {selectionWithReplacement} from "../../../utils/pushing/PopulationPushing";
import {justEpoch} from "../../../utils/stop-condition/StopCondition";


const params: GeneticParams = {
    populationSize: 300,
    constraints: {
        maximum: 10,
        minimum: -10
    },
    arrayRandomFunction: uniformInteger,
    precision: 0.001,
    fitnessFunction: matyasFunction,
    selectionFunction: selection,
    crossoverFunction: crossoverSinglePoint,
    mutationProbability: 0.5,
    crossoverProbability: 0.5,
    inversionFunction: inversionOperator,
    mutationFunction: mutation,
    inversionProbability: 0.5,
    finalEpoch: 30,
    populationPushing: selectionWithReplacement,
    distance: 1,
    stopFunction: justEpoch
}

export function Genetic() {
//     //geneticAlgorithm(genetic, functionOptions)
//     const startTime = performance.now();
//
//     genAlgh(params)
//
//     const endTime = performance.now();
//
//     const duration = endTime - startTime;
//
// // Преобразование времени выполнения в минуты и секунды
//     const minutes = Math.floor(duration / 60000);
//     const remainingSeconds = (duration % 60000) / 1000;
//
//     console.log(`Время выполнения: ${minutes} минут ${remainingSeconds} секунд`);

    return (<div className="Genetic">
        GeneticAlgo
    </div>)
}