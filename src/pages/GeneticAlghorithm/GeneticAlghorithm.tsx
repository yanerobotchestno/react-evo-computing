import {
    Container,
    Row,
    Col,
    Form,
    Dropdown,
    Image,
    Accordion, Button
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
    const [populationSize, setPopulationSize] = useState('300');
    const [constraintsMinimum, setConstraintsMinimum] = useState('-10');
    const [constraintsMaximum, setConstraintsMaximum] = useState('10');
    const [precision, setPrecision] = useState('0.0001');
    const [arrayRandomFunction, setArrayRandomFunction] = useState('');
    const [testFunction, setTestFunction] = useState('');
    const [selectionFunction, setSelectionFunction] = useState('');
    const [crossoverFunction, setCrossoverFunction] = useState('');
    const [mutationProbability, setMutationProbability] = useState('');
    const [crossoverProbability, setCrossoverProbability] = useState('');
    const [inversionProbability, setInversionProbability] = useState('');
    const [finalEpoch, setFinalEpoch] = useState('');
    const [distance, setDistance] = useState('');
    const [inversionFunctionName, setInversionFunction] = useState('');
    const [mutationFunctionName, setMutationFunction] = useState('');
    const [populationPushingName, setPopulationPushing] = useState('');
    const [stopFunctionName, setStopFunction] = useState('');
    const [resultString, setResultString] = useState('');
    const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
        // if (event.key === 'Enter') {
        //     event.preventDefault();
        // }
        // if (event.key === 'e') {
        //     event.preventDefault();
        // }
    };


    const params = React.useRef({
        populationSize: 300, //V
        constraints: {
            maximum: 10, //V
            minimum: -10 //V
        },
        arrayRandomFunction: uniformInteger, //V
        precision: 0.001, //V
        fitnessFunction: matyasFunction, //V
        selectionFunction: selection, //V
        crossoverFunction: crossoverSinglePoint, //v
        mutationProbability: 0.5, //V
        crossoverProbability: 0.5, //V
        inversionProbability: 0.5, //V
        finalEpoch: 30, //V
        distance: 1, //V
        inversionFunction: inversionOperator, //V
        mutationFunction: mutation, //V
        populationPushing: selectionWithReplacement, //V
        stopFunction: justEpoch
    });

    const setGAResult = React.useCallback(()=>  {
        const res = genAlgh(params.current);
        let populationResult = res.population;
        let fitnessResult = res.fitnessPopulation;
        let intervalResult = res.interval;
        setResultString(`Result: f(${intervalResult[populationResult.x[fitnessResult.minimum.index]]}, ${intervalResult[populationResult.y[fitnessResult.minimum.index]]}) = ${fitnessResult.minimum.value}`);
    }, [params, setResultString]);


    function stopFunctSwitch(name: string) {
        switch (name) {
            case "epoch": {
                params.current.stopFunction = justEpoch;
                break;
            }

            case "populationDistance": {
                params.current.stopFunction = populationDistance;
                break;
            }

            case "parentDistance": {
                params.current.stopFunction = parentDistance;
                break;
            }

            case "stopByIterationCount": {
                params.current.stopFunction = stopByIterationCount;
                break;
            }
        }
    }

    function setIOperator(name: string) {
        switch (name) {
            case "Classic": {
                params.current.inversionFunction = inversionOperator;
                break;
            }
        }
    }

    function setMutationOperator(name: string) {
        switch (name) {
            case "Classic": {
                params.current.mutationFunction = mutation;
                break;
            }
        }
    }

    function setPopPushFunction(name: string) {
        switch (name) {
            case "SelectionWithReplacement": {
                params.current.populationPushing = selectionWithReplacement;
                break;
            }

            case "Elite": {
                params.current.populationPushing = elite;
                break;
            }
        }
    }

    function setARF(name: string) {
        switch (name) {
            case "Normal": {
                params.current.arrayRandomFunction = normaliseArray;
                break;
            }
            case "Uniform": {
                params.current.arrayRandomFunction = uniformInteger;
                break;
            }
        }
    }

    function setCF(name: string) {
        switch (name) {
            case "CrossoverSinglePoint": {
                params.current.crossoverFunction = crossoverSinglePoint;
                break;
            }
            case "CrossoverDualPoint": {
                params.current.crossoverFunction = crossoverDualPoint;
                break;
            }
        }
    }

    function setTF(name: string) {
        switch (name) {
            case "Matyas": {
                params.current.fitnessFunction = matyasFunction;
                break;
            }
            case "Kubik": {
                params.current.fitnessFunction = matyasFunction;
                break;
            }

            case "Rubik": {
                params.current.fitnessFunction = matyasFunction;
                break;
            }
        }
    }


    function setSF(name: string) {
        switch (name) {
            case "Panmixia": {
                params.current.selectionFunction = panmix;
                break;
            }
            case "Outbreeding": {
                params.current.selectionFunction = outBreedingEuclid;
                break;
            }

            case "Inbreeding": {
                params.current.selectionFunction = inBreedingEuclid;
                break;
            }

            case "Selection": {
                params.current.selectionFunction = selection;
                break;
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
                                        defaultValue={300}
                                        onChange={(e) => {
                                            setPopulationSize(e.target.value);
                                            params.current.populationSize = parseInt(populationSize, 10);
                                            setPopulationSize(e.target.value);
                                            params.current.populationSize = parseInt(populationSize, 10);
                                        }}/>
                                </Form.Group>
                            </Form>
                        </Col>
                        {populationSize}
                        <br/>
                        {parseInt(populationSize, 10)}
                    </Row>
                    <Row>
                        <Form className="cons-container">
                            <Form.Group>
                                <Form.Label><h3 style={{textAlign: "center"}}>Constraints</h3></Form.Label>
                                <br/>
                                <Form.Label>Minimum</Form.Label>
                                <br/>
                                <input
                                    type="number"
                                    onKeyDown={handleKeyPress}
                                    defaultValue={300}
                                    onChange={(e) => setConstraintsMinimum(e.target.value)}/>
                                Minimum:{constraintsMinimum}<br/>
                                <Form.Label>Maximum</Form.Label>
                                <br/>
                                <input
                                    type="number"
                                    onKeyDown={handleKeyPress}
                                    defaultValue={300}
                                    onChange={(e) => setConstraintsMaximum(e.target.value)}/>
                                Maximum:{constraintsMaximum};
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
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
                    <Row>
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
                                    <Form.Label>Selected: {arrayRandomFunction}</Form.Label>
                                    <br/>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Array random function
                                    </Dropdown.Toggle>

                                    <br></br>
                                    <Dropdown.Menu>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setArrayRandomFunction('Uniform');
                                            setARF(arrayRandomFunction);

                                        }}>Uniform</Dropdown.Item>
                                        <Dropdown.Item type="button" onClick={(e) => {
                                            setArrayRandomFunction('Normal');
                                            setARF(arrayRandomFunction);
                                        }}>Normal</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Dropdown>
                                <h3>Test Function</h3>
                                <Form.Label>Selected: {testFunction}</Form.Label>
                                <br/>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Test Function
                                </Dropdown.Toggle>

                                <br></br>
                                <Dropdown.Menu>
                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setTestFunction('Matyas');
                                        setTF(testFunction);
                                    }}>
                                        Matyas
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setTestFunction('Kubik');
                                        setTF(testFunction);
                                    }}>
                                        Kubik
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setTestFunction('Tubik');
                                        setTF(testFunction);
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
                                <Form.Label>Selected: {selectionFunction}</Form.Label>
                                <br/>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Selection Function
                                </Dropdown.Toggle>
                                <br></br>
                                <Dropdown.Menu>
                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setSelectionFunction('Panmixia');
                                        setSF(selectionFunction);
                                    }}>Panmixia
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setSelectionFunction('Outbreeding');
                                        setSF(selectionFunction);
                                    }}>Outbreeding
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setSelectionFunction('Inbreeding');
                                        setSF(selectionFunction);
                                    }}>Inbreeding
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setSelectionFunction('Selection');
                                        setSF(selectionFunction);
                                    }}>Selection
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row>
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
                                <Form.Label>Selected: {crossoverFunction}</Form.Label>
                                <br/>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Crossover Function
                                </Dropdown.Toggle>
                                <br></br>
                                <Dropdown.Menu>
                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setCrossoverFunction('CrossoverSinglePoint');
                                        setCF(crossoverFunction);
                                    }}>Single Point
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setCrossoverFunction('CrossoverDualPoint');
                                        setCF(crossoverFunction);
                                    }}>Dual Point
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
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
                                        setMutationFunction('Classic');
                                        setMutationOperator(mutationFunctionName);
                                    }}>Classic
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
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
                                        setInversionFunction('Classic');
                                        setIOperator(inversionFunctionName);
                                    }}>Classic
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row>
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
                                        setPopulationPushing('SelectionWithReplacement');
                                        setPopPushFunction(populationPushingName);
                                    }}>Selection With Replacement
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setPopulationPushing('Elite');
                                        setPopPushFunction(populationPushingName);
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
                                        setStopFunction('epoch');
                                        stopFunctSwitch(stopFunctionName);
                                    }}>Epoch
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setStopFunction('populationDistance');
                                        stopFunctSwitch(stopFunctionName);
                                    }}>Distance between populations
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setStopFunction('parentDistance');
                                        stopFunctSwitch(stopFunctionName);
                                    }}>ParentDistance
                                    </Dropdown.Item>

                                    <Dropdown.Item type="button" onClick={(e) => {
                                        setStopFunction('stopByIterationCount');
                                        stopFunctSwitch(stopFunctionName);
                                    }}>StopByIterationCount
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row fluid>
                        <Button onClick={setGAResult}>Submit</Button>
                    </Row>
                    <Row>
                        {resultString}
                    </Row>
                </Container>
            </div>
        </div>
    </>);
}