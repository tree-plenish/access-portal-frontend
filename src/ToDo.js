import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from "reactstrap";

const ToDo = (props) => {

    return (
        <div>
            {(props.stage === 1) && <div>
                <ul>
                    <li>Submit Tree Species Info Form</li>
                </ul>
            </div>}
            {(props.stage === 2) && <div>
                <ul>
                    <li>Start Gathering Volunteer Sign-Ups</li>
                </ul>
            </div>}
            {(props.stage === 3) && <div>
                <ul>
                    <li>Ramp Up Event Marketing</li>
                </ul>
            </div>}
        </div>
    )
}

export default ToDo;