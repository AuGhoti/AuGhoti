import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

class BarChart extends Component {
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        chartTitle: 'default'
    }
    
    render() {
        return (
            <div className="Chart">
                <Bar
                    data={this.props.chartData? this.props.chartData : {}}
                    width={200}
                    height={200}
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

export default BarChart