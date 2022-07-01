import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { Container } from "reactstrap";

const ExportTreeRequestsButton = (props) => {
  const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

  const clickLink = async () => {
    csvLink.current.link.click()
  }

  let apiU = 'admin';
  let apiP = 'preeTlenish1#';

  const [finalArr, setFinalArr] = useState([]);
  const [headers1, setHeaders1] = useState([ // placeholder values
    { label: "Team ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email or Phone", key: "email" },
  ]);

  function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
    let text = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return text;
  }

  function traverseTreeOrders(objName) {
    let headersTemp = [];
    let keys = Object.keys(objName[0]);
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      headersTemp.push({ label: keys[i], key: keys[i] });
    }
    setHeaders1(headersTemp);
    let ordersTemp = [];
    for (const prop in objName) {
      ordersTemp.push(objName[prop]);
    }
    setFinalArr(ordersTemp);
  }

  // new function for excel tree species vars
  function getTreeOrders(u) {
    return new Promise(resolve => {
      fetch(`/api/treeorders/${u}`, {
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(apiU + ":" + apiP),
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
        .then(res => res.json())
        .then(data => {
          traverseTreeOrders(JSON.parse(data.order));
        });
    });
  }

  useEffect(() => {
    getTreeOrders(props.user);
  }, [finalArr]);

  return (
    <div>
      <Container className="btn-center">
        <Button
          className="btn-login-opp btn-trans"
          size="lg"
          onClick={clickLink}>Download as Excel Sheet</Button>
        <CSVLink
          headers={headers1}
          data={finalArr}
          filename='tree-plenish-tree-requests.csv'
          className='hidden'
          ref={csvLink}
          target='_blank'
        />
      </Container>
    </div>
  )
}

export default ExportTreeRequestsButton;
