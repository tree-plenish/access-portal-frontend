import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { Container } from "reactstrap";

const ExportDataButton = (props) => {
    const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const clickLink = async () => {
        csvLink.current.link.click()
    }

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    const [finalArr, setFinalArr] = useState([]);

    let headers = [
        { label: "Team ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Email or Phone", key: "email" },
        { label: "Time", key: "time" },
    ];

    function traverseVolunteers(objNameVol, objNameTeam) {
        let volunteerTemp = [];
        for (const prop in objNameVol) {
            volunteerTemp.push(objNameVol[prop]);
        }
        let teamTemp = [];
        for (const prop in objNameTeam) {
            teamTemp.push(objNameTeam[prop]);
        }
        let finalArrTemp = volunteerTemp;
        for (let k = 0; k < teamTemp.length; k++) {
            finalArrTemp.push({ id: teamTemp[k]['uuid'], name: "Team Leader", email: teamTemp[k]['phone'], time: "N/A" });
        }
        let teamIDs = finalArrTemp.map(a => a.id);
        teamIDs = teamIDs.filter((x, i, a) => a.indexOf(x) === i); // array with unique team ids
        let newTeamIDs = Array.from({ length: teamIDs.length }, (_, i) => i + 1); // array from [1, 2, ..., teamIDs.length]
        for (const item in finalArrTemp) {
            let index = 0;
            for (let j = 0; j < teamIDs.length; j++) {
                if (teamIDs[j] == finalArrTemp[item]['id']) {
                    index = j;
                }
            }
            finalArrTemp[item]['id'] = newTeamIDs[index]; // replace teamid with corresponding newTeamID value
        }
        finalArrTemp.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)); // sort by teamid in ascending order
        setFinalArr(finalArrTemp);
    }

    function getTeams(u) {
        return new Promise(resolve => {
            fetch(`/api/dashdata/${u}`, {
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(apiU + ":" + apiP),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
                .then(res => res.json())
                .then(data => {
                    traverseVolunteers(JSON.parse(data.vol), JSON.parse(data.team));
                });
        });
    }

    useEffect(() => {
        getTeams(props.user);
    }, []);

    return (
        <div>
            <Container className="btn-center">
                <Button
                    className="btn-login-opp btn-trans"
                    size="lg"
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
