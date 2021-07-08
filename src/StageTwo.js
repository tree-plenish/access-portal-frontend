import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sponsorshipData } from './Data';
import {Container} from "reactstrap";
import * as ReactBootStrap from "react-bootstrap";
import Chart from './Chart';
import Announcements from './Announcements';
import ExportTreeRequestsButton from './ExportTreeRequestsButton';

const StageTwo = ( prevInfo ) => {

    const username = prevInfo.prevUsername;
    const password = prevInfo.prevPassword;
    console.log(username);

    const renderSponsors = (sponsor, index) => {
        return(
            <tr key={{index}}>
                <td>{sponsor.name}</td>
                <td>{sponsor.amount}</td>
            </tr>
        )
    }

    const numFreeTrees = 150;
    const totalRequests = 5000;

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
                            <p className="col-title-text">Announcements</p>
                            <Announcements />
                            </Container>
                            <Container className="custom-col-2">
                                <p className="col-title-text">Tree Requests</p>
                                <h2 className="center">{totalRequests}</h2>
                                <p className="center">total requests received!</p>
                                <p>Progress to Goal</p>
                                <Chart />
                                <ExportTreeRequestsButton />
                            </Container>
                            <Container className="custom-col-3">
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
                                <ul>
                                    <li>Total Free Trees You Can Give Out to Residents: {numFreeTrees}</li>
                                </ul>
                                <br></br>
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

export default StageTwo;
