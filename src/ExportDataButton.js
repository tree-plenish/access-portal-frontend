import React, { useState, useRef} from 'react';
import {Button} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import {Container} from "reactstrap";

const ExportDataButton = (props) => {
    const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const clickLink = async () => {
        csvLink.current.link.click()
    }

    var headers = [
        { label: "Team ID", key: "teamid" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Driver's License", key: "drivers_license" }
    ];

    return (
        <div>
            <Container className="btn-center">
            <Button
                className = "btn-login-opp btn-trans"
                size = "lg"
                onClick={clickLink}>Download as Excel Sheet</Button>
            <CSVLink
                data={props.volData}
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
