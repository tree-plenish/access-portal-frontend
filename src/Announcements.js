import React from 'react';
import './App.css';

const Announcements = () => {
    let thinkificLink = <a className="link-anim in-line" href="https://tree-plenish-event-planning.thinkific.com/">Thinkific.</a>
    let zoomLink = <a className="link-anim in-line" href="https://us05web.zoom.us/j/85979535020?pwd=VFF2WURNRUk0bnVRNEFFRlM2NHZTUT09">Zoom link.</a>
    return (
        <div>
            <div className="annOut">
                <div className="annBody">
                    <div className="annContainer">
                        <div className="annBox">
                            <h2>Resources</h2>
                            <p>To access videos, resources, and forms, go to {thinkificLink}</p>
                            <p>For quick questions, text (774) 224-9972.</p>
                            <p>To speak to someone at Tree-Plenish, attend office hours on Wednesday at 8-9 pm ET using this {zoomLink}</p>
                        </div>
                        <div className="annBox">
                            <h2>Reminders</h2>
                            <p>We have a mandatory meeting with all schools on December 1st at 8 pm ET.</p>
                            <p>Refer other schools to get $50 in free saplings for your event!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcements;