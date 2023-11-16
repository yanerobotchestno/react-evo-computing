import {
    Container,
    Row,
    Col,
    Form,
    Dropdown,
    Image,
    Accordion, Button, ProgressBar, Table
} from "react-bootstrap";
import "./GeneticAlghorithm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {ReactNode, useState} from "react";
import {genAlgh, GeneticParams, Population} from "../../alghorithms/genetic/GeneticAlghorithms";
import {crossoverDualPoint, crossoverSinglePoint} from "../../utils/crossover/Crossover";
import {uniformInteger} from "../../utils/random/Uniform";
import {bukin6, matyasFunction, schaffer2} from "../../utils/functions/Functions";
import {inBreedingEuclid, outBreedingEuclid, panmix, selection} from "../../utils/selection/Selection";
import {inversionOperator} from "../../utils/inversion/Inversion";
import {mutation} from "../../utils/mutation/Mutation";
import {elite, selectionWithReplacement, standardSelection} from "../../utils/pushing/PopulationPushing";
import {
    justEpoch,
    parentDistance,
    populationDistance,
    stopByIterationCount
} from "../../utils/stop-condition/StopCondition";
import {decreaseToSmallestDecimal} from "../../utils/binary/FloatBin";
import {normaliseArray} from "../../utils/random/NormalDistribution";
import {CalculatedPopulation} from "../../utils/fitness/Fitness";
import {GenAlgoTable} from "./GenAlgoTable";
import {distanceBetweenPoints} from "chart.js/helpers";
import {GenAlgoChart} from "./GenAlgoChart";
import {MyKek} from "./MyKek";


export function getStopFunction(name: string) {
    switch (name) {
        case "epoch": {
            return justEpoch;
        }

        case justEpoch.name: {
            return justEpoch;
        }

        case "populationDistance": {
            return populationDistance;
        }

        case populationDistance.name: {
            return populationDistance;
        }

        case "parentDistance": {
            return parentDistance;
        }

        case parentDistance.name: {
            return parentDistance;
        }

        case "stopByIterationCount": {
            return stopByIterationCount;
        }

        case stopByIterationCount.name: {
            return stopByIterationCount;
        }

        default: {
            return stopByIterationCount;
        }
    }
}

export function getInversionFunction(name: string) {
    switch (name) {
        case "Classic": {
            return inversionOperator;
        }

        case inversionOperator.name: {
            return inversionOperator;
        }

        default: {
            return inversionOperator;
        }
    }
}

export function getMutationFunction(name: string) {
    switch (name) {
        case "Classic": {
            return mutation;
        }

        case mutation.name: {
            return mutation;
        }

        default: {
            return mutation;
        }
    }
}

export function getPopulationPushingFunction(name: string) {
    switch (name) {
        case "SelectionWithReplacement": {
            return selectionWithReplacement;
        }

        case "Elite": {
            return elite;
        }

        case elite.name : {
            return elite;
        }

        default: {
            return elite;
        }
    }
}

export function getArrayRandomFunction(name: string) {
    switch (name) {
        case "Normal": {
            return normaliseArray;
        }

        case normaliseArray.name: {
            return normaliseArray;
        }

        case "Uniform": {
            return uniformInteger;
        }

        case uniformInteger.name : {
            return uniformInteger;
        }

        default: {
            return uniformInteger;
        }
    }
}

export function getCrossoverFunction(name: string) {
    switch (name) {
        case "CrossoverSinglePoint": {
            return crossoverSinglePoint;
        }

        case crossoverSinglePoint.name: {
            return crossoverSinglePoint;
        }

        case crossoverDualPoint.name: {
            return crossoverDualPoint;
        }

        case "CrossoverDualPoint": {
            return crossoverDualPoint;
        }

        default: {
            return crossoverSinglePoint;
        }
    }
}

export function getTestFunction(name: string) {
    switch (name) {
        case "Matyas": {
            return matyasFunction;
        }

        case matyasFunction.name: {
            return matyasFunction;
        }

        case "schaffer2": {
            return schaffer2;
        }

        case "bukin6": {
            return bukin6;
        }

        default: {
            return matyasFunction;
        }
    }
}


export function getSelectionFunction(name: string) {
    switch (name) {
        case "Panmixia": {
            return panmix;
        }

        case panmix.name : {
            return panmix;
        }

        case "Outbreeding": {
            return outBreedingEuclid;
        }

        case outBreedingEuclid.name: {
            return outBreedingEuclid;
        }

        case "Inbreeding": {
            return inBreedingEuclid;
        }

        case inBreedingEuclid.name: {
            return inBreedingEuclid;
        }

        case "Selection": {
            return selection;
        }

        case selection.name: {
            return selection;
        }

        default: {
            return panmix;
        }
    }
}

const convertMillisecondsToHMS = (milliseconds: number) => ({
    hours: Math.floor(milliseconds / 3600000),
    minutes: Math.floor((milliseconds % 3600000) / 60000),
    seconds: Math.floor((milliseconds % 60000) / 1000),
});

export default function GeneticAlghorithm() {
    const [populationSize, setPopulationSize] = useState('3');
    const [constraintsMinimum, setConstraintsMinimum] = useState('-10');
    const [constraintsMaximum, setConstraintsMaximum] = useState('10');
    const [precision, setPrecision] = useState('0.0001');
    const [arrayRandomFunctionName, setArrayRandomFunctionName] = useState('Uniform');
    const [testFunctionName, setTestFunctionName] = useState('Matyas');
    const [selectionFunctionName, setSelectionFunctionName] = useState('Panmixia');
    const [crossoverFunctionName, setCrossoverFunctionName] = useState('CrossoverSinglePoint');
    const [mutationProbability, setMutationProbability] = useState('0.01');
    const [crossoverProbability, setCrossoverProbability] = useState('0.01');
    const [inversionProbability, setInversionProbability] = useState('0.1');
    const [finalEpoch, setFinalEpoch] = useState('30');
    const [distance, setDistance] = useState('0.5');
    const [inversionFunctionName, setInversionFunctionName] = useState('Classic');
    const [mutationFunctionName, setMutationFunctionName] = useState('Classic');
    const [populationPushingName, setPopulationPushingName] = useState('Elite');
    const [stopFunctionName, setStopFunctionName] = useState('epoch');
    const [resultString, setResultString] = useState('');
    const [progress, setProgress] = useState(0);
    const [usedTime, setUsedTime] = useState(0);
    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        // if (event.key === 'Enter') {
        //     event.preventDefault();
        // }
        // if (event.key === 'e') {
        //     event.preventDefault();
        // }
    };


    const getParams = React.useCallback(() => ({
        populationSize: Number(populationSize), //V
        constraints: {
            maximum: Number(constraintsMaximum), //V
            minimum: Number(constraintsMinimum) //V
        },
        arrayRandomFunction: getArrayRandomFunction(arrayRandomFunctionName), //V
        precision: Number(precision), //V
        fitnessFunction: getTestFunction(testFunctionName), //V
        selectionFunction: getSelectionFunction(selectionFunctionName), //V
        crossoverFunction: getCrossoverFunction(crossoverFunctionName), //v
        mutationProbability: Number(mutationProbability), //V
        crossoverProbability: Number(crossoverProbability), //V
        inversionProbability: Number(inversionProbability), //V
        finalEpoch: Number(finalEpoch), //V
        distance: Number(distance), //V
        inversionFunction: getInversionFunction(inversionFunctionName), //V
        mutationFunction: getMutationFunction(mutationFunctionName), //V
        populationPushing: getPopulationPushingFunction(populationPushingName), //V
        stopFunction: getStopFunction(stopFunctionName)
    }), [arrayRandomFunctionName, constraintsMaximum, constraintsMinimum, crossoverFunctionName, crossoverProbability, distance, finalEpoch, inversionFunctionName, inversionProbability, mutationFunctionName, mutationProbability, populationPushingName, populationSize, precision, selectionFunctionName, stopFunctionName, testFunctionName]);

    const setGAResult = React.useCallback(() => {
        //console.time("GA_START");
        const start = window.performance.now();
        genAlgh(getParams(), setProgress).then((res) => {
            setUsedTime(window.performance.now() - start);
            //console.timeEnd("GA_START");
            let populationResult = res.population;
            let fitnessResult = res.fitnessPopulation;
            let intervalResult = res.interval;
            const result = `Result: f(${intervalResult[populationResult.x[fitnessResult.minimum.index]]}, ${intervalResult[populationResult.y[fitnessResult.minimum.index]]}) = ${fitnessResult.minimum.value}`;
            setResultString(result);
            console.log(result)
        });
    }, [getParams, setResultString]);

    return (<>
        <div className="MainGA">
            <Row>
            <Col>
                <div className="FirstContainer">
                    <Container>
                        <Row><h1 style={{textAlign: "center"}}>Genetic Algorithm</h1></Row>
                        <Row className="precision-window">
                            <Col>
                                <Dropdown>
                                    <h3>Test Function</h3>
                                    <Form.Label>Selected: {testFunctionName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Test Function
                                    </Dropdown.Toggle>

                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setTestFunctionName('Matyas');
                                        }}>
                                            Matyas
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setTestFunctionName('schaffer2');
                                        }}>
                                            schaffer2
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setTestFunctionName('bukin6');
                                        }}>
                                            bukin6
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <h3>Precision</h3>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={precision}
                                        step={decreaseToSmallestDecimal(parseFloat(precision))}
                                        onChange={(e) => setPrecision(e.target.value)}/>
                                    <br/>
                                    {precision}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="SelectionFunction">
                                <Dropdown>
                                    <h3>Selection Function</h3>
                                    <Form.Label>Selected: {selectionFunctionName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Selection Function
                                    </Dropdown.Toggle>
                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setSelectionFunctionName('Panmixia');
                                        }}>Panmixia
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setSelectionFunctionName('Outbreeding');
                                        }}>Outbreeding
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setSelectionFunctionName('Inbreeding');
                                        }}>Inbreeding
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setSelectionFunctionName('Selection');
                                        }}>Selection
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Form>
                                    <Form.Group className="ps-counter">
                                        <Form.Label><h3>Population Size</h3></Form.Label>
                                        <br/>
                                        <input
                                            type="number"
                                            onKeyDown={handleKeyPress}
                                            value={populationSize}
                                            onChange={(e) => {
                                                setPopulationSize(e.target.value);
                                            }}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="array-random-function">
                                <Col>
                                    <>
                                        <Form.Label><h3>Array random function</h3></Form.Label>

                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Distribution types</Accordion.Header>
                                                <Accordion.Body>
                                                    <Image style={{width: "100%", height: "100%"}}
                                                           src="https://rovdownloads.com/blog/wp-content/uploads/2014/06/PROBABILITY-DISTRIBUTIONS-MOST-COMMONLY-USED.png"></Image>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>

                                        <Dropdown>
                                            <Form.Label>Selected: {arrayRandomFunctionName}</Form.Label>
                                            <br/>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Array random function
                                            </Dropdown.Toggle>

                                            <br></br>
                                            <Dropdown.Menu>
                                                <Dropdown.Item type="button" onClick={(e) => {
                                                    setArrayRandomFunctionName('Uniform');

                                                }}>Uniform</Dropdown.Item>
                                                <Dropdown.Item type="button" onClick={(e) => {
                                                    setArrayRandomFunctionName('Normal');
                                                }}>Normal</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                </Col>
                            </Col>
                            <Col>
                                <Form className="cons-container">
                                    <Form.Group>
                                        <Form.Label><h3>Constraints</h3></Form.Label>
                                        <br/>
                                        <Form.Label>Minimum:</Form.Label>
                                        <input
                                            type="number"
                                            onKeyDown={handleKeyPress}
                                            defaultValue={constraintsMinimum}
                                            style={{marginLeft: "10px"}}
                                            onChange={(e) => setConstraintsMinimum(e.target.value)}/>
                                        <br/>
                                        <Form.Label>Maximum: </Form.Label>
                                        <input
                                            type="number"
                                            onKeyDown={handleKeyPress}
                                            defaultValue={constraintsMaximum}
                                            style={{marginLeft: "10px", marginTop: "10px"}}
                                            onChange={(e) => setConstraintsMaximum(e.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="crossover-opt">
                            <Col>
                                <Dropdown>
                                    <h3>Crossover Function</h3>
                                    <Form.Label>Selected: {crossoverFunctionName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Crossover Function
                                    </Dropdown.Toggle>
                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setCrossoverFunctionName('CrossoverSinglePoint');
                                        }}>Single Point
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setCrossoverFunctionName('CrossoverDualPoint');
                                        }}>Dual Point
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <h3>Crossover Probability</h3>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={crossoverProbability}
                                        step={decreaseToSmallestDecimal(parseFloat(crossoverProbability))}
                                        onChange={(e) => setCrossoverProbability(e.target.value)}/>
                                    <br/>
                                    {crossoverProbability}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mutation-window">
                            <Col>
                                <Dropdown>
                                    <h3>Mutation Function</h3>
                                    <Form.Label>Selected: {mutationFunctionName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Mutation
                                    </Dropdown.Toggle>
                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setMutationFunctionName('Classic');
                                        }}>Classic
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <h3>Mutation Probability</h3>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={mutationProbability}
                                        step={decreaseToSmallestDecimal(parseFloat(mutationProbability))}
                                        onChange={(e) => setMutationProbability(e.target.value)}/>
                                    <br/>
                                    {mutationProbability}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="inversion-window">
                            <Col>
                                <Dropdown>
                                    <h3>Inversion Function</h3>
                                    <Form.Label>Selected: {inversionFunctionName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Inversion
                                    </Dropdown.Toggle>
                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setInversionFunctionName('Classic');
                                        }}>Classic
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <h3>Inversion Probability</h3>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={inversionProbability}
                                        step={decreaseToSmallestDecimal(parseFloat(inversionProbability))}
                                        onChange={(e) => setInversionProbability(e.target.value)}/>
                                    <br/>
                                    {inversionProbability}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="epoch-window">
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <h3>Distance</h3>
                                        <p>Used for stop criteria</p>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={distance}
                                        step={decreaseToSmallestDecimal(parseFloat(distance))}
                                        onChange={(e) => setDistance(e.target.value)}/>
                                    <br/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>
                                        <h3>Epoch Count</h3>
                                        <p>Set the number of final epoch</p>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={finalEpoch}
                                        step={1}
                                        onChange={(e) => setFinalEpoch(e.target.value)}/>
                                    <br/>
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className="stop-criteria-window">
                            <Col>
                                <Dropdown>
                                    <h3>Pushing Function</h3>
                                    <Form.Label>Selected: {populationPushingName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Population Pushing Name
                                    </Dropdown.Toggle>
                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setPopulationPushingName('SelectionWithReplacement');
                                        }}>Selection With Replacement
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setPopulationPushingName('Elite');
                                        }}>Elite
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <h3>Stop criteria</h3>
                                    <Form.Label>Selected: {stopFunctionName}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Stop criteria
                                    </Dropdown.Toggle>
                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setStopFunctionName('epoch');
                                        }}>Epoch
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setStopFunctionName('populationDistance');
                                        }}>Distance between populations
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setStopFunctionName('parentDistance');
                                        }}>ParentDistance
                                        </Dropdown.Item>

                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setStopFunctionName('stopByIterationCount');
                                        }}>StopByIterationCount
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

                        <Row className="submit-button">
                            <Button onClick={setGAResult}>Submit</Button>
                            <br/>

                            <ProgressBar animated min={0} max={Number(finalEpoch)} now={progress}
                                         style={{marginTop: 20}}/>

                        </Row>
                        <Row>
                            <h4>{resultString}</h4>
                            <h5>Used time: {(usedTime / 1000).toFixed(3)}s</h5>
                        </Row>
                    </Container>
                </div>

                <Row>
                    <Col>
                    <div className="res-table">
                        <h3 style={{paddingTop:"10%"}}>Matyas function</h3>
                        <p>Matyas/Population:300/CrossoverSP(0.5)/Inversion(0.25)</p>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Mutation</th>
                                <th>Solve</th>
                                <th>Time(ms)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>M1</td>
                                    <GenAlgoTable finalEpoch={0.001}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>M2</td>
                                <GenAlgoTable finalEpoch={0.05}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>M3</td>
                                <GenAlgoTable finalEpoch={0.01}></GenAlgoTable>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    </Col>
                    </Row>
                <Row>
                    <Col>
                    <Container className="res-table">

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Crossover</th>
                                <th>Solve</th>
                                <th>Time(ms)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>SP</td>
                                <GenAlgoTable crossoverFunction={crossoverSinglePoint}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>DP</td>
                                <GenAlgoTable crossoverFunction={crossoverDualPoint}></GenAlgoTable>
                            </tr>
                            </tbody>
                        </Table>
                    </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className="res-table">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Parent selection</th>
                                <th>Solve</th>
                                <th>Time(ms)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Inbreeding</td>
                                <GenAlgoTable selectionFunction={inBreedingEuclid}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>Outbreeding</td>
                                <GenAlgoTable selectionFunction={outBreedingEuclid}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>Panmixia</td>
                                <GenAlgoTable selectionFunction={panmix}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>Selection</td>
                                <GenAlgoTable selectionFunction={selection}></GenAlgoTable>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    </Col>
                    </Row>
                <Row>
                    <Col>
                    <div className="res-table">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Generating the population</th>
                                <th>Solve</th>
                                <th>Time(ms)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Standard</td>
                                <GenAlgoTable populationPushing={standardSelection}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>Selection with replacement</td>
                                <GenAlgoTable populationPushing={selectionWithReplacement}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>Elite</td>
                                <GenAlgoTable populationPushing={elite}></GenAlgoTable>
                            </tr>
                            </tbody>
                        </Table>
                    </div>

                    </Col>
                    </Row>
                <Row>
                    <Col>
                    <div className="res-table">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Stop criteria</th>
                                <th>Solve</th>
                                <th>Time(ms)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Iteration(Epoch)</td>
                                <GenAlgoTable stopFunction={stopByIterationCount}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>Member distance</td>
                                <GenAlgoTable stopFunction={parentDistance}></GenAlgoTable>
                            </tr>
                            <tr>
                                <td>VF(Population distance)</td>
                                <GenAlgoTable stopFunction={populationDistance}></GenAlgoTable>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row><Col><GenAlgoChart></GenAlgoChart></Col></Row>
                        <Row><Col><p>Matyas, epoch =100, mutationProbability = 0.001</p></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row><Col><GenAlgoChart crossoverFunction={crossoverDualPoint}></GenAlgoChart></Col></Row>
                        <Row><Col><p>Matyas, epoch =100, mutationProbability = 0.001, crossoverDualPoint</p></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row><Col><GenAlgoChart></GenAlgoChart></Col></Row>
                        <Row><Col><p>Matyas, epoch =100, mutationProbability = 0.001, crossoverDualPoint, Selection: panmixia</p></Col></Row>
                    </Col>
                </Row>

                {/**/}
                    <Row>
                        <Col>
                            <div className="res-table">
                                <h3 style={{paddingTop:"10%"}}>Schaffer2 function</h3>
                                <p>Schaffer2/Population:300/CrossoverSP(0.5)/Inversion(0.25)</p>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Mutation</th>
                                        <th>Solve</th>
                                        <th>Time(ms)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>M1</td>
                                        <GenAlgoTable fitnessFunction={schaffer2} finalEpoch={0.001}></GenAlgoTable>
                                    </tr>
                                    <tr>
                                        <td>M2</td>
                                        <GenAlgoTable fitnessFunction={schaffer2} finalEpoch={0.05}></GenAlgoTable>
                                    </tr>
                                    <tr>
                                        <td>M3</td>
                                        <GenAlgoTable fitnessFunction={schaffer2} finalEpoch={0.01}></GenAlgoTable>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                    <Container className="res-table">

                    <Table striped bordered hover>
                    <thead>
                    <tr>
                    <th>Crossover</th>
                    <th>Solve</th>
                    <th>Time(ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>SP</td>
                    <GenAlgoTable fitnessFunction={schaffer2} crossoverFunction={crossoverSinglePoint}></GenAlgoTable>
            </tr>
            <tr>
                <td>DP</td>
                <GenAlgoTable fitnessFunction={schaffer2} crossoverFunction={crossoverDualPoint}></GenAlgoTable>
            </tr>
        </tbody>
    </Table>
</Container>
</Col>
</Row>
    <Row>
        <Col>
            <div className="res-table">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Parent selection</th>
                        <th>Solve</th>
                        <th>Time(ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Inbreeding</td>
                        <GenAlgoTable fitnessFunction={schaffer2} selectionFunction={inBreedingEuclid}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>Outbreeding</td>
                        <GenAlgoTable fitnessFunction={schaffer2} selectionFunction={outBreedingEuclid}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>Panmixia</td>
                        <GenAlgoTable fitnessFunction={schaffer2} selectionFunction={panmix}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>Selection</td>
                        <GenAlgoTable fitnessFunction={schaffer2} selectionFunction={selection}></GenAlgoTable>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Col>
    </Row>
    <Row>
        <Col>
            <div className="res-table">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Generating the population</th>
                        <th>Solve</th>
                        <th>Time(ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Standard</td>
                        <GenAlgoTable fitnessFunction={schaffer2} populationPushing={standardSelection}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>Selection with replacement</td>
                        <GenAlgoTable fitnessFunction={schaffer2} populationPushing={selectionWithReplacement}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>Elite</td>
                        <GenAlgoTable fitnessFunction={schaffer2} populationPushing={elite}></GenAlgoTable>
                    </tr>
                    </tbody>
                </Table>
            </div>

        </Col>
    </Row>
    <Row>
        <Col>
            <div className="res-table">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Stop criteria</th>
                        <th>Solve</th>
                        <th>Time(ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Iteration(Epoch)</td>
                        <GenAlgoTable fitnessFunction={schaffer2} stopFunction={stopByIterationCount}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>Member distance</td>
                        <GenAlgoTable fitnessFunction={schaffer2} stopFunction={parentDistance}></GenAlgoTable>
                    </tr>
                    <tr>
                        <td>VF(Population distance)</td>
                        <GenAlgoTable fitnessFunction={schaffer2} stopFunction={populationDistance}></GenAlgoTable>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </Col>
    </Row>
    <Row>
        <Col>
            <Row><Col><GenAlgoChart fitnessFunction={schaffer2} ></GenAlgoChart></Col></Row>
            <Row><Col><p>Schaffer2, epoch =100, mutationProbability = 0.001</p></Col></Row>
        </Col>
    </Row>
    <Row>
        <Col>
            <Row><Col><GenAlgoChart fitnessFunction={schaffer2} crossoverFunction={crossoverDualPoint}></GenAlgoChart></Col></Row>
            <Row><Col><p>Schaffer2, epoch =100, mutationProbability = 0.001, crossoverDualPoint</p></Col></Row>
        </Col>
    </Row>
    <Row>
        <Col>
            <Row><Col><GenAlgoChart fitnessFunction={schaffer2}></GenAlgoChart></Col></Row>
            <Row><Col><p>Schaffer2, epoch =100, mutationProbability = 0.001, crossoverDualPoint, Selection: panmixia</p></Col></Row>
        </Col>
    </Row>

                <Row>
                    <Col>
                        <div className="res-table">
                            <h3 style={{paddingTop:"10%"}}>Bukin6 function</h3>
                            <p>Schaffer2/Population:300/CrossoverSP(0.5)/Inversion(0.25)</p>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Mutation</th>
                                    <th>Solve</th>
                                    <th>Time(ms)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>M1</td>
                                    <GenAlgoTable fitnessFunction={bukin6} finalEpoch={0.001}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>M2</td>
                                    <GenAlgoTable fitnessFunction={bukin6} finalEpoch={0.05}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>M3</td>
                                    <GenAlgoTable fitnessFunction={bukin6} finalEpoch={0.01}></GenAlgoTable>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container className="res-table">

                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Crossover</th>
                                    <th>Solve</th>
                                    <th>Time(ms)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>SP</td>
                                    <GenAlgoTable fitnessFunction={bukin6} crossoverFunction={crossoverSinglePoint}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>DP</td>
                                    <GenAlgoTable fitnessFunction={bukin6} crossoverFunction={crossoverDualPoint}></GenAlgoTable>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="res-table">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Parent selection</th>
                                    <th>Solve</th>
                                    <th>Time(ms)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Inbreeding</td>
                                    <GenAlgoTable fitnessFunction={bukin6} selectionFunction={inBreedingEuclid}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>Outbreeding</td>
                                    <GenAlgoTable fitnessFunction={bukin6} selectionFunction={outBreedingEuclid}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>Panmixia</td>
                                    <GenAlgoTable fitnessFunction={bukin6} selectionFunction={panmix}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>Selection</td>
                                    <GenAlgoTable fitnessFunction={bukin6} selectionFunction={selection}></GenAlgoTable>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="res-table">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Generating the population</th>
                                    <th>Solve</th>
                                    <th>Time(ms)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Standard</td>
                                    <GenAlgoTable fitnessFunction={bukin6} populationPushing={standardSelection}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>Selection with replacement</td>
                                    <GenAlgoTable fitnessFunction={bukin6} populationPushing={selectionWithReplacement}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>Elite</td>
                                    <GenAlgoTable fitnessFunction={bukin6} populationPushing={elite}></GenAlgoTable>
                                </tr>
                                </tbody>
                            </Table>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="res-table">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Stop criteria</th>
                                    <th>Solve</th>
                                    <th>Time(ms)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Iteration(Epoch)</td>
                                    <GenAlgoTable fitnessFunction={bukin6} stopFunction={stopByIterationCount}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>Member distance</td>
                                    <GenAlgoTable fitnessFunction={bukin6} stopFunction={parentDistance}></GenAlgoTable>
                                </tr>
                                <tr>
                                    <td>VF(Population distance)</td>
                                    <GenAlgoTable fitnessFunction={bukin6} stopFunction={populationDistance}></GenAlgoTable>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row><Col><GenAlgoChart fitnessFunction={bukin6} ></GenAlgoChart></Col></Row>
                        <Row><Col><p>Schaffer2, epoch =100, mutationProbability = 0.001</p></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row><Col><GenAlgoChart fitnessFunction={bukin6} crossoverFunction={crossoverDualPoint}></GenAlgoChart></Col></Row>
                        <Row><Col><p>Schaffer2, epoch =100, mutationProbability = 0.001, crossoverDualPoint</p></Col></Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row><Col><GenAlgoChart fitnessFunction={bukin6}></GenAlgoChart></Col></Row>
                        <Row><Col><p>Schaffer2, epoch =100, mutationProbability = 0.001, crossoverDualPoint, Selection: panmixia</p></Col></Row>
                    </Col>
                </Row>

            </Col>
            </Row>
        </div>
    </>);
}