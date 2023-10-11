import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Container } from './Container';
import "./index.css";
import { DistributionChart } from "./chart/NormalDistributionChart";

const rootElement = document.getElementById('root');

createRoot(rootElement!).render(
    <React.Fragment>
        <div>
            <App />
        </div>
        <div>
            <Container />
        </div>
        <div>
            <DistributionChart />
        </div>
    </React.Fragment>
);
