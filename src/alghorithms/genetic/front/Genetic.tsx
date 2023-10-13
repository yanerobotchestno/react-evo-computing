import "./Genetic.css"
import {FunctionOptions, geneticAlgorithm, GeneticOptions} from "../GeneticAlghorithms";
import {uniformInteger} from "../../../utils/random/Uniform";
import {matyasFunction} from "../../../utils/functions/Functions";



const genetic: GeneticOptions = {
    crossoverProbability: 1,
    finalEpoh:300,
    populationSize:100,
    randomizerFunction: uniformInteger
}

const functionOptions: FunctionOptions = {
    function: matyasFunction,
    maximum: 10,
    minimum: -10,
    precision:0.0001
}

export function Genetic() {
    geneticAlgorithm(genetic, functionOptions)
    return <div className="Genetic">
        GeneticAlgo
    </div>
}