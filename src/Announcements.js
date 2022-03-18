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
                            <p>Please submit your shipping addresses through the form below as soon as possible.</p>
                            <p><a className="link-anim in-line" href="https://docs.google.com/forms/d/e/1FAIpQLSfdjqjpTwUyBJ_5Y8LVCs_ouaRMAEeVV6zg0rf_6WOK8Aowtw/viewform">Click here!</a></p>
                        </div>
                        <div className="annBox">
                            <h2>Reminders</h2>
                            <p>Please sign up for a Day of Event Meeting using the Calendly link below.</p>
                            <p><a className="link-anim in-line" href="https://calendly.com/treeplenish/day-of-event-informational-meeting?month=2022-03">Click here!</a></p>
                            <p>Your sapling order form closes one month before your event, so make sure to start marketing your event early to get sapling orders in!</p>
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