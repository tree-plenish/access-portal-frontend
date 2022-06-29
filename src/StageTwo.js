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

  let apiU = 'admin';
  let apiP = 'preeTlenish1#';

  const username = prevInfo.prevUsername;
  const numUsername = Number(username);
  const [schoolName, setSchoolName] = useState();

  // Sponsors
  let donationNumArr = []; // corresponding numbers (1000, 500, 200, 50)
  const [totalDonations, setTotalDonations] = useState();
  const [numFreeTrees, setNumFreeTrees] = useState();
  const [freeTreesSponsors, setFreeTreesSponsors] = useState();

  let sponNamesArr = []; // array with sponsor names
  const [newSponTable, setNewSponTable] = useState();
  const [thereAreSponsors, setThereAreSponsors] = useState(true);

  const [message, setMessage] = useState('');

  // Tree Requests
  const [treeGoal, setTreeGoal] = useState();
  const [numTreesReq, setNumTreesReq] = useState();
  const [goalPercent, setGoalPercent] = useState();
  const [speciesNames, setSpeciesNames] = useState(['Place', 'Holder']);
  const [speciesVals, setSpeciesVals] = useState([100, 200]);

  function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
    let text = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return text;
  }

  function traverseSchoolName(objName) {
    for (const prop in objName) {
      setNumFreeTrees(objName[prop]['free_trees_given']);
      return objName[prop]['name'];
    }
  }

  function traverseSponsors(objName) {
    for (const prop in objName) {
      donationNumArr.push(objName[prop]['value']); // all donations are calculated, whether anonymous or not
      sponNamesArr.push(objName[prop]['name']);
    }
    let sumDonations = donationNumArr.reduce((partial_sum, a) => partial_sum + a, 0); // find sum of array
    setTotalDonations(sumDonations);
    setFreeTreesSponsors(Math.floor(sumDonations / 5));
    setNewSponTable(sponNamesArr.map(renderNewSponTable));
    if (sponNamesArr.length == 0) {
      setMessage('Sponsors will appear here once they submit their donations.');
      setThereAreSponsors(false);
    }
  }

  function calculateGoalPercentage(numReqParam, goalParam) {
    let numerator = Number(numReqParam);
    let denominator = Number(goalParam);
    let percent = Math.round(numerator / denominator * 100);
    setGoalPercent(percent);
  }

  function traverseTreeGoal(objName) {
    for (const prop in objName) {
      setNumTreesReq(objName[prop]['trees_ordered']);
      calculateGoalPercentage(objName[prop]['trees_ordered'], objName[prop]['tree_goal']);
      return objName[prop]['tree_goal'];
    }
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
          traverseSponsors(JSON.parse(data.spon));
          setTreeGoal(traverseTreeGoal(JSON.parse(data.treegoal), u));
          setSpeciesNames(Object.keys(data.species)); // the species names are the keys
          setSpeciesVals(Object.values(data.species)); // the request numbers are the values
        });
    });
  }

  useEffect(() => {
    getData(numUsername);
  }, []);

  const renderNewSponTable = (item, idx) => {
    return (
      <tr>
        <td>{sponNamesArr[idx]}</td>
        <td>{donationNumArr[idx]}</td>
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
                  <li>Free Trees Sponsors Have Funded: {freeTreesSponsors}</li>
                  <li>Free Trees Given: {numFreeTrees}</li>
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
