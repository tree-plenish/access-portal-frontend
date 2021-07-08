import React, { useState, useRef} from 'react';
import {Button} from 'react-bootstrap';
import { treeRequestData } from './Data';
import { CSVLink } from 'react-csv';
import {Container} from "reactstrap";

const ExportTreeRequestsButton = () => {
    const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const clickLink = async () => {
        csvLink.current.link.click()
    }

    return (
        <div>
            <Container className="btn-center">
                <Button
                    className = "btn-login-opp btn-trans"
                    size = "lg"
                    onClick={clickLink}>Download as Excel Sheet</Button>
                <CSVLink
                    data={treeRequestData}
                    filename='treeRequestData.csv'
                    className='hidden'
                    ref={csvLink}
                    target='_blank'
                />
            </Container>
        </div>
    )
}

export default ExportTreeRequestsButton;
