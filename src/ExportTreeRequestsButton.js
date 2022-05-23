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

  // new excel vars
  const [uniqueSpecies, setUniqueSpecies] = useState(["Place", "Holder", "Species"]);
  const [custNames, setCustNames] = useState([]);
  const [specOne, setSpecOne] = useState([]);
  const [specTwo, setSpecTwo] = useState([]);
  const [specThree, setSpecThree] = useState([]);
  const [submitTime, setSubmitTime] = useState([]);
  const [address, setAddress] = useState([]);
  const [zip, setZip] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [pickup, setPickup] = useState([]);
  const [finalArr, setFinalArr] = useState([]);

  // refund table vars
  const [refTable, setRefTable] = useState();
  const [refProps, setRefProps] = useState([
    { name: "Place", email: "iFeelGodInThisChilis@tn", phone: "123-456-7890", price_refunded: "50" },
    { name: "Holder", email: "catchYou@theFlipityFlip", phone: "123-456-7890", price_refunded: "80" }
  ]);
  let refArr = [];

  function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
    let text = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return text;
  }

  function traverseThreeSpecies(objName, schoolidnum) {
    for (const prop in objName) {
      let threeSpeciesTemp = ["Place", "Holder", "Species"];
      threeSpeciesTemp[0] = objName[prop]['species_one'];
      threeSpeciesTemp[1] = objName[prop]['species_two'];
      threeSpeciesTemp[2] = objName[prop]['species_three'];
      setUniqueSpecies(threeSpeciesTemp);
    }
  }

  function traverseTreeOrders(objName, schoolidnum) {
    let custNamesTemp = [];
    let specOneTemp = [];
    let specTwoTemp = [];
    let specThreeTemp = [];
    let submitTimeTemp = [];
    let addressTemp = [];
    let emailTemp = [];
    let zipTemp = [];
    let phoneTemp = [];
    let pickupTemp = [];
    for (const prop in objName) {
      custNamesTemp.push(objName[prop]['cust_name']);
    }
    custNamesTemp = Array.from(new Set(custNamesTemp));
    for (let i = 0; i < custNamesTemp.length; i++) {
      let person = custNamesTemp[i];
      let specOnePushed = false;
      let specTwoPushed = false;
      let specThreePushed = false;
      for (const prop in objName) {
        if (person == objName[prop]['cust_name']) {
          if (objName[prop]['name'] == uniqueSpecies[0]) {
            specOneTemp.push(objName[prop]['number']);
            specOnePushed = true;
          } else if (objName[prop]['name'] == uniqueSpecies[1]) {
            specTwoTemp.push(objName[prop]['number']);
            specTwoPushed = true;
          } else if (objName[prop]['name'] == uniqueSpecies[2]) {
            specThreeTemp.push(objName[prop]['number']);
            specThreePushed = true;
          }
          submitTimeTemp[i] = objName[prop]['submit_time'];
          addressTemp[i] = toTitleCase(objName[prop]['address']);
          emailTemp[i] = objName[prop]['cust_email'];
          zipTemp[i] = objName[prop]['cust_zipcode'];
          phoneTemp[i] = objName[prop]['cust_phone_num'];
          if (objName[prop]['pickup']) {
            pickupTemp[i] = "Yes";
          } else {
            pickupTemp[i] = "No";
          }
        }
      }
      if (!specOnePushed) {
        specOneTemp.push(0);
      }
      if (!specTwoPushed) {
        specTwoTemp.push(0);
      }
      if (!specThreePushed) {
        specThreeTemp.push(0);
      }
    }
    setCustNames(custNamesTemp);
    setSpecOne(specOneTemp);
    setSpecTwo(specTwoTemp);
    setSpecThree(specThreeTemp);
    setSubmitTime(submitTimeTemp);
    setAddress(addressTemp);
    setEmail(emailTemp);
    setPhone(phoneTemp);
    setZip(zipTemp);
    setPickup(pickupTemp);
    let finalArrTemp = [];
    finalArrTemp[0] = ["Customer Name"].concat(uniqueSpecies, ["Address"], ["Zip Code"], ["Pickup"], ["Email"], ["Phone Number"], ["Submit Date"]);
    for (let i = 0; i < custNamesTemp.length; i++) {
      finalArrTemp[i + 1] = [custNamesTemp[i], specOneTemp[i], specTwoTemp[i], specThreeTemp[i], addressTemp[i], zipTemp[i], pickupTemp[i], emailTemp[i], phoneTemp[i], new Date(submitTimeTemp[i] * 1000).toString()];
    }
    setFinalArr(finalArrTemp);
  }

  function traverseRefunds(objName) {
    for (const prop in objName) {
      refArr.push(objName[prop]);
    }
    setRefProps(refArr);
    setRefTable(refArr.map(renderRefunds)); // method to make sure the table renders with updated data
    return refArr;
  }

  const renderRefunds = (refund, index) => {
    return (
      <tr key={{ index }}>
        <td>{refund.name}</td>
        <td>{refund.email}</td>
        <td>{refund.phone}</td>
        <td>{refund.num_trees}</td>
      </tr>
    )
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
          traverseThreeSpecies(JSON.parse(data.threespecies));
          traverseTreeOrders(JSON.parse(data.order));
        });
    });
  }

  useEffect(() => {
    getTreeOrders(props.user);
  }, [uniqueSpecies, finalArr]);

  return (
    <div>
      <Container className="btn-center">
        <Button
          className="btn-login-opp btn-trans"
          size="lg"
          onClick={clickLink}>Download as Excel Sheet</Button>
        <CSVLink
          data={finalArr}
          filename='tree-plenish-tree-requests.csv'
          className='hidden'
          ref={csvLink}
          target='_blank'
        />
      </Container>
      {/* <Container className="center">
              <p className="col-title-text">Tree Refunds</p>
              <p>Refunds are not accounted for in the above tree orders. Manually subtract the refunds.</p>
              <ReactBootStrap.Table className="table">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Trees Refunded</th>
                  </tr>
                  </thead>
                  <tbody>
                    {refTable}
                  </tbody>
                </ReactBootStrap.Table>
            </Container> */}
    </div>
  )
}

export default ExportTreeRequestsButton;
