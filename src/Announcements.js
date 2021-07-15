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
                            <p>Complete mentorship online course.</p>
                            <p>Complete paperwork.</p>
                        </div>
                        <div className="annBox">
                            <h2>Reminders</h2>
                            <p>Research your school's annual paper usage.</p>
                            <p>Set a goal for number of trees to plant!</p>
                        </div>
                        <div className="annBox">
                            <h2>Helpful Links</h2>
                            <p><a className="link-anim" href="https://www.tree-plenish.org">Tree Plenish Website</a></p>
                            <p><a className="link-anim" href="https://www.wikihow.com/Plant-a-Tree">How to Plant a Tree</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcements;