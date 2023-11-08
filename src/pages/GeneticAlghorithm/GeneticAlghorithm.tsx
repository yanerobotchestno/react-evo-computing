import {
    Container,
    Row,
    Col,
    Form,
    Dropdown,
    Image,
    Accordion, Button, ProgressBar
} from "react-bootstrap";
import "./GeneticAlghorithm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import {genAlgh, GeneticParams, Population} from "../../alghorithms/genetic/GeneticAlghorithms";
import {crossoverDualPoint, crossoverSinglePoint} from "../../utils/crossover/Crossover";
import {uniformInteger} from "../../utils/random/Uniform";
import {matyasFunction} from "../../utils/functions/Functions";
import {inBreedingEuclid, outBreedingEuclid, panmix, selection} from "../../utils/selection/Selection";
import {inversionOperator} from "../../utils/inversion/Inversion";
import {mutation} from "../../utils/mutation/Mutation";
import {elite, selectionWithReplacement} from "../../utils/pushing/PopulationPushing";
import {
    justEpoch,
    parentDistance,
    populationDistance,
    stopByIterationCount
} from "../../utils/stop-condition/StopCondition";
import {decreaseToSmallestDecimal} from "../../utils/binary/FloatBin";
import {normaliseArray} from "../../utils/random/NormalDistribution";
import {CalculatedPopulation} from "../../utils/fitness/Fitness";


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
        genAlgh(getParams(), setProgress).then((res) => {
            let populationResult = res.population;
            let fitnessResult = res.fitnessPopulation;
            let intervalResult = res.interval;
            setResultString(`Result: f(${intervalResult[populationResult.x[fitnessResult.minimum.index]]}, ${intervalResult[populationResult.y[fitnessResult.minimum.index]]}) = ${fitnessResult.minimum.value}`);
        });
    }, [getParams, setResultString]);


    function getStopFunction(name: string) {
        switch (name) {
            case "epoch": {
                return justEpoch;
            }

            case "populationDistance": {
                return populationDistance;
            }

            case "parentDistance": {
                return parentDistance;
            }

            case "stopByIterationCount": {
                return stopByIterationCount;
            }

            default: {
                return stopByIterationCount;
            }
        }
    }

    function getInversionFunction(name: string) {
        switch (name) {
            case "Classic": {
                return inversionOperator;
            }

            default: {
                return inversionOperator;
            }
        }
    }

    function getMutationFunction(name: string) {
        switch (name) {
            case "Classic": {
                return mutation;
            }

            default: {
                return mutation;
            }
        }
    }

    function getPopulationPushingFunction(name: string) {
        switch (name) {
            case "SelectionWithReplacement": {
                return selectionWithReplacement;
            }

            case "Elite": {
                return elite;
            }

            default: {
                return elite;
            }
        }
    }

    function getArrayRandomFunction(name: string) {
        switch (name) {
            case "Normal": {
                return normaliseArray;
            }
            case "Uniform": {
                return uniformInteger;
            }
            default: {
                return uniformInteger;
            }
        }
    }

    function getCrossoverFunction(name: string) {
        switch (name) {
            case "CrossoverSinglePoint": {
                return crossoverSinglePoint;
            }
            case "CrossoverDualPoint": {
                return crossoverDualPoint;
            }

            default: {
                return crossoverSinglePoint;
            }
        }
    }

    function getTestFunction(name: string) {
        switch (name) {
            case "Matyas": {
                return matyasFunction;
            }
            case "Kubik": {
                return matyasFunction;
            }

            case "Rubik": {
                return matyasFunction;
            }

            default: {
                return matyasFunction;
            }
        }
    }


    function getSelectionFunction(name: string) {
        switch (name) {
            case "Panmixia": {
                return panmix;
            }
            case "Outbreeding": {
                return outBreedingEuclid;
            }

            case "Inbreeding": {
                return inBreedingEuclid;
            }

            case "Selection": {
                return selection;
            }

            default: {
                return panmix;
            }
        }
    }

    return (<>
        <div className="MainGA">
            <div className="FirstContainer">
                <Container fluid>
                    <Row>
                        <Col fluid className="">
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
                    <Row fluid md="auto">
                        <Col md="auto">
                            <Form className="cons-container">
                                <Form.Group>
                                    <Form.Label><h3 style={{textAlign: "center"}}>Constraints</h3></Form.Label>
                                    <br/>
                                    <Form.Label>Minimum</Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={-10}
                                        onChange={(e) => setConstraintsMinimum(e.target.value)}/>
                                    Minimum:{constraintsMinimum}<br/>
                                    <Form.Label>Maximum</Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={10}
                                        onChange={(e) => setConstraintsMaximum(e.target.value)}/>
                                    Maximum:{constraintsMaximum};
                                </Form.Group>
                            </Form>
                        </Col>
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
                    </Row>

                    <Row className="precision-window">
                        <Form.Group>
                            <Form.Label>
                                <h3 style={{textAlign: "center"}}>Precision</h3>
                            </Form.Label>
                            <br/>
                            <input
                                type="number"
                                onKeyDown={handleKeyPress}
                                defaultValue={0.001}
                                step={decreaseToSmallestDecimal(parseFloat(precision))}
                                onChange={(e) => setPrecision(e.target.value)}/>
                            <br/>
                            {precision}
                        </Form.Group>
                    </Row>

                    <Row className="test-function-window">
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
                                        setTestFunctionName('Kubik');
                                    }}>
                                        Kubik
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setTestFunctionName('Tubik');
                                    }}>
                                        Tubik
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                    </Row>

                    <Row className="crossover-opt">
                        <Col>
                            <Dropdown>
                                <Form.Group>
                                    <Form.Label>
                                        <h3 style={{textAlign: "center"}}>Crossover Probability</h3>
                                    </Form.Label>
                                    <br/>
                                    <input
                                        type="number"
                                        onKeyDown={handleKeyPress}
                                        defaultValue={0.001}
                                        step={decreaseToSmallestDecimal(parseFloat(crossoverProbability))}
                                        onChange={(e) => setCrossoverProbability(e.target.value)}/>
                                    <br/>
                                    {crossoverProbability}
                                </Form.Group>
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
                    </Row>
                    <Row className="mutation-window">
                        <Form.Group>
                            <Form.Label>
                                <h3 style={{textAlign: "center"}}>Mutation Probability</h3>
                            </Form.Label>
                            <br/>
                            <input
                                type="number"
                                onKeyDown={handleKeyPress}
                                defaultValue={0.001}
                                step={decreaseToSmallestDecimal(parseFloat(mutationProbability))}
                                onChange={(e) => setMutationProbability(e.target.value)}/>
                            <br/>
                            {mutationProbability}
                        </Form.Group>
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
                    </Row>
                    <Row className="inversion-window">
                        <Form.Group>
                            <Form.Label>
                                <h3 style={{textAlign: "center"}}>Inversion Probability</h3>
                            </Form.Label>
                            <br/>
                            <input
                                type="number"
                                onKeyDown={handleKeyPress}
                                defaultValue={0.001}
                                step={decreaseToSmallestDecimal(parseFloat(inversionProbability))}
                                onChange={(e) => setInversionProbability(e.target.value)}/>
                            <br/>
                            {inversionProbability}
                        </Form.Group>
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
                    </Row>

                    <Row className="epoch-window">
                        <Form.Group>
                            <Form.Label>
                                <h3 style={{textAlign: "center"}}>Epoch Count</h3>
                            </Form.Label>
                            <br/>
                            <input
                                type="number"
                                onKeyDown={handleKeyPress}
                                defaultValue={30}
                                step={1}
                                onChange={(e) => setFinalEpoch(e.target.value)}/>
                            <br/>
                            {finalEpoch}
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group>
                            <Form.Label>
                                <h3 style={{textAlign: "center"}}>Distance</h3>
                                <p>Used for stop criteria</p>
                            </Form.Label>
                            <br/>
                            <input
                                type="number"
                                onKeyDown={handleKeyPress}
                                defaultValue={0.001}
                                step={decreaseToSmallestDecimal(parseFloat(distance))}
                                onChange={(e) => setDistance(e.target.value)}/>
                            <br/>
                            {distance}
                        </Form.Group>
                    </Row>

                    <Row>
                        <Col>
                            <Dropdown>
                                <h3>Member Pushing Function</h3>
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
                    </Row>

                    <Row>
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
                    <Row fluid>
                        <Button onClick={setGAResult}>Submit</Button>
                        <br/>
                        <ProgressBar animated min={0} max={Number(finalEpoch)} now={progress} style={{ marginTop: '10px' }} />
                    </Row>
                    <Row>
                        {resultString}
                    </Row>
                </Container>
            </div>
        </div>
    </>);
}