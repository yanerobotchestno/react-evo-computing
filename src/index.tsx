import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { Container } from './Container';
import "./index.css";
import { DistributionChart } from "./chart/NormalDistributionChart";
import {Genetic} from "./alghorithms/genetic/front/Genetic";

const rootElement = document.getElementById('root');

createRoot(rootElement!).render(
    <React.Fragment>
          <App/>
    </React.Fragment>
);

//<DistributionChart />