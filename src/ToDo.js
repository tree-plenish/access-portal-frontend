import React, { useState } from 'react';

// props.flags[0] is submitted_tree_info
// props.flags[1] is submitted_epf
const ToDo = (props) => {

    return (
        <div className="to-do-center">
            <div className="to-do-left">
                {(!props.flags[0]) && <div>
                    <ul>
                        <li>Submit Tree Species Info Form</li>
                    </ul>
                </div>}
                {(!props.flags[1]) && <div>
                    <ul>
                        <li>Submit Event Page Form</li>
                    </ul>
                </div>}
                {(props.flags[0] && props.flags[1]) && <div>
                    <ul>
                        <li>No Forms to Submit</li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default ToDo;