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

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

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

    var donationArr = []; // raw donation levels (a, b, c, d)
    var donationNumArr = []; // corresponding numbers (1000, 500, 200, 50)var donationArr = [];
    const [numFreeTrees, setNumFreeTrees] = useState();
    var sponArr = [];
    var [sponTable, setSponTable] = useState();
    var [sponProps, setSponProps] = useState([
      { name: "Place", email: "iFeelGodInThisChilis@tn" },
      { name: "Holder", email: "catchYou@theFlipityFlip" }
    ]);
    var sponIdArr = [];
    var sponIdTableArr = [];
    var [sponIdTable, setSponIdTable] = useState();
    var [sponIdProps, setSponIdProps] = useState([
      { name: "Place", email: "iFeelGodInThisChilis@tn" },
      { name: "Holder", email: "catchYou@theFlipityFlip" }
    ]);

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

      function traverseSponsors(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            donationArr.push(objName[prop]['level_pledged']); // all donations are calculated, whether anonymous or not
            // only non-anonymous donations are displayed along with sponsor names
            if (objName[prop]['anon'] === false) { 
              switch (objName[prop]['level_pledged']) { // capitalize level name
                case 'redwood':
                  objName[prop]['level_pledged'] = 'Redwood';
                  break;
                case 'maple':
                  objName[prop]['level_pledged'] = 'Maple';
                  break;
                case 'seedling':
                  objName[prop]['level_pledged'] = 'Seedling';
                  break;
                case 'individual':
                  objName[prop]['level_pledged'] = 'Individual';
                  break;
              }
              sponArr.push(objName[prop]);
              sponIdArr.push(objName[prop]['sponsorid'])
            }
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
        var sumDonations = donationNumArr.reduce((partial_sum, a) => partial_sum + a, 0); // find sum of array
        setNumFreeTrees(Math.floor(sumDonations / 5));
        setSponProps(sponArr);
        setSponTable(sponArr.map(renderSponsors)); // method to make sure the table renders with updated data
        return sponArr;
      }
  
      function traverseSponNames(objName) {
        for (const prop in objName) {
          for (var i = 0; i < sponIdArr.length; i++) {
            if (objName[prop]['sponsorid'] === sponIdArr[i]) {
              sponIdTableArr.push(objName[prop]);
            }
          }
        }
        setSponIdProps(sponIdTableArr);
        setSponIdTable(sponIdTableArr.map(renderSponNames));
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
        getSponsors(numUsername);
        getSponsorNames();
      }, [numTreesReq, treeGoal]);

    const renderSponsors = (sponsor, index) => {
        return(
            <tr key={{index}}>
                <td>{sponsor.sponsorid}</td>
                <td>{sponsor.level_pledged}</td>
            </tr>
        )
    }

    const renderSponNames = (sponName, index) => {
      return(
          <tr key={{index}}>
              <td>{sponName.name}</td>
              <td>{sponName.sponsorid}</td>
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
                                <Chart treeGoalPercent={goalPercent} specNames={speciesNames} specValues={speciesVals}/>
                                <ExportTreeRequestsButton specData = {specProps}/>
                            </Container>
                            <Container className="custom-col-3">
                                <p className="col-title-text">Sponsorships</p>
                                <ReactBootStrap.Table className="table">
                                        <thead>
                                        <tr>
                                            <th>Sponsor ID</th>
                                            <th>Level Pledged</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sponTable}
                                        </tbody>
                                    </ReactBootStrap.Table>
                                    <ReactBootStrap.Table className="table">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Sponsor ID</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sponIdTable}
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
