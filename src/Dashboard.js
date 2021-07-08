import React, { useState, Component, useEffect, useRef} from "react";
import './App.css';
import Chart from './Chart';
import Announcements from './Announcements';
import { volunteerData } from './Data';
import { sponsorshipData } from './Data';
import * as ReactBootStrap from 'react-bootstrap';
import ExportTreeRequestsButton from './ExportTreeRequestsButton';
import ExportDataButton from './ExportDataButton';

import {
    Button, Card, CardBody, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Container, Row, Col
} from "reactstrap";

const Dashboard = ({ onDone, prevUsername, prevPassword }) => {

    const [username, setUsername] = useState(prevUsername); // username is a STRING
    const [password, setPassword] = useState(prevPassword); // username is a STRING
    const requestName = `TREE REQUESTS FORM ${username}`; // use ` instead of ' for dynamic strings

    const renderVolunteers = (volunteer, index) => {
        return(
            <tr key={{index}}>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.age}</td>
            </tr>
        )
    }

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

    // attempt to write a function to convert regular json format into array format for chart data
    /*const speciesArray = [];
    const requestsArray = [];
    function convertDataToChartFormat() {
        var i;
        for (i = 0; i < data.length; i++) {
            speciesArray.push(data(i).species);
            requestsArray.push(data(i).requests);
        }
    }

    const newChartData = {convertDataToChartFormat(treeRequestData)};*/

    return (
            <div className="page-container">
                <div className="content-wrap">
                    <div className={"bg-light-green view-entire"}>
                        <div className="w-500 h-500 d-flex align-items-center justify-content-between flex-column">
                            <div className="title">
                                Welcome Pinnacle High School!
                            </div>
                            <div className="flex-container w-100">
                                <Container className="custom-col-1">
                                    <p className="col-title-text">Volunteers</p>
                                    <ReactBootStrap.Table className="table">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Age</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {volunteerData.map(renderVolunteers)}
                                        </tbody>
                                    </ReactBootStrap.Table>
                                    <ExportDataButton />
                                </Container>
                                <Container className="custom-col-2">
                                    <p className="col-title-text">Tree Requests</p>
                                    <h2 className="center">{totalRequests}</h2>
                                    <p className="center">total requests received</p>
                                    <p>Progress to Goal</p>
                                    <Chart />
                                    <ExportTreeRequestsButton />
                                </Container>
                                <Container className="custom-col-3">
                                    <p className="col-title-text">Announcements</p>
                                    <Announcements />
                                    <hr className = "hline"/>
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
                                    <p className="login-text">Request name: {requestName}</p>
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
export default Dashboard;
