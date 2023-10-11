import React from 'react';
import "./Container.css";
import {dualPointCrossover} from "./utils/crossover/Crossover";
import {getInterval} from "./utils/interval/Interval";
import {integerToBinaryArray} from "./utils/binary/IntegerBit";



const result = dualPointCrossover([0, 1, 1, 0, 1, 0], [1, 1, 0, 1, 0, 0]);

export function Container() {
    getInterval(0, 8, 0.4)
    return <div className="container">
        <p>Hello, (centered) World!</p>
        {result.child1}
        <br/>
        {result.child2}
        <br/>
        {getInterval(0, 8, 0.4).toString()}
        <br/>
        {integerToBinaryArray(7)}
    </div>;
}