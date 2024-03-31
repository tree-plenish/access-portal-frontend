import React from 'react';
import './App.css';

const Announcements = () => {
    let thinkificLink = <a className="link-anim in-line" href="https://tree-plenish-event-planning.thinkific.com/">Thinkific.</a>
    let zoomLink = <a className="link-anim in-line" href="https://us06web.zoom.us/j/88064676662?pwd=dURMRytKcjB5WHNuTmN1bUt1aS9YQT09">Zoom link.</a>
    let meetingLink = <a className="link-anim in-line" href="https://calendly.com/treeplenish/day-of-event-informational-meeting-1">link</a>
    let shippingLink = <a className="link-anim in-line" href="https://treeplenish.typeform.com/to/UEWeW313">link</a>
    let logisticsLink = <a className="link-anim in-line" href="https://treeplenish.typeform.com/to/dWuXsymK">link!</a>

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
                            <p>Fill out the Logistics Form as soon as possible using this {logisticsLink}</p>
                            <p>Download the Tree-Plenish app for easy access to your To-Do list, Event Statistics, Thinkific, and User Dashboard. We will also send important updates through push notifications. Check Thinkific for a quick download link or wherever you buy apps.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcements;