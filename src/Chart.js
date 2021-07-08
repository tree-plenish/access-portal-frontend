import React, { Component } from 'react';
import {Bar, Pie} from 'react-chartjs-2';
import { chartData } from './Data';
import ProgressBar from "@ramonak/react-progress-bar";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            // hardcoded data format
            /*chartData:{
                labels: ['Eastern Redbud','Red Maple','River Birch','Gala Apple','Silver Maple','Pin Oak'],
                datasets:[
                    {
                        label:'Requests',
                        data:[
                            2184,
                            2131,
                            699,
                            349,
                            166,
                            146
                        ],
                        backgroundColor:[
                            'rgba(255,99,132,0.6)',
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,99,132,0.6)'
                        ]
                    }
                ]
            }*/
            data:{
                labels:chartData.species,
                datasets:[
                    {
                        label:'Requests',
                        data:chartData.requests,
                        backgroundColor:chartData.color
                    }
                ]
            },
            data2:70
        }
    }
    
    render() {
        const percentage = this.state.data2;
        return (
            <div className="chart">
                <div className="progressbar">
                    <ProgressBar completed={percentage} bgColor={'#016d30'}/>
                </div>
                <br></br>
                <Bar
                    data={this.state.data}
                    options={{
                        title:{
                            display:true,
                            text:'Tree Requests by Species',
                            fontSize: 18
                        },
                        legend:{
                            display:false,
                            position:'right'
                        }
                    }}
                />
                <Pie
                    data={this.state.data}
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
}

export default Chart;
