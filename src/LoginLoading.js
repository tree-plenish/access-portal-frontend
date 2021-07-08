import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './App.css'
import Skeleton from './Skeleton';

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

const LoginLoading = ({ location }) => {
    const history = useHistory();

    const [page, setPage] = useState(0);
    const [formValues, setFormValues] = useState({
        username: (location && location.state && location.state.username) ? location.state.username : null,
        password: (location && location.state && location.state.password) ? location.state.password : null,
    });

    const handleFormChange = (updatedValues) => {
        setFormValues((values) => ({
            ...values,
            ...updatedValues
        }));
    };

    console.log(formValues);

    const username = formValues.username;
    const password = formValues.password;
    const [isBusy, setIsBusy] = useState(true);
    const [proceed, setProceed] = useState();
    const [cable, setCable] = useState();

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

    useEffect(() => {
        fetch('/coldata').then(res => res.json()).then(data => {
            setCable(data.cab);
            var jsonObj = JSON.parse(cable);
            var x = checkObj(jsonObj, username, password);
            setProceed(x);
            console.log(proceed);
            console.log('password check done');
            if (proceed === 1) {
                setIsBusy(false);
            } else {
                window.confirm('Incorrect password.');
            }
        });
      }, [cable]);

    return (
        <div>
            {isBusy ? (
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
                                                Loading...
                                            </h4>
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
          ) : ( <Skeleton/>
          )}
        </div>
    );
}

export default LoginLoading;