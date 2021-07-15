import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
    var [message, setMessage] = useState('Your dashboard awaits.');

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    function checkObj(objName, schoolidnum, currentPass) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            if (objName[prop]['password'] === currentPass) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      }

    function apiCall(u, p) {
        return new Promise(resolve => {
          fetch('/api/login', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
          .then(res => res.json())
          .then(data => JSON.parse(data.pass))
          .then(jsonObj => checkObj(jsonObj, u, p))
          .then(x => {
            resolve(x);
          });
        });
      }
      
    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    async function handleClick() {
        const strUsername = username;
        const strPassword = password;
        const currUsername = Number(username);
        const currPassword = Number(password);
        setMessage('Loading... May take up to 30 seconds.');
        var proceed = await apiCall(currUsername, currPassword); // apiCall function requires numbers, not strings
        if (proceed === 1) {
            history.push({
                pathname: '/dashboard',
                state: {username: strUsername, password: strPassword}
            });
        } else if (proceed === 0) {
            window.confirm('Incorrect password. Try again.');
        } else {
            window.confirm('Username & password must be a number. Try again.');
        }
    }

    return (
        <React.Fragment>
            <div className = "bg-image view-entire">
                <div className = "w-100 h-100 d-flex align-items-center justify-content-between flex-column">
                    <div className = "justify-content-center" style={{ width: '100%', height: '92%'}}>
                        <div className = "w-100 h-100 d-flex align-items-center">
                            <Container className = "w-100 shape-container">
                                <div className = "col px-0">
                                    <Row className = "align-items-center justify-content-center">
                                        <Col className = "text-center align-items-center" lg="6">
                                            <img
                                                alt = "..."
                                                className = "img-fluid img-trans"
                                                src={tree_plenish_icon}
                                                style={{ width: "180px", padding: '1em' }}
                                            />
                                            <h4 className = "lead-example text-white">
                                                {message}
                                            </h4>
                                            <div className = "mt-5">
                                                <FormGroup
                                                    className={classnames({
                                                        focused: usernameFocused
                                                    })}
                                                >
                                                <InputGroup className = "input-group-alternative">
                                                    <Input
                                                        placeholder = "Username"
                                                        type = "username"
                                                        className = "form-control"
                                                        onFocus={e => setUsernameFocused(true)}
                                                        onBlur = {e => setUsernameFocused(false)}
                                                        onChange = {e => setUsername(e.target.value)}
                                                    />
                                                </InputGroup>
                                                </FormGroup>
                                                <FormGroup
                                                    className={classnames({
                                                        focused: passwordFocused
                                                    })}
                                                >
                                                <InputGroup className = "input-group-alternative">
                                                    <Input
                                                        placeholder = "Password"
                                                        type = "password"
                                                        className = "form-control"
                                                        onFocus={e => setPasswordFocused(true)}
                                                        onBlur = {e => setPasswordFocused(false)}
                                                        onChange = {e => setPassword(e.target.value)}
                                                        onKeyPress = {handleKeyPress}
                                                    />
                                                </InputGroup>
                                                </FormGroup>
                                                <div style={{ padding: '1em'}}>
                                                <Button
                                                    className = "btn-login btn-trans"
                                                    size = "lg"
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
                        <Container className = "container-fluid">
                            <p className="text-white text-center pr-sm-1">
                                Tree-Plenish: Building Sustainable Communities by Leveraging the Power of Youth
                            </p>
                        </Container>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
