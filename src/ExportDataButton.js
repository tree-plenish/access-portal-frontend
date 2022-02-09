import React, { useState, useEffect, useRef} from 'react';
import {Button} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import {Container} from "reactstrap";

const ExportDataButton = (props) => {
    const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const clickLink = async () => {
        csvLink.current.link.click()
    }

    var [finalArr, setFinalArr] = useState([]);

    var headers = [
        { label: "Team ID", key: "teamid" },
        { label: "Name", key: "name" },
        { label: "Email or Phone", key: "email" },
    ];

    function traverseVolunteers(objNameVol, objNameTeam) {
        var volunteerTemp = [];
        for (const prop in objNameVol) {
            volunteerTemp.push(objNameVol[prop]);
        }
        var teamTemp = [];
        for (const prop in objNameTeam) {
            teamTemp.push(objNameTeam[prop]);
        }
        var finalArrTemp = volunteerTemp;
        for (var k = 0; k < teamTemp.length; k++) {
            finalArrTemp.push({teamid: teamTemp[k]['teamid'], name: "Team Leader", email: teamTemp[k]['phone']});
        }
        finalArrTemp.sort((a, b) => parseFloat(a.teamid) - parseFloat(b.teamid)); // sort by teamid in ascending order
        setFinalArr(finalArrTemp);
    }

    function getTeams(u) {
        return new Promise(resolve => {
          fetch(`/volunteers/${u}`)
          .then(res => res.json())
          .then(data => {
            traverseVolunteers(JSON.parse(data.vol), JSON.parse(data.team));
          });
        });
      }

    useEffect(() => {
        getTeams(props.user);
      }, [finalArr]);

    return (
        <div>
            <Container className="btn-center">
            <Button
                className = "btn-login-opp btn-trans"
                size = "lg"
                onClick={clickLink}>Download as Excel Sheet</Button>
            <CSVLink
                data={finalArr}
                headers={headers}
                filename='tree-plenish-volunteers.csv'
                className='hidden'
                ref={csvLink}
                target='_blank'
            />
            </Container>
        </div>
    )
}

export default ExportDataButton;
