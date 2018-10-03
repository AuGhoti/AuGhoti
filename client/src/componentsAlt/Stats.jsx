import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'


class Stats extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div id="">
                <h1 className="page-title">statistics</h1>
                <Bar
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