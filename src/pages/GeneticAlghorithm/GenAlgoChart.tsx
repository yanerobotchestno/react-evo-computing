import {FC, useEffect, useMemo, useState} from "react";
import {genAlgh} from "../../alghorithms/genetic/GeneticAlghorithms";
import {matyasFunction} from "../../utils/functions/Functions";
import {inBreedingEuclid, panmix} from "../../utils/selection/Selection";
import {crossoverSinglePoint} from "../../utils/crossover/Crossover";
import {mutation} from "../../utils/mutation/Mutation";
import {elite, selectionWithReplacement} from "../../utils/pushing/PopulationPushing";
import {inversionOperator} from "../../utils/inversion/Inversion";
import {justEpoch, stopByIterationCount} from "../../utils/stop-condition/StopCondition";
import {uniformInteger} from "../../utils/random/Uniform";
import {Line} from "react-chartjs-2";
import {AxisOptions, Chart} from 'react-charts';
import ResizableBox from "./ResizableBox";


export const GenAlgoChart = ({
                                 mutationProbability = 0.001,
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
                                 stopFunction = justEpoch,
                                 distance = 0.01,
                                 precision = 0.0001,
                                 inversionProbability = 0.5,
                                 arrayRandomFunction = uniformInteger,
                             }) => {
    const [result, setResult] = useState('');
    const [elapsedTime, setElapsedTime] = useState('0');
    const [chartData, setChartData] = useState({
        minimum: [8],
        populationIndex: [8]
    });

    useEffect(() => {
        const fetchData = async () => {
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
            }, (n: number) => {
            });

            const end = window.performance.now();
            const populationResult = res.population;
            const fitnessResult = res.fitnessPopulation;
            const intervalResult = res.interval;
            //const resultText = `f(${intervalResult[populationResult.x[fitnessResult.minimum.index]]}, ${intervalResult[populationResult.y[fitnessResult.minimum.index]]}) = ${fitnessResult.minimum.value}`;
            return res.chartData;
        };

        fetchData().then(r => {
            setChartData(r);
        });
    }, []);


    const data: {
        data: {
            primary: number,
            secondary: number,
            radius: number
        }[]
    }[] = [
        {
            data: []
        }
    ];
    console.log("PopInd", chartData.populationIndex);
    console.log("Min", chartData.minimum);

    for (let i = 0; i < chartData.populationIndex.length; i++) {
        data[0].data.push({
            secondary: chartData.minimum[i],
            primary: chartData.populationIndex[i],
            radius: 4
        })
    }

    const primaryAxis = useMemo<
        AxisOptions<typeof data[number]["data"][number]>
    >(
        () => ({
            getValue: (datum) => datum.primary
        }),
        []
    );

    const secondaryAxes = useMemo<
        AxisOptions<typeof data[number]["data"][number]>[]
    >(
        () => [
            {
                getValue: (datum) => datum.secondary
            }
        ],
        []
    );


    return (<>
        <>
            <br/>
            <br/>
            <ResizableBox>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes
                    }}
                />
            </ResizableBox>
        </>
    </>);

};