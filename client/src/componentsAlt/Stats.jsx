import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'


class Stats extends Component {
    constructor(){
        super()
        this.state = {
            chartData: {
                
            }
        }
    }
    render(){
        return (
            <div id="">
                <h1 className="page-title">statistics</h1>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default Stats