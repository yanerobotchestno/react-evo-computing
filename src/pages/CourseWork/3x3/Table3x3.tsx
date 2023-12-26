import {Button, Col, Row, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table3x3.css';
import {decreaseToSmallestDecimal} from "../../../utils/binary/FloatBin";
import React, {useEffect, useState} from "react";

export default function Table3x3() {
    const [elementx0, setElementx0] = useState(0);
    const [elementx1, setElementx1] = useState(0);
    const [elementx2, setElementx2] = useState(0);

    const [element01, setElement01] = useState(0);
    const [element02, setElement02] = useState(0);
    const [element03, setElement03] = useState(0);

    const [element11, setElement11] = useState(0);
    const [element12, setElement12] = useState(0);
    const [element13, setElement13] = useState(0);

    const [element21, setElement21] = useState(0);
    const [element22, setElement22] = useState(0);
    const [element23, setElement23] = useState(0);

    const [elementB1, setElementB1] = useState(0);
    const [elementB2, setElementB2] = useState(0);
    const [elementB3, setElementB3] = useState(0);

    const [elementC1, setElementC1] = useState(0);
    const [elementC2, setElementC2] = useState(0);
    const [elementC3, setElementC3] = useState(0);


    useEffect(() => {
        const recalculateArray = () => {
            setElementB1(element01 * elementx0 + element02 * elementx2 + element03 * elementx2);
            setElementB2(element11 * elementx0 + element12 * elementx2 + element13 * elementx2);
            setElementB3(element21 * elementx0 + element22 * elementx2 + element23 * elementx2);

            setElementC1(element01+element11+element21);
            setElementC2(element02+element12+element22);
            setElementC3(element03+element13+element23);
        };

        recalculateArray();

        return () => {

        };
    }, [element01, element02, element03, element11, element12, element13, element21, element22, element23, elementx0, elementx2]);

    return (
        <>

            <div className="X0Table">
                <Row style={{
                    display:"flex",
                    textAlign:"center",
                    justifyContent:"center",
                    flexDirection:"column",
                    margin:"0 auto"
                }}>
                <Table striped bordered hover responsive>
                    <tbody>
                    <tr>
                        <td>
                    x0
                            </td>
                            <td>
                    <input
                        type="number"
                        defaultValue={0}

                        step={decreaseToSmallestDecimal(parseFloat("1"))}
                        onChange={(e) => {
                            setElementx0(Number(e.target.value));

                        }}
                    />
                        </td>
                    </tr>
                    <tr>
                        <td>
                    x1
                            </td>
                            <td>
                    <input
                        type="number"
                        defaultValue={0}

                        step={decreaseToSmallestDecimal(parseFloat("1"))}
                        onChange={(e) => {
                            setElementx1(Number(e.target.value));

                        }}
                    />
                        </td>
                    </tr>

                    <tr>
                        <td>
                    x2
                            </td>
                            <td>
                    <input
                        type="number"
                        defaultValue={0}
                        step={decreaseToSmallestDecimal(parseFloat("1"))}
                        onChange={(e) => {
                            setElementx2(Number(e.target.value));

                        }}
                    />
                        </td>
                    </tr>
                    </tbody>
                </Table>
                </Row>
            </div>

        <Row>
            <div className="ArrayTable">
                <Col className="Amatrix">A = </Col>
                <Col>
            <Table striped bordered hover responsive>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => {
                                setElement01(Number(e.target.value));

                            }}
                        />
                    </td>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => {
                                setElement02(Number(e.target.value));

                            }}
                        />
                    </td>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => {
                                setElement03(Number(e.target.value));

                            }}
                        />
                    </td>
                </tr>
                <tr>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => {
                                setElement11(Number(e.target.value));

                            }}
                        />
                    </td>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={async (e) => {
                                await setElement12(Number(e.target.value));

                            }}
                        />
                    </td>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => {
                                setElement13(Number(e.target.value));

                            }}
                        />
                    </td>
                </tr>

                <tr>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => setElement21(Number(e.target.value))}
                        />
                    </td>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => setElement22(Number(e.target.value))}
                        />
                    </td>

                    <td>
                        <input
                            type="number"
                            defaultValue={0}

                            step={decreaseToSmallestDecimal(parseFloat("1"))}
                            onChange={(e) => {setElement23(Number(e.target.value))}}
                        />
                    </td>
                </tr>
                </tbody>
            </Table>
                </Col>
                <Col></Col>
            </div>
        </Row>
            <div className="X0Table">
                <Row style={{
                    display:"flex",
                    textAlign:"center",
                    justifyContent:"center",
                    flexDirection:"column",
                    margin:"0 auto"
                }}>
                    <Table striped bordered hover responsive>
                        <tbody>
                        <tr>
                            <td>
                                b0
                            </td>
                            <td>
                                {elementB1}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                b1
                            </td>
                            <td>
                                {elementB2}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                b2
                            </td>
                            <td>
                                {elementB3}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>

            <div className="X0Table">
                <Row style={{
                    display:"flex",
                    textAlign:"center",
                    justifyContent:"center",
                    flexDirection:"column",
                    margin:"0 auto"
                }}>
                    <Table striped bordered hover responsive>
                        <tbody>
                        <tr>
                            <td>
                                С0
                            </td>
                            <td>
                                {elementC1}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                С1
                            </td>
                            <td>
                                {elementC2}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                С2
                            </td>
                            <td>
                                {elementC3}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>
            <div className="FlexTable">
                <Row>
                    <Col>{element01}</Col>
                    <Col>{element02}</Col>
                    <Col>{element03}</Col>
                </Row>
                <Row>
                    <Col>{element11}</Col>
                    <Col>{element12}</Col>
                    <Col>{element13}</Col>
                </Row>
                <Row>
                    <Col>{element21}</Col>
                    <Col>{element22}</Col>
                    <Col>{element23}</Col>
                </Row>
            </div>

            <div className="ms-4">
                <div>
                    min({-elementC1}*<big>X</big><small>1</small> <big>{-elementC2 > 0?"+ ":""}</big>{-elementC2} <big>X</big><small>2</small> <big>{-elementC3 > 0?"+ ":""}</big>{-elementC3} <big>X</big><small>3</small>)
                </div>
            </div>
    </>)
}