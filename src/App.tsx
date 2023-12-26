//import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Col, Container, Row} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import './App.css';
import GeneticAlghorithm from "./pages/GeneticAlghorithm/GeneticAlghorithm";
import {DistributionChart} from "./chart/NormalDistributionChart";
import CourseWork from "./pages/CourseWork/CourseWork";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



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

const labels = []

for (let i = -30; i < 30; i++) {
    labels.push(i)
}

const resultArray: number[] = [];

for (const number of labels) {
    resultArray.push(1 / number)
}

export const data = {
    labels,
    datasets: [

        {
            label: 'Dataset 2',
            data: resultArray,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};



export function App() {
    return <>

        {/*<GeneticAlghorithm></GeneticAlghorithm>*/}
        <CourseWork></CourseWork>

    </>;
}


