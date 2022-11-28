import React from 'react';
import './App.css';

const Announcements = () => {
    let thinkificLink = <a className="link-anim in-line" href="https://tree-plenish-event-planning.thinkific.com/">Thinkific.</a>
    let zoomLink = <a className="link-anim in-line" href="https://us06web.zoom.us/j/88064676662?pwd=dURMRytKcjB5WHNuTmN1bUt1aS9YQT09">Zoom link.</a>
    let calendlyLink = <a className="link-anim in-line" href="https://calendly.com/treeplenish/sponsorships-meeting?month=2022-10">Calendly link.</a>
    let referralLink = <a className="link-anim in-line" href="https://treeplenish.typeform.com/to/N7CHjsL4?typeform-source=admin.typeform.com">link</a>
    let fundApplicationLink = <a className="link-anim in-line" href="https://treeplenish.typeform.com/to/TBWIfruH">link.</a>

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
                            <p>The Environmental Equity Fund application is now open! Apply by December 12th using this {fundApplicationLink}</p>
                            <p>Please sign up for a Sponsorship Meeting using this {calendlyLink} There are 2 meetings in October and 2 in November.</p>
                            <p>We have a mandatory meeting with all schools on December 1st at 8 pm ET.</p>
                            <p>Refer other schools to get $50 in free saplings for your event using this {referralLink} to our referral program!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcements;