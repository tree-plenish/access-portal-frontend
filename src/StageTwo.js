import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sponsorshipData } from './Data';
import { Container } from "reactstrap";
import * as ReactBootStrap from "react-bootstrap";
import Chart from './Chart';
import Announcements from './Announcements';
import ExportTreeRequestsButton from './ExportTreeRequestsButton';
import Leaderboard from "./Leaderboard";

const StageTwo = (prevInfo) => {

  const username = prevInfo.prevUsername;
  const numUsername = Number(username);
  //const password = prevInfo.prevPassword;

  let apiU = 'admin';
  let apiP = 'preeTlenish1#';

  const [schoolName, setSchoolName] = useState();
  const [treeGoal, setTreeGoal] = useState();
  const [numTreesReq, setNumTreesReq] = useState();
  const [goalPercent, setGoalPercent] = useState();
  const [specProps, setSpecProps] = useState([
    { name: "Species", email: "iFeelGodInThisChilis@tn" },
    { name: "Placeholder", email: "catchYou@theFlipityFlip" }
  ]);
  const [speciesNames, setSpeciesNames] = useState(["Place", "Holder"]);
  const [speciesVals, setSpeciesVals] = useState([0, 0]);

  let donationArr = []; // raw donation levels (a, b, c, d)
  let donationNumArr = []; // corresponding numbers (1000, 500, 200, 50)var donationArr = [];
  const [numFreeTrees, setNumFreeTrees] = useState();
  const [remainingTrees, setRemainingTrees] = useState();
  let sponArr = [];
  //var [sponTable, setSponTable] = useState();
  const [sponProps, setSponProps] = useState([
    { name: "Place", email: "iFeelGodInThisChilis@tn" },
    { name: "Holder", email: "catchYou@theFlipityFlip" }
  ]);
  let sponIdArr = [];
  let sponIdTableArr = [];
  //var [sponIdTable, setSponIdTable] = useState();
  const [sponIdProps, setSponIdProps] = useState([
    { name: "Place", email: "iFeelGodInThisChilis@tn" },
    { name: "Holder", email: "catchYou@theFlipityFlip" }
  ]);

  // Note: at each index, these 2 arrays line up with each other
  let donationStringArr = []; // array with donations as strings
  let sponNamesArr = []; // array with sponsor names
  const [newSponTable, setNewSponTable] = useState();
  const [thereAreSponsors, setThereAreSponsors] = useState(true);

  const [message, setMessage] = useState('');

  function traverseSchoolName(objName) {
    for (const prop in objName) {
      return objName[prop]['name'];
    }
  }

  function traverseTreeGoal(objName) {
    for (const prop in objName) {
      return objName[prop]['tree_goal'];
    }
  }

  function traverseTreesRequested(objName) {
    for (const prop in objName) {
      setNumFreeTrees(objName[prop]['total_free_trees']);
      setRemainingTrees(objName[prop]['remaining_free_trees']);
      return objName[prop]['trees_requested'];
    }
  }

  function traverseSponsors(objName) {
    for (const prop in objName) {
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
    var sumDonations = donationNumArr.reduce((partial_sum, a) => partial_sum + a, 0); // find sum of array
    //setNumFreeTrees(Math.floor(sumDonations / 5));
    setSponProps(sponArr);
    return sponArr;
  }

  function traverseSponNames(objName) {
    for (var i = 0; i < sponIdArr.length; i++) {
      for (const prop in objName) {
        if (objName[prop]['sponsorid'] === sponIdArr[i]) {
          //objName[prop]['name'] = toTitleCase(objName[prop]['name']);
          sponIdTableArr.push(objName[prop]);
          sponNamesArr.push(toTitleCase(objName[prop]['name']));
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

  function getData(u) {
    return new Promise(resolve => {
      fetch(`/api/dashdata/${u}`, {
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(apiU + ":" + apiP),
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
        .then(res => res.json())
        .then(data => {
          setSchoolName(toTitleCase(traverseSchoolName(JSON.parse(data.name), u)));
          setNumTreesReq(traverseTreesRequested(JSON.parse(data.numtreesreq), u));
          setTreeGoal(traverseTreeGoal(JSON.parse(data.treegoal), u));
          calculateGoalPercentage(traverseTreesRequested(JSON.parse(data.numtreesreq), u), traverseTreeGoal(JSON.parse(data.treegoal), u));
          traverseSponsors(JSON.parse(data.spon));
          traverseSponNames(JSON.parse(data.sponinfo));
          setSpeciesNames(Object.keys(data.species)); // the species names are the keys
          setSpeciesVals(Object.values(data.species)); // the request numbers are the values
        });
    });
  }

  function calculateGoalPercentage(numReqParam, goalParam) {
    let numerator = Number(numReqParam);
    let denominator = Number(goalParam);
    let percent = Math.round(numerator / denominator * 100);
    setGoalPercent(percent);
  }

  useEffect(() => {
    getData(numUsername);
  }, []);

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
              <h3>Welcome, {schoolName}!</h3>
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
                <Chart treeGoalPercent={goalPercent} specNames={speciesNames} specValues={speciesVals} />
                <ExportTreeRequestsButton user={numUsername} />
              </Container>
              <Container className="custom-col-3">
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
                  <li>Free Trees Left Available: {Math.max(remainingTrees, 0)}</li>
                  <li>Free Trees You Received: {numFreeTrees}</li>
                </ul>
                <hr className="hline" />
                <Leaderboard schoolName={schoolName} />
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
