import React, { useState } from 'react';

const ToDo = (props) => {

    return (
        <div className="to-do-center">
            <div className="to-do-left">
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
        </div>
    )
}

export default ToDo;