import React, { Component } from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import ProgressBar from "@ramonak/react-progress-bar";

const Chart = (props) => {

    const percentage = props.treeGoalPercent;
    const color = ['rgba(255,99,132,0.6)','rgba(54,162,235,0.6)','rgba(255,206,86,0.6)','rgba(75,192,192,0.6)','rgba(153,102,255,0.6)','rgba(255,159,64,0.6)',
    'rgba(64,255,74,0.6)','rgba(32,68,236,0.6)','rgba(151,162,165,0.6)','rgba(217,3,40,0.6)'];
    // pink, sky blue, yellow, cyan, purple, orange, green, navy blue, gray, darker red

    function toTitleCase(str) { // function to capitalize first letter of each word; e.g. 'still woozy' becomes 'Still Woozy'
        var text = str.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        return text;
    }

    const lowercaseNames = props.specNames;
    const capitalNames = lowercaseNames.map(n => toTitleCase(n));

    const data = {
        labels:capitalNames,
        datasets:[
            {
                label:'Requests',
                data:props.specValues,
                backgroundColor:color
            }
        ]
    };

    return (
        <div className="chart">
            <div className="progressbar">
                <ProgressBar completed={percentage} bgColor={'#016d30'}/>
            </div>
            <br></br>
            <Bar
                data={data}
                options={{
                    title:{
                        display:true,
                        text:'Tree Requests by Species',
                        fontSize: 18
                    },
                    legend:{
                        display:false,
                        position:'right'
                    },
                    scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true
                          }
                        }]
                      }
                }}
            />
            <Pie
                data={data}
                options={{
                    title:{
                        display:true,
                        text:'Tree Requests by Species',
                        fontSize: 18
                    },
                    legend:{
                        display:true,
                        position:'bottom'
                    }
                  }}
            />
        </div>
    )
}

export default Chart;
