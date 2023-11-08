//import React from 'react';
import "./Container.css";
import {getInterval} from "./utils/interval/Interval";
import {integerToBinaryArray} from "./utils/binary/IntegerBit";



export function Container() {
    getInterval(0, 8, 0.4)
    return <div className="container">
        <p>Hello, (centered) World!</p>
        <br/>
        {getInterval(0, 8, 0.4).toString()}
        <br/>
        {integerToBinaryArray(7)}
    </div>;
}