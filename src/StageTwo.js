import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sponsorshipData } from './Data';
import {Container} from "reactstrap";
import * as ReactBootStrap from "react-bootstrap";
import Chart from './Chart';
import Announcements from './Announcements';
import ExportTreeRequestsButton from './ExportTreeRequestsButton';

const StageTwo = ( prevInfo ) => {

    const username = prevInfo.prevUsername;
    const numUsername = Number(username);
    const password = prevInfo.prevPassword;

    const [schoolName, setSchoolName] = useState();
    const [treeGoal, setTreeGoal] = useState();
    const [numTreesReq, setNumTreesReq] = useState();
    const [goalPercent, setGoalPercent] = useState();
    var [specProps, setSpecProps] = useState([
      { name: "Species", email: "iFeelGodInThisChilis@tn" },
      { name: "Placeholder", email: "catchYou@theFlipityFlip" }
    ]);
    var [speciesNames, setSpeciesNames] = useState(["Place","Holder"]);
    var [speciesVals, setSpeciesVals] = useState([105,204]);

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

      function getSpecies(u) {
        return new Promise(resolve => {
          fetch(`/api/species/${u}`)
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
        getSpecies(numUsername);
      }, [numTreesReq, treeGoal]);

    const renderSponsors = (sponsor, index) => {
        return(
            <tr key={{index}}>
                <td>{sponsor.name}</td>
                <td>{sponsor.amount}</td>
            </tr>
        )
    }

    const numFreeTrees = 150;

    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className={"bg-light-green view-entire"}>
                    <div className="w-500 h-500 d-flex align-items-center justify-content-between flex-column">
                        <div className="title">
                            <h3>Welcome, {schoolName} High School!</h3>
                        </div>
                        <div className="flex-container w-100">
                            <Container className="custom-col-1">
                            <p className="col-title-text">Announcements</p>
                            <Announcements />
                            </Container>
                            <Container className="custom-col-2">
                                <p className="col-title-text">Tree Requests</p>
                                <h2 className="center">{numTreesReq}</h2>
                                <p className="center">total requests received!</p>
                                <p>Progress to Goal of {treeGoal} Trees</p>
                                <Chart treeGoalPercent={goalPercent} specNames={speciesNames} specValues={speciesVals}/>
                                <ExportTreeRequestsButton specData = {specProps}/>
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
