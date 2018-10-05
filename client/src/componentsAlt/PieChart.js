import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

class PieChart extends Component {
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        chartTitle: 'default'
    }
    
    render() {
        return (
            <div className="Chart">
         
                <Pie
                    data={this.props.chartData? this.props.chartData : {}}
                    // width={100}
                    // height={50}
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

export default PieChart