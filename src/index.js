import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import { CookiesProvider } from "react-cookie";
import reportWebVitals from './reportWebVitals';

import Landing from "./Landing.js";
import Skeleton from "./Skeleton.js";

import ReactGA from 'react-ga';
ReactGA.initialize('UA-191521171-2'); // add your tracking id here.
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Landing {...props} />} />
                <Route
                    path="/dashboard"
                    exact render={props => <Skeleton {...props} />}
                />
                <Route
                    path="/stageone"
                    exact render={props => <Skeleton {...props} />}
                />
                <Route
                    path="/stagetwo"
                    exact render={props => <Skeleton {...props} />}
                />
            </Switch>
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
