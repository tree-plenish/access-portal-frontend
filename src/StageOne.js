import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Container} from "reactstrap";
import Announcements from './Announcements';
import { sponsorshipData } from './Data';
import * as ReactBootStrap from "react-bootstrap";
import Chart from "./Chart";

const StageOne = ( prevInfo ) => {

    const [username, setUsername] = useState(prevInfo.prevUsername); // username is a STRING
    const numUsername = Number(username);
    const [password, setPassword] = useState(prevInfo.prevPassword); // password is a STRING
    const [schoolName, setSchoolName] = useState();

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    function traverseSchoolName(objName, schoolidnum) {
        for (const prop in objName) {
          if (objName[prop]['schoolid'] === schoolidnum) {
            return objName[prop]['name'];
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

      useEffect(() => {
        getSchoolName(numUsername);
      }, []);

    const renderSponsors = (sponsor, index) => {
        return(
            <tr key={{index}}>
                <td>{sponsor.name}</td>
                <td>{sponsor.amount}</td>
            </tr>
        )
    }

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
                            <Announcements />
                            </Container>
                            <Container className="custom-col-2">
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
                            </Container>
                            <Container className="custom-col-3">
                                <p className="col-title-text">Helpful Links</p>
                                <ul>
                                    <li><a href="https://www.tree-plenish.org">Tree Plenish Website</a></li>
                                    <li><a href="https://www.wikihow.com/Plant-a-Tree">How to Plant a Tree</a></li>
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

export default StageOne;
