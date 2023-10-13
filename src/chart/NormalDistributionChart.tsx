import {randomNormalisemArray} from "../utils/random/NormalDistribution";
import {Line} from "react-chartjs-2";
import React from "react";
import "./DistributionChart.css";
import {getInterval} from "../utils/interval/Interval";

const interval = getInterval(-10,10, 0.01);
const pdfArr = randomNormalisemArray(-10, 10, interval.length);
const labelsX = pdfArr.currentValues.map(number => {
    // Преобразуем число в строку с фиксированной точностью и затем в число
    return Number(number.toFixed(3));
});;
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
            label: 'point',
            data: labelsY,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function DistributionChart() {
    return <>
        <div className="DistributionChart">

                <div className="chart-content">
                    <Line options={options} data={data}/>
                </div>

        </div>
    </>;
}