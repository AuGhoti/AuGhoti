import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

// components
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'

class Stats extends Component {
    constructor() {
        super()

        this.state = {
            chartData: {}
        }
    }
    
    componentDidMount = () => {
        this.getChartData()
    }

    getChartData() {
        let temp = this.props.historicalActions.actions.map(activity => {
            let time = moment(activity.endDate + "T" + activity.endTime).to(moment(activity.startDate + "T" + activity.startTime), true)
            return this.isNumber(time)
        })

        let totalData = this.props.historicalActions.actions.map(activity => {
            return {
                title: activity.activityTitle,
                time: this.isNumber(moment(activity.endDate + "T" + activity.endTime).to(moment(activity.startDate + "T" + activity.startTime), true))
            }
        })

        let resultData = this.combineData(totalData)
        let resultTitle = []
        let resultTimes = []
        for(let key in resultData) {
            resultTitle.push(key)
            resultTimes.push(resultData[key])
        }
        // console.log(resultTimes)

        this.setState({
            chartData: {
                labels: [...resultTitle],
                datasets: [
                    {
                        label: "test1",
                        data: [...resultTimes],
                        backgroundColor: [
                            `#eccc68`,
                            `#ff7f50`,
                            `#ff6b81`,
                            `#7bed9f`,
                            `#70a1ff`,
                            `#5352ed`,
                            `#dfe4ea`,
                            `#ffa502`,
                            `#ff6348`,
                            `#ff4757`,
                            `#2ed573`,
                            `#1e90ff`,
                            `#3742fa`,
                        ]
                    }
                ]
            }
        })
    }

    combineData = (arr) => {
        let map = {}
        for(let i = 0; i < arr.length; i++){
            if(map[arr[i].title]) {
                map[arr[i].title] += arr[i].time.time
              
            } else {
                map[arr[i].title] = arr[i].time.time
            }
        }
        return map
    }
    isNumber = str => {
        let arr = str.split(' ')
        let results = {
            time: parseInt(arr[0]),
            format: arr[1]
        }
        return results
    }

    render() {
        return (
            <div id="current-action-wrapper">
                <h1 className="page-title">analytics</h1>
                <div>
                    <PieChart {...this.state} legendPosition="right" chartTitle="Pie Chart" />
                    <LineChart {...this.state} legendPosition="left" chartTitle="Line Graph" />
                    <BarChart {...this.state} legendPosition="bottom" chartTitle="Bar Graph" />
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    activities: state.activities,
    currentAction: state.currentAction,
    historicalActions: state.historicalActions
}))(Stats)