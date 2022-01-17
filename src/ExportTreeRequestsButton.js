import React, { useState, useEffect, useRef} from 'react';
import {Button} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import {Container} from "reactstrap";

const ExportTreeRequestsButton = (props) => {
    const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

    const clickLink = async () => {
        csvLink.current.link.click()
    }

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    // new excel vars
    var [uniqueSpecies, setUniqueSpecies] = useState(["Place","Holder","Species"]);
    var [custNames, setCustNames] = useState([]);
    var [specOne, setSpecOne] = useState([]);
    var [specTwo, setSpecTwo] = useState([]);
    var [specThree, setSpecThree] = useState([]);
    var [submitTime, setSubmitTime] = useState([]);
    var [address, setAddress] = useState([]);
    var [zip, setZip] = useState([]);
    var [email, setEmail] = useState([]);
    var [phone, setPhone] = useState([]);
    var [pickup, setPickup] = useState([]);
    var [finalArr, setFinalArr] = useState([]);

    function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
      var text = str.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
      return text;
    }

    function traverseThreeSpecies(objName, schoolidnum) {
        for (const prop in objName) {
            var threeSpeciesTemp = ["Place","Holder","Species"];
            threeSpeciesTemp[0] = objName[prop]['species_one'];
            threeSpeciesTemp[1] = objName[prop]['species_two'];
            threeSpeciesTemp[2] = objName[prop]['species_three'];
            setUniqueSpecies(threeSpeciesTemp);
        }
      }

    function traverseTreeOrders(objName, schoolidnum) {
        var custNamesTemp = [];
        var specOneTemp = [];
        var specTwoTemp = [];
        var specThreeTemp = [];
        var submitTimeTemp = [];
        var addressTemp = [];
        var emailTemp = [];
        var zipTemp = [];
        var phoneTemp = [];
        var pickupTemp = [];
        for (const prop in objName) {
          custNamesTemp.push(objName[prop]['cust_name']);
        }
        custNamesTemp = Array.from(new Set(custNamesTemp));
        for (var i = 0; i < custNamesTemp.length; i++) {
          var person = custNamesTemp[i];
          var specOnePushed = false;
          var specTwoPushed = false;
          var specThreePushed = false;
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
        var finalArrTemp = [];
        finalArrTemp[0] = ["Customer Name"].concat(uniqueSpecies, ["Address"], ["Zip Code"], ["Pickup"], ["Email"], ["Phone Number"], ["Submit Date"]);
        for (var i = 0; i < custNamesTemp.length; i++) {
          finalArrTemp[i + 1] = [custNamesTemp[i], specOneTemp[i], specTwoTemp[i], specThreeTemp[i], addressTemp[i], zipTemp[i], pickupTemp[i], emailTemp[i], phoneTemp[i], new Date(submitTimeTemp[i]*1000).toString()];
        }
        setFinalArr(finalArrTemp);
      }

    // new function for excel tree species vars
    function getTreeOrders(u) {
        return new Promise(resolve => {
          fetch(`/api/treeorders/${u}`, {
            headers: new Headers({
              'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
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

    // data used to be {props.specData}

    useEffect(() => {
        getTreeOrders(props.user);
      }, [uniqueSpecies, finalArr]);

    return (
        <div>
            <Container className="btn-center">
                <Button
                    className = "btn-login-opp btn-trans"
                    size = "lg"
                    onClick={clickLink}>Download as Excel Sheet</Button>
                <CSVLink
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
