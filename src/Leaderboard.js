import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import './App.css';

const Leaderboard = (props) => {

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    let unixStart = 1652673600; // Sun May 15 12:00 am
    let startDate = new Date(unixStart * 1000).toDateString();
    startDate = startDate.substring(4, 10);
    let endDate = new Date((unixStart + (3600 * 24 * 14)) * 1000).toDateString(); // 2 weeks after start date
    endDate = endDate.substring(4, 10);

    const [schoolNames, setSchoolNames] = useState([]);
    const [orders, setOrders] = useState([]);
    const [sortedArr, setSortedArr] = useState([]);
    const [leadTable, setLeadTable] = useState();

    function toTitleCase(str) { // function to capitalize first letter of each word
        let text = str.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return text;
    }

    function traverseLeaders(objName) {
        let sortedArrTemp = [];
        let yourSchoolCount;
        for (const prop in objName) {
            if (objName[prop]['name'] != "Freeport High School") { // filter out school 2098 due to fake order
                sortedArrTemp.push(objName[prop]);
            }
            sortedArrTemp.sort((a, b) => parseFloat(b.num_orders) - parseFloat(a.num_orders)); // sort by num_orders in descending order
            setSortedArr(sortedArrTemp);
            if (objName[prop]['name'] === props.schoolName) {
                yourSchoolCount = objName[prop]['num_orders'];
            }
        }
        let schoolNamesTemp = [];
        let ordersTemp = [];
        let schoolNotInTop5 = true;
        for (let i = 0; i < 3; i++) { // NOTE: Change all 3's to 5 once more data is entered
            schoolNamesTemp[i] = sortedArrTemp[i].name;
            ordersTemp[i] = sortedArrTemp[i].num_orders;
            if (sortedArrTemp[i].name === props.schoolName) {
                schoolNotInTop5 = false;
            }
        }
        if (schoolNotInTop5) {
            schoolNamesTemp[3] = "Your School";
            if (yourSchoolCount == undefined) {
                yourSchoolCount = 0;
            }
            ordersTemp[3] = yourSchoolCount;
        }
        setSchoolNames(schoolNamesTemp);
        setOrders(ordersTemp);
        setLeadTable(ordersTemp.map(renderLeaderboard));
    }

    function getLeaders() {
        return new Promise(resolve => {
            fetch(`/api/leaderboard/${unixStart}`, {
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(apiU + ":" + apiP),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            })
                .then(res => res.json())
                .then(data => {
                    traverseLeaders(data.leader);
                });
        });
    }

    const renderLeaderboard = (item, idx) => {
        let styleVar;
        if (idx == 5) {
            styleVar = "bold-text";
        } else {
            styleVar = "normal-text";
        }
        return (
            <tr className={styleVar}>
                <td>{schoolNames[idx]}</td>
                <td>{orders[idx]}</td>
            </tr>
        )
    }

    useEffect(() => {
        getLeaders();
    }, [leadTable]);

    return (
        <div className="center">
            <h2>School Leaderboard</h2>
            <p>Schools with the most tree requests between {startDate} and {endDate}.</p>
            <ReactBootStrap.Table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Tree Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {leadTable}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    )
}

export default Leaderboard;