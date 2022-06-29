import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Announcements from './Announcements';
import { sponsorshipData } from './Data';
import * as ReactBootStrap from "react-bootstrap";
import impactPic from './assets/impact-2020.png';

const StageOne = (prevInfo) => {

  let apiU = 'admin';
  let apiP = 'preeTlenish1#';

  const [username] = prevInfo.prevUsername; // username is a STRING
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

  function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
    var text = str.toLowerCase()
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
                  <li>Free Trees Sponsors Have Funded: {freeTreesSponsors}</li>
                  <li>Free Trees Given: {numFreeTrees}</li>
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
