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
                            <p>The sponsorship period ends on Dec. 10th. Make sure you get started early!</p>
                        </div>
                        <div className="annBox">
                            <h2>Reminders</h2>
                            <p>Please submit your sapling goal and event date if you have not already.</p>
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