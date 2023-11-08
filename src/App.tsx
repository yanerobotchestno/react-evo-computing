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

        <GeneticAlghorithm></GeneticAlghorithm>

        {/*<Container>*/}
        {/*    <Row>*/}
        {/*        <Col>1 of 1</Col>*/}
        {/*    </Row>*/}
        {/*    <Row>*/}
        {/*<div className="FunctionChart">*/}

        {/*    <div className="chart-content">*/}
        {/*        <Line options={options} data={data}/>*/}
        {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in libero vitae arcu congue suscipit a vitae massa. Proin enim arcu, pulvinar ac iaculis nec, faucibus in dolor. Donec ultrices nulla nec placerat cursus. Nunc sit amet justo quis risus efficitur bibendum sed sit amet odio. Aliquam bibendum lectus et porttitor tincidunt. Nullam neque eros, consectetur et hendrerit in, ultrices in turpis. Sed neque augue, faucibus interdum dolor sit amet, mattis eleifend est. Praesent id malesuada magna.*/}

        {/*        In posuere tincidunt lorem eget cursus. Quisque sem nisl, cursus a sodales in, tristique id dolor. Vestibulum arcu nibh, dapibus vitae nunc a, facilisis ultrices ligula. Etiam aliquam turpis eu metus rutrum imperdiet. Nullam id accumsan nibh, eu dignissim eros. Vivamus eget magna volutpat, aliquet nisi in, elementum lorem. Aliquam in ultrices nisl.*/}

        {/*        Nullam ut lectus at justo scelerisque elementum quis vel libero. Nunc gravida risus orci, et fermentum augue faucibus at. Sed tempus efficitur lacus sed lacinia. Donec odio libero, feugiat sed nibh eu, pulvinar dapibus erat. Sed volutpat egestas elit, at dictum felis condimentum nec. Morbi ut augue vel ex semper tincidunt id a lorem. Donec ac mi tempus, volutpat justo in, ultrices quam. Praesent vel risus quis leo convallis iaculis.*/}

        {/*        Curabitur id magna elementum, vehicula ante a, posuere leo. Proin varius vitae turpis at condimentum. Fusce porttitor lacus vel tincidunt mattis. Donec nunc ligula, ultricies non commodo quis, accumsan mattis odio. Cras rutrum ligula et purus vehicula, quis gravida tellus tincidunt. Sed et ante neque. Mauris congue nibh quis facilisis egestas. Nunc ligula risus, congue eu feugiat in, finibus ac lacus. Pellentesque nibh turpis, rutrum non fringilla a, sagittis vulputate velit. Ut id vehicula lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur posuere velit ac lobortis elementum. Nulla tempus augue et ex porttitor, tempor efficitur sapien convallis. Donec eleifend ipsum id sapien pellentesque, quis suscipit massa feugiat.*/}

        {/*        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla euismod et enim vitae consectetur. Nunc hendrerit tristique ipsum, in euismod quam fermentum et. Sed tincidunt nibh vitae semper accumsan. In sagittis, dolor ac vestibulum feugiat, mauris urna porttitor magna, non pellentesque erat neque at lectus. Aenean at nulla venenatis, eleifend ex quis, eleifend erat. Nullam ac nisi gravida, pellentesque tortor et, ultrices odio. Fusce ut metus tortor. In venenatis, felis nec consequat commodo, felis elit tristique tortor, non condimentum nunc neque a justo. Pellentesque et condimentum justo. Etiam diam odio, iaculis eu sodales venenatis, pulvinar ut mauris. Etiam dictum tempor semper. Curabitur semper dui pulvinar interdum accumsan. In id faucibus enim.*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*    </Row>*/}

        {/*</Container>*/}
    </>;
}


