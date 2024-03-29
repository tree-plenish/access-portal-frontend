import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Announcements from './Announcements';
import ToDo from './ToDo';
import { Button } from 'react-bootstrap';
import * as ReactBootStrap from "react-bootstrap";
import impactPic from './assets/impact-2022.png';

const StageOne = (prevInfo) => {

  let apiU = 'admin';
  let apiP = 'preeTlenish1#';

  const username = prevInfo.prevUsername; // username is a STRING
  const numUsername = Number(username);
  const [schoolName, setSchoolName] = useState();

  // To Do List
  const [flagList, setFlagList] = useState([]);

  // Sponsors
  let donationNumArr = []; // corresponding numbers (1000, 500, 200, 50)
  const [totalDonations, setTotalDonations] = useState();
  const [numFreeTrees, setNumFreeTrees] = useState();

  let sponNamesArr = []; // array with sponsor names
  let sponEmailArr = [];
  const [newSponTable, setNewSponTable] = useState();
  const [thereAreSponsors, setThereAreSponsors] = useState(true);

  let sponValidArr = []; // corresponding boolean values

  const [message, setMessage] = useState('');
  const [sponFormLink, setSponFormLink] = useState();

  // Sponsor Button
  const [showSponsors, setShowSponsors] = useState(false);

  function hideSponsors() {
    setShowSponsors(!showSponsors);
  }

  function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
    var text = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return text;
  }

  function traverseSchoolName(objName) {
    for (const prop in objName) {
      if (objName[prop]['free_trees_given'] == null) {
        setNumFreeTrees(0);
      } else {
        setNumFreeTrees(objName[prop]['free_trees_given']);
      }
      return objName[prop]['name'];
    }
  }

  function traverseSponsors(objNameSpon, objNameFlag, objNameLink) {
    for (const prop in objNameSpon) {
      donationNumArr.push(objNameSpon[prop]['value']); // all donations are calculated, whether anonymous or not
      sponNamesArr.push(objNameSpon[prop]['name']);
      sponEmailArr.push(objNameSpon[prop]['email']);
      if (objNameSpon[prop]['is_valid'] === false) {
        sponValidArr.push('Not Validated');
      } else {
        sponValidArr.push('Valid');
      }
    }
    let sumDonations = donationNumArr.reduce((partial_sum, a) => partial_sum + a, 0); // find sum of array
    setTotalDonations(sumDonations);
    setNewSponTable(sponNamesArr.map(renderNewSponTable));
    if (sponNamesArr.length == 0) {
      setMessage('Sponsors will appear here once they submit their donations.');
      setThereAreSponsors(false);
    }
    let flagsTemp = [];
    for (const prop in objNameFlag) {
      flagsTemp.push(objNameFlag[prop]['submitted_tree_info']);
      flagsTemp.push(objNameFlag[prop]['submitted_epf']);
    }
    flagsTemp.push(sumDonations);
    for (const prop in objNameLink) {
      flagsTemp.push(objNameLink[prop]['sponsor']);
      setSponFormLink(objNameLink[prop]['sponsor']);
    }
    setFlagList(flagsTemp);
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
          traverseSponsors(JSON.parse(data.spon), JSON.parse(data.flags2), JSON.parse(data.sponlink));
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
        <td>{sponEmailArr[idx]}</td>
        <td>{sponValidArr[idx]}</td>
      </tr>
    )
  }

  let sponFormLinkTag = <a className="in-line" href={sponFormLink}>{sponFormLink}</a>

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
                <p className="col-title-text">To Do List</p>
                <ToDo flags={flagList} />
                <p className="col-title-text">Announcements</p>
                <Announcements />
              </Container>
              <Container className="custom-col-2">
                <p className="col-title-text">Sponsorships</p>
                <h2 className="center">${totalDonations}</h2>
                <p className="center">total amount raised</p>
                <div className="center">
                  <p>Send businesses this sponsorship form: {sponFormLinkTag}</p>
                </div>
                <Container className="btn-center">
                  <Button className="btn-login-opp btn-trans" size="lg" onClick={hideSponsors}>
                    View Sponsor Details
                  </Button>
                </Container>
                {showSponsors && <div>
                  <div>
                    {thereAreSponsors && <ReactBootStrap.Table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Donation Amount ($)</th>
                          <th>Email</th>
                          <th>Valid?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newSponTable}
                      </tbody>
                    </ReactBootStrap.Table>}
                  </div>
                  <p>{message}</p>
                  <p>For sponsorships submitted via check, they will be validated once we receive it.</p>
                  <ul>
                    <li>Free Saplings Given: {numFreeTrees}</li>
                  </ul>
                </div>}
                <hr className="hline" />
                <p className="col-title-text">Our 2022 Impact</p>
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
              Tree-Plenish. Empowering youth to create a more sustainable and equitable future through community tree-planting.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StageOne;