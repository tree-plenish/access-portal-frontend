import React from "react";

// props.flags[0] is submitted_tree_info
// props.flags[1] is submitted_epf
// props.flags[2] is total $donations by sponsors
// props.flags[3] is sponsor form URL

const ToDo = (props) => {
    let sponFormLink = <a className="in-line" href={props.flags[3]}>form.</a>
    return (
        <div className="to-do-center">
            <div className="to-do-left">
                {(props.flags[0]) && <div>
                    <input type="checkbox" onclick="return false" checked />
                    <label>Submit Event Data, Sapling Goal, and Sapling Species</label>
                </div>}
                {(!props.flags[0]) && <div>
                    <input type="checkbox" onclick="return false" style={{ pointerEvents: 'none' }} />
                    <label>Submit Event Data, Sapling Goal, and Sapling Species</label>
                </div>}
                {(props.flags[1]) && <div>
                    <input type="checkbox" onclick="return false" checked />
                    <label>Submit Event Website Information</label>
                </div>}
                {(!props.flags[1]) && <div>
                    <input type="checkbox" onclick="return false" style={{ pointerEvents: 'none' }} />
                    <label>Submit Event Website Information</label>
                </div>}
                {(props.flags[2] > 0) && <div>
                    <input type="checkbox" onclick="return false" checked />
                    <label>Raise Sponsorship Money by sending businesses your {sponFormLink} (Optional, but Recommended)</label>
                </div>}
                {(props.flags[2] == 0) && <div>
                    <input type="checkbox" onclick="return false" style={{ pointerEvents: 'none' }} />
                    <label>Raise Sponsorship Money by sending businesses your {sponFormLink} (Optional, but Recommended)</label>
                </div>}
                <br></br>
                <a href="https://treeplenish.typeform.com/to/cPvgB9m3">Logistics Form</a>
                <br></br>
                <a href="http://tpeventpageform.org">Event Page Form</a>
                <br></br>
            </div>
        </div>
    )
}

export default ToDo;