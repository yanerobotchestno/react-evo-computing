import {useEffect, useState} from "react";
import {genAlgh} from "../../alghorithms/genetic/GeneticAlghorithms";
import {matyasFunction} from "../../utils/functions/Functions";
import {inBreedingEuclid, panmix} from "../../utils/selection/Selection";
import {crossoverSinglePoint} from "../../utils/crossover/Crossover";
import {mutation} from "../../utils/mutation/Mutation";
import {elite} from "../../utils/pushing/PopulationPushing";
import {inversionOperator} from "../../utils/inversion/Inversion";
import {justEpoch, stopByIterationCount} from "../../utils/stop-condition/StopCondition";
import {uniformInteger} from "../../utils/random/Uniform";

export const GenAlgoTable = ({
                                 mutationProbability = 0.1,
                                 fitnessFunction = matyasFunction,
                                 selectionFunction = panmix,
                                 crossoverProbability = 0.5,
                                 finalEpoch = 100,
                                 crossoverFunction = crossoverSinglePoint,
                                 mutationFunction = mutation,
                                 populationPushing = elite,
                                 inversionFunction = inversionOperator,
                                 populationSize = 300,
                                 constraints = {
                                     minimum: -10,
                                     maximum: 10,
                                 },
                                 stopFunction = stopByIterationCount,
                                 distance = 0.01,
                                 precision = 0.0001,
                                 inversionProbability = 0.5,
                                 arrayRandomFunction = uniformInteger,
                             }) => {
    const [result, setResult] = useState('');
    const [elapsedTime, setElapsedTime] = useState('0');

    useEffect(() => {
        const fetchData = async () => {
            const start = window.performance.now();

            const res = await genAlgh({
                mutationProbability,
                fitnessFunction,
                selectionFunction,
                crossoverProbability,
                finalEpoch,
                crossoverFunction,
                mutationFunction,
                populationPushing,
                inversionFunction,
                populationSize,
                constraints,
                stopFunction,
                distance,
                precision,
                inversionProbability,
                arrayRandomFunction,
                     }, (n: number) => {});

            const end = window.performance.now();
            const populationResult = res.population;
            const fitnessResult = res.fitnessPopulation;
            const intervalResult = res.interval;

            const resultText = `f(${intervalResult[populationResult.x[fitnessResult.minimum.index]]}, ${intervalResult[populationResult.y[fitnessResult.minimum.index]]}) = ${fitnessResult.minimum.value}`;

            setResult(resultText);
            setElapsedTime((end-start).toString());
        };

        fetchData();
    }, []);

    return (<><td>{result}</td>
    <td>{elapsedTime}</td></>);
};