import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Landing from "./Landing.js";
import Skeleton from "./Skeleton.js";

ReactDOM.render(
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
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
