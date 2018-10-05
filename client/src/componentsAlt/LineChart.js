import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

class LineChart extends Component {
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        chartTitle: 'default'
    }
    
    render() {
        return (
            <div className="Chart">
         
                <Line
                    data={this.props.chartData? this.props.chartData : {}}
                    width={200}
                    height={100}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.props.chartTitle,
                            fontSize: 40
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                />
            </div>
        )
    }
}

export default LineChart