import React from 'react'

// component
import CurrentActionItem from './CurrentActionItem'
import ActivityItem from './ActivityItem'

const Dashboard = () => {
    const dummyData = [
        {
            activityTitle: "homework",
            description: "coding project",
            startDate: "Oct 1, 2018",
            startTime: "1:00 PM"
        },
        {
            activityTitle: "lunch",
            description: "burrito city",
            startDate: "Oct 1, 2018",
            startTime: "12:00 PM"
        },
        {
            activityTitle: "class",
            description: "user auth",
            startDate: "Oct 1, 2018",
            startTime: "10:00 PM"
        },
    ]
    const dummyAct = [
        {
            title: "coding",
            description: "full stack"
        },
        {
            title: "eating",
            description: "burrito city"
        },
        {
            title: "exercise",
            description: "weight-lifting"
        },
        {
            title: "halo",
            description: "slaying bodies"
        }
    ]

    const displayDummy = dummyData.map((data, i) => {
        return <CurrentActionItem key={i} i={i} {...data} />
    })

    const displayAct = dummyAct.map((act, i) => {
        return <ActivityItem key={i} i={i} {...act}/>
    })

    return (
        <div id="dashboard-wrapper">
            <h1 className="page-title">dashboard</h1>
            <div className="dashboard-section-1">
                <h3 className="current-actions-title">Current Actions</h3>
                {displayDummy}
            </div>

            <div className="dashboard-section-1">
                <h3 className="current-actions-title">Activities</h3>
                <div className="activities-container">
                {displayAct}
                </div>
            </div>
        </div>
    )
}

export default Dashboard