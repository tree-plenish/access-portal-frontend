import React, { useState, Component, useEffect, useRef} from "react";
import './App.css';
import Chart from './Chart';
import Announcements from './Announcements';
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

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

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
    var donationArr = []; // raw donation levels (a, b, c, d)
    var donationNumArr = []; // corresponding numbers (1000, 500, 200, 50)
    const [numFreeTrees, setNumFreeTrees] = useState();
    var [sponTable, setSponTable] = useState();
    var [sponProps, setSponProps] = useState([
      { name: "Place", email: "iFeelGodInThisChilis@tn" },
      { name: "Holder", email: "catchYou@theFlipityFlip" }
    ]);
    var sponArr = [];
    var sponIdArr = [];
    var sponIdTableArr = [];
    var [sponIdTable, setSponIdTable] = useState();
    var [sponIdProps, setSponIdProps] = useState([
      { name: "Place", email: "iFeelGodInThisChilis@tn" },
      { name: "Holder", email: "catchYou@theFlipityFlip" }
    ]);
    var [specProps, setSpecProps] = useState([
      { name: "Species", email: "iFeelGodInThisChilis@tn" },
      { name: "Placeholder", email: "catchYou@theFlipityFlip" }
    ]);
    var [speciesNames, setSpeciesNames] = useState(["Place","Holder"]);
    var [speciesVals, setSpeciesVals] = useState([0,0]);

    // Note: at each index, these 2 arrays line up with each other
    var donationStringArr = []; // array with donations as strings
    var sponNamesArr = []; // array with sponsor names
    var [newSponTable, setNewSponTable] = useState();
    const [thereAreSponsors, setThereAreSponsors] = useState(true);

    var [message, setMessage] = useState('');

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

      function traverseSponsors(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            donationArr.push(objName[prop]['level_pledged']); // all donations are calculated, whether anonymous or not
            // only non-anonymous donations are displayed along with sponsor names
            //if (objName[prop]['anon'] === false) { 
              switch (objName[prop]['level_pledged']) { // capitalize level name
                case 'redwood':
                  objName[prop]['level_pledged'] = '1,000';
                  break;
                case 'maple':
                  objName[prop]['level_pledged'] = '500';
                  break;
                case 'seedling':
                  objName[prop]['level_pledged'] = '200';
                  break;
                case 'individual':
                  objName[prop]['level_pledged'] = '50';
                  break;
              }
              sponArr.push(objName[prop]);
              sponIdArr.push(objName[prop]['sponsorid'])
              donationStringArr.push(objName[prop]['level_pledged']);
            //}
          }
        }
        for (var i = 0; i < donationArr.length; i++) {
          switch (donationArr[i]) {
            case 'redwood':
              donationNumArr.push(1000);
              break;
            case 'maple':
              donationNumArr.push(500);
              break;
            case 'seedling':
              donationNumArr.push(200);
              break;
            case 'individual':
              donationNumArr.push(50);
              break;
          }
        }
        var sumDonations = donationNumArr.reduce((partial_sum, a) => partial_sum + a, 0);
        setNumFreeTrees(Math.floor(sumDonations / 5));
        setSponProps(sponArr);
        return sponArr;
      }

      function traverseSponNames(objName) {
        for (var i = 0; i < sponIdArr.length; i++) {
          for (const prop in objName) {
            if (objName[prop]['sponsorid'] === sponIdArr[i]) {
              objName[prop]['name'] = toTitleCase(objName[prop]['name']);
              sponIdTableArr.push(objName[prop]);
              sponNamesArr.push(objName[prop]['name']);
            }
          }
        }
        setSponIdProps(sponIdTableArr);
        setNewSponTable(sponNamesArr.map(renderNewSponTable));
        if (sponNamesArr.length == 0) {
          setMessage('Sponsors will appear here once they submit their donations.');
          setThereAreSponsors(false);
        }
        return sponIdTableArr;
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
          fetch('/api/schoolname', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
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
          fetch('/api/treegoal', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
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
          fetch('/api/numtreesrequested', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
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
          fetch('/api/volunteers', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
          .then(res => res.json())
          .then(data => JSON.parse(data.vol))
          .then(jsonObj => traverseVolunteers(jsonObj, u))
          .then(x => {
            resolve(x);
          });
        });
      }

      function getSponsorNames() {
        return new Promise(resolve => {
          fetch('/api/sponinfo', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
          .then(res => res.json())
          .then(data => JSON.parse(data.sponinfo))
          .then(jsonObj => traverseSponNames(jsonObj)) // no need to traverse using schoolid
          .then(x => {
            resolve(x);
          });
        });
      }

      function getSponsors(u) {
        return new Promise(resolve => {
          fetch('/api/spon', {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
          .then(res => res.json())
          .then(data => JSON.parse(data.spon))
          .then(jsonObj => traverseSponsors(jsonObj, u))
          .then(x => {
            resolve(x);
          });
        });
      }

      function getSpecies(u) {
        return new Promise(resolve => {
          fetch(`/api/species/${u}`, {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
          .then(res => res.json())
          .then(data => JSON.parse(data.species))
          .then(x => {
            resolve(x); // this is a json object with the format {'species1':100, 'species2':200, 'key':value}
            setSpeciesNames(Object.keys(x)); // the species names are the keys
            setSpeciesVals(Object.values(x)); // the request numbers are the values
            const arrayFormat = Object.keys(x).map(key => ({[key]: x[key]})); // this is an array
            setSpecProps(arrayFormat); // array needed for export to CSV button
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
        getSpecies(numUsername);
        getSponsors(numUsername);
        getSponsorNames();
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

    const renderNewSponTable = (item, idx) => {
      return (
        <tr>
          <td>{sponNamesArr[idx]}</td>
          <td>{donationStringArr[idx]}</td>
        </tr>
      )
    }

    return (
            <div className="page-container">
                <div className="content-wrap">
                    <div className={"bg-light-green view-entire"}>
                        <div className="w-500 h-500 d-flex align-items-center justify-content-between flex-column">
                            <div className="title">
                                Welcome, {schoolName}!
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
                                    <Chart treeGoalPercent={goalPercent} specNames={speciesNames} specValues={speciesVals}/>
                                    <ExportTreeRequestsButton specData = {specProps}/>
                                </Container>
                                <Container className="custom-col-3">
                                    <p className="col-title-text">Announcements</p>
                                    <Announcements />
                                    <hr className = "hline"/>
                                    <p className="col-title-text">Sponsorships</p>
                                    {thereAreSponsors && <ReactBootStrap.Table className="table">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Donation Amount ($)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {newSponTable}
                                        </tbody>
                                    </ReactBootStrap.Table>}
                                    <p>{message}</p>
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
