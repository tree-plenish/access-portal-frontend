import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './App.css'

import classnames from "classnames";

import {
    Button,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from "reactstrap";

import tree_plenish_icon from './assets/treeplenish.png';

const Login = () => {

    let history = useHistory();

    const [username, setUsername] = useState(null);
    const [usernameFocused, setUsernameFocused] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordFocused, setPasswordFocused] = useState(null);
    const [message, setMessage] = useState('Your dashboard awaits.');
    const [cookies, setCookie] = useCookies(['user']);

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    // returns an array with [1 or 0, flag1, flag2]
    // flag information is needed in Skeleton.js
    function checkObj(loginObj, schoolidnum, currentPass, flagObj) {
        let returnVals = [];
        for (const prop in loginObj) {
            if (loginObj[prop]['id'] === schoolidnum) {
                if (loginObj[prop]['pwd'] === currentPass) {
                    returnVals.push(1);
                } else {
                    returnVals.push(0);
                }
            }
        }
        returnVals.push(flagObj[0]['tree_order_public']);
        returnVals.push(flagObj[0]['volunteer_public']);
        return returnVals;
    }

    function getData(u, p) {
        return new Promise(resolve => {
            fetch(`/api/login/${u}`, {
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(apiU + ":" + apiP),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
                .then(res => res.json())
                .then(data => {
                    resolve(checkObj(JSON.parse(data.pass), u, p, JSON.parse(data.flags)));
                });
        });
    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    async function handleClick() {
        let strUsername;
        let strPassword;
        if ((username !== cookies.School) || !cookies.School) {
            strUsername = username;
            strPassword = password;
            setCookie('School', strUsername, {
                path: '/',
                maxAge: 23670000 // expires in 9 months
            });
            setCookie('Password', strPassword, {
                path: '/',
                maxAge: 23670000
            });
        } else {
            strUsername = cookies.School;
            strPassword = cookies.Password;
        }
        const currUsername = Number(strUsername);
        const currPassword = Number(strPassword);
        setMessage('Loading... May take up to 30 seconds.');
        let dataArray = await getData(currUsername, currPassword);
        let proceed = dataArray[0];
        let treeReq = dataArray[1];
        let showVol = dataArray[2];
        if (proceed === 1) {
            history.push({
                pathname: '/dashboard',
                state: { username: strUsername, password: strPassword, treeRequests: treeReq, volunteers: showVol }
            });
        } else if (proceed === 0) {
            window.confirm('Incorrect password. Try again.');
        } else {
            window.confirm('Incorrect username & password. Try again.');
        }
    }

    return (
        <React.Fragment>
            <div className="bg-image view-entire">
                <div className="w-100 h-100 d-flex align-items-center justify-content-between flex-column">
                    <div className="justify-content-center" style={{ width: '100%', height: '92%' }}>
                        <div className="w-100 h-100 d-flex align-items-center">
                            <Container className="w-100 shape-container">
                                <div className="col px-0">
                                    <Row className="align-items-center justify-content-center">
                                        <Col className="text-center align-items-center" lg="6">
                                            <img
                                                alt="..."
                                                className="img-fluid img-trans"
                                                src={tree_plenish_icon}
                                                style={{ width: "180px", padding: '1em' }}
                                            />
                                            <h4 className="lead-example text-white">
                                                {message}
                                            </h4>
                                            <div className="mt-5">
                                                <FormGroup
                                                    className={classnames({
                                                        focused: usernameFocused
                                                    })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                        {cookies.School && <Input
                                                            placeholder="Username"
                                                            type="username"
                                                            className="form-control"
                                                            defaultValue={cookies.School}
                                                            onFocus={e => setUsernameFocused(true)}
                                                            onBlur={e => setUsernameFocused(false)}
                                                            onChange={e => setUsername(e.target.value)}
                                                        />}
                                                        {!cookies.School && <Input
                                                            placeholder="Username"
                                                            type="username"
                                                            className="form-control"
                                                            onFocus={e => setUsernameFocused(true)}
                                                            onBlur={e => setUsernameFocused(false)}
                                                            onChange={e => setUsername(e.target.value)}
                                                        />}
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup
                                                    className={classnames({
                                                        focused: passwordFocused
                                                    })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                        {cookies.Password && <Input
                                                            placeholder="Password"
                                                            type="password"
                                                            className="form-control"
                                                            defaultValue={cookies.Password}
                                                            onFocus={e => setPasswordFocused(true)}
                                                            onBlur={e => setPasswordFocused(false)}
                                                            onChange={e => setPassword(e.target.value)}
                                                            onKeyPress={handleKeyPress}
                                                        />}
                                                        {!cookies.Password && <Input
                                                            placeholder="Password"
                                                            type="password"
                                                            className="form-control"
                                                            onFocus={e => setPasswordFocused(true)}
                                                            onBlur={e => setPasswordFocused(false)}
                                                            onChange={e => setPassword(e.target.value)}
                                                            onKeyPress={handleKeyPress}
                                                        />}
                                                    </InputGroup>
                                                </FormGroup>
                                                <div style={{ padding: '1em' }}>
                                                    <Button
                                                        className="btn-login btn-trans"
                                                        size="lg-login"
                                                        onClick={handleClick}
                                                    >
                                                        <span className="btn-inner--text">Log In</span>
                                                    </Button>{" "}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '8%' }}>
                        <Container className="container-fluid">
                            <p className="text-white text-center pr-sm-1">
                                Tree-Plenish: Empowering youth to create a more sustainable and equitable future through community tree-planting.
                            </p>
                        </Container>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
