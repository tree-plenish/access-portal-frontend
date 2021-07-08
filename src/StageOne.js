import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {Container} from "reactstrap";
import Announcements from './Announcements';
import { sponsorshipData } from './Data';
import * as ReactBootStrap from "react-bootstrap";
import Chart from "./Chart";

const StageOne = ( prevInfo ) => {

    const [username, setUsername] = useState(prevInfo.prevUsername); // username is a STRING
    const [password, setPassword] = useState(prevInfo.prevPassword); // password is a STRING
    console.log(username);

    const renderSponsors = (sponsor, index) => {
        return(
            <tr key={{index}}>
                <td>{sponsor.name}</td>
                <td>{sponsor.amount}</td>
            </tr>
        )
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className={"bg-light-green view-entire"}>
                    <div className="w-500 h-500 d-flex align-items-center justify-content-between flex-column">
                        <div className="title">
                            <h3>Welcome, Pinnacle High School!</h3>
                        </div>
                        <div className="flex-container w-100">
                            <Container className="custom-col-1">
                            <Announcements />
                            </Container>
                            <Container className="custom-col-2">
                                <p className="col-title-text">Sponsorships</p>
                                <ReactBootStrap.Table className="table">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sponsorshipData.map(renderSponsors)}
                                        </tbody>
                                    </ReactBootStrap.Table>
                            </Container>
                            <Container className="custom-col-3">
                                <p className="col-title-text">Helpful Links</p>
                                <ul>
                                    <li><a href="https://www.tree-plenish.org">Tree Plenish Website</a></li>
                                    <li><a href="https://www.wikihow.com/Plant-a-Tree">How to Plant a Tree</a></li>
                                </ul>
                                <h2>Developer Info</h2>
                                <p className="login-text">Username: {username}</p>
                                    <p className="login-text">Password: {password}</p>
                            </Container>
                        </div>
                        <div className="footer">
                            Tree-Plenish. Building Sustainable Communities by Leveraging the Power of Youth
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StageOne;
