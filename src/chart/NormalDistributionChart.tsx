import {randomUniformArray} from "../utils/random/NormalDistribution";
import {Line} from "react-chartjs-2";
import React from "react";
import "./DistributionChart.css";

const pdfArr = randomUniformArray(-10, 10, 21);
const labelsX = pdfArr.currentValues;
const labelsY = pdfArr.pdfValue;


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

 const data = {
    labels: labelsX,
    datasets: [
        {
            label: 'Normal distribution test',
            data: labelsY,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function DistributionChart() {
    return <>
        <div className="DistributionChart">
            <Line options={options} data={data}/>
        </div>
    </>;
}