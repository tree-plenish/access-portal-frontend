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

    const numUsername = Number(username);

    const requestName = `TREE REQUESTS FORM ${username}`; // use ` instead of ' for dynamic strings
    const [schoolName, setSchoolName] = useState();
    const [treeGoal, setTreeGoal] = useState();
    const [numTreesReq, setNumTreesReq] = useState();
    const [goalPercent, setGoalPercent] = useState();
    var [volTable, setVolTable] = useState();
    var [volProps, setVolProps] = useState([
      { name: "Place", email: "iFeelGodInThisChilis@tn" },
      { name: "Holder", email: "catchYou@theFlipityFlip" }
    ]); // satisfy react-csv variable type before array is updated with actual data
    var volArr = [];

    function traverseSchoolName(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            return objName[prop]['name'];
          }
        }
      }

      function traverseTreeGoal(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            return objName[prop]['tree_goal'];
          }
        }
      }

      function traverseTreesRequested(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            return objName[prop]['trees_requested'];
          }
        }
      }

      function traverseVolunteers(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            volArr.push(objName[prop]);
          }
        }
        volArr.sort((a, b) => parseFloat(a.teamid) - parseFloat(b.teamid)); // sort by teamid in ascending order
        setVolProps(volArr);
        setVolTable(volArr.map(renderVolunteers)); // method to make sure the table renders with updated data
        return volArr;
      }

    function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
        var text = str.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        return text;
    }

    function getSchoolName(u) {
        return new Promise(resolve => {
          fetch('/api/schoolname')
          .then(res => res.json())
          .then(data => JSON.parse(data.name))
          .then(jsonObj => traverseSchoolName(jsonObj, u))
          .then(x => {
            resolve(x);
            setSchoolName(toTitleCase(x)); // assuming 'name' in the table 'school' is lowercase
          });
        });
      }

      function getTreeGoal(u) {
        return new Promise(resolve => {
          fetch('/api/treegoal')
          .then(res => res.json())
          .then(data => JSON.parse(data.goal))
          .then(jsonObj => traverseTreeGoal(jsonObj, u))
          .then(x => {
            resolve(x);
            setTreeGoal(x);
          });
        });
      }

      function getTreesRequested(u) {
        return new Promise(resolve => {
          fetch('/api/numtreesrequested')
          .then(res => res.json())
          .then(data => JSON.parse(data.reqnum))
          .then(jsonObj => traverseTreesRequested(jsonObj, u))
          .then(x => {
            resolve(x);
            setNumTreesReq(x);
          });
        });
      }

      function getVolunteers(u) {
        return new Promise(resolve => {
          fetch('/api/volunteers')
          .then(res => res.json())
          .then(data => JSON.parse(data.vol))
          .then(jsonObj => traverseVolunteers(jsonObj, u))
          .then(x => {
            resolve(x);
          });
        });
      }

      function calculateGoalPercentage(numReqParam, goalParam) {
        var numerator = Number(numReqParam);
        var denominator = Number(goalParam);
        var percent = Math.round(numerator/denominator*100);
        setGoalPercent(percent);
      }

    useEffect(() => {
        getSchoolName(numUsername);
        getTreeGoal(numUsername);
        getTreesRequested(numUsername);
        calculateGoalPercentage(numTreesReq, treeGoal);
        getVolunteers(numUsername);
      }, [numTreesReq, treeGoal]);

    const renderVolunteers = (volunteer, index) => {
        return(
            <tr key={{index}}>
                <td>{volunteer.teamid}</td>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phone.toString()}</td>
                <td>{volunteer.drivers_license.toString()}</td>
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
                                Welcome, {schoolName} High School!
                            </div>
                            <div className="flex-container w-100">
                                <Container className="custom-col-1">
                                    <p className="col-title-text">Volunteers</p>
                                    <ReactBootStrap.Table className="table">
                                        <thead>
                                        <tr>
                                            <th>Team ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Driver's License</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {volTable}
                                        </tbody>
                                    </ReactBootStrap.Table>
                                    <ExportDataButton volData={volProps}/>
                                </Container>
                                <Container className="custom-col-2">
                                    <p className="col-title-text">Tree Requests</p>
                                    <h2 className="center">{numTreesReq}</h2>
                                    <p className="center">total requests received</p>
                                    <p>Progress to Goal of {treeGoal} Trees</p>
                                    <Chart treeGoalPercent={goalPercent}/>
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
