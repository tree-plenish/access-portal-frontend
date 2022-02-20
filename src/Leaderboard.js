import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import './App.css';

const Leaderboard = (props) => {

    let apiU = 'admin';
    let apiP = 'preeTlenish1#';

    var unixStart = 1645333200; // Sun Feb 20 12:00 am
    var startDate = new Date(unixStart*1000).toDateString();
    startDate = startDate.substring(4, 10);
    var endDate = new Date((unixStart + (3600*24*14))*1000).toDateString(); // 2 weeks after start date
    endDate = endDate.substring(4, 10);

    var [schoolNames, setSchoolNames] = useState([]);
    var [orders, setOrders] = useState([]);
    var [sortedArr, setSortedArr] = useState([]);
    var [leadTable, setLeadTable] = useState();

    function toTitleCase(str) { // function to capitalize first letter of each word
        var text = str.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        return text;
    }

    function traverseLeaders(objName) {
        var sortedArrTemp = [];
        var yourSchoolCount;
        for (const prop in objName) {
            sortedArrTemp.push(objName[prop]);
            sortedArrTemp.sort((a, b) => parseFloat(b.num_orders) - parseFloat(a.num_orders)); // sort by num_orders in descending order
            setSortedArr(sortedArrTemp);
            if (objName[prop]['name'] === props.schoolName) {
                yourSchoolCount = objName[prop]['num_orders'];
            }
        }
        var schoolNamesTemp = [];
        var ordersTemp = [];
        var schoolNotInTop5 = true;
        for (var i = 0; i < 5; i++) {
            schoolNamesTemp[i] = sortedArrTemp[i].name;
            ordersTemp[i] = sortedArrTemp[i].num_orders;
            if (sortedArrTemp[i].name === props.schoolName) {
                schoolNotInTop5 = false;
            }
        }
        if (schoolNotInTop5) {
            schoolNamesTemp[5] = "Your School";
            if (yourSchoolCount == undefined) {
                yourSchoolCount = 0;
            }
            ordersTemp[5] = yourSchoolCount;
        }
        setSchoolNames(schoolNamesTemp);
        setOrders(ordersTemp);
        setLeadTable(ordersTemp.map(renderLeaderboard));
    }

    function getLeaders() {
        return new Promise(resolve => {
            fetch(`/api/leaderboard/${unixStart}`, {
                headers: new Headers({
                  'Authorization': 'Basic '+btoa(apiU + ":" + apiP),
                  'Content-Type': 'application/x-www-form-urlencoded'
                })
              })
            .then(res => res.json())
            .then(data => {
                traverseLeaders(JSON.parse(data.leader));
            });
        });
    }

    const renderLeaderboard = (item, idx) => {
        var styleVar;
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
            <p>If the above table is blank, there haven't been any orders placed within the timeframe yet.</p>
        </div>
    )
}

export default Leaderboard;