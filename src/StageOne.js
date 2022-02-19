import React, { useState, useEffect } from "react";
import {Container} from "reactstrap";
import Announcements from './Announcements';
import { sponsorshipData } from './Data';
import * as ReactBootStrap from "react-bootstrap";
import impactPic from './assets/impact-2020.png';

const StageOne = ( prevInfo ) => {

    const [username, setUsername] = useState(prevInfo.prevUsername); // username is a STRING
    const numUsername = Number(username);
    const [password, setPassword] = useState(prevInfo.prevPassword); // password is a STRING
    const [schoolName, setSchoolName] = useState();

    var donationArr = []; // raw donation levels (a, b, c, d)
    var donationNumArr = []; // corresponding numbers (1000, 500, 200, 50)
    const [totalDonations, setTotalDonations] = useState();
    const [numTreesReq, setNumTreesReq] = useState();
    const [numFreeTrees, setNumFreeTrees] = useState();
    const [remainingTrees, setRemainingTrees] = useState();
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

    // Note: at each index, these 2 arrays line up with each other
    var donationStringArr = []; // array with donations as strings
    var sponNamesArr = []; // array with sponsor names
    var [newSponTable, setNewSponTable] = useState();
    const [thereAreSponsors, setThereAreSponsors] = useState(true);

    var [message, setMessage] = useState('');

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    function traverseSchoolName(objName, schoolidnum) {
        for (const prop in objName) {
          return objName[prop]['name'];
        }
      }

      function traverseTreesRequested(objName, schoolidnum) {
        for (const prop in objName) {
          setNumFreeTrees(objName[prop]['total_free_trees']);
          setRemainingTrees(objName[prop]['remaining_free_trees']);
          return objName[prop]['trees_requested'];
        }
      }

      function traverseSponsors(objName, schoolidnum) {
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
              sponIdArr.push(objName[prop]['sponsorid']);
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
        setTotalDonations(sumDonations);
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
            'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
        .then(res => res.json())
        .then(data => {
          setSchoolName(toTitleCase(traverseSchoolName(JSON.parse(data.name), u)));
          setNumTreesReq(traverseTreesRequested(JSON.parse(data.numtreesreq), u));
          traverseSponsors(JSON.parse(data.spon));
          traverseSponNames(JSON.parse(data.sponinfo));
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
                                <p className="col-title-text">Sponsorships</p>
                                <h2 className="total-donations">Total Amount Raised: ${totalDonations}</h2>
                                <h3>List of Sponsors</h3>
                                <div>
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
                                </div>
                                  <p>{message}</p>
                                <ul>
                                  <li>Free Trees Left Available: {Math.max(remainingTrees, 0)}</li>
                                  <li>Free Trees You Received: {numFreeTrees}</li>
                                </ul>
                            </Container>
                            <Container className="custom-col-3">
                                <p className="col-title-text">Our 2020 Impact</p>
                                <div className="rot-wrapper">
                                    <div className="static-txt">Trees</div>
                                    <ul className="dynamic-txts">
                                        <li className="dynamic-txt-ele">help us breathe.</li>
                                        <li className="dynamic-txt-ele">reduce climate change.</li>
                                        <li className="dynamic-txt-ele">save money.</li>
                                        <li className="dynamic-txt-ele">save energy.</li>
                                    </ul>
                                </div>
                                <img className="impact-pic" src={impactPic} />
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
