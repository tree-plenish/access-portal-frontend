import React from 'react';
import './App.css';

const Announcements = () => {
    return (
        <div>
            <div className="annOut">
                <div className="annBody">
                    <div className="annContainer">
                        <div className="annBox">
                            <h2>Deadlines</h2>
                            <p>Please submit your event webpage information by 12/23.</p>
                        </div>
                        <div className="annBox">
                            <h2>Reminders</h2>
                            <p>Please sign up for an Event Marketing Informational Meeting using the Calendly link below.</p>
                            <p><a className="link-anim in-line" href="https://calendly.com/treeplenish/event-marketing-informational-meeting?month=2022-01">Click here!</a></p>
                            <p>Follow us on Instagram @treeplenish!</p>
                        </div>
                        <div className="annBox">
                        <h2>Questions?</h2>
                            <p>Text (774) 224-9972 for quick questions.</p>
                            <p>Sign up for Office Hours (link below) for 1:1 support.</p>
                            <p><a className="link-anim in-line" href="https://calendly.com/treeplenish/tree-plenish-office-hours">Click here!</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcements;