import React from 'react'

// component
import CurrentActionItem from './CurrentActionItem'
import ActivityItem from './ActivityItem'
import { connect } from 'react-redux'

const Dashboard = props => {
    const displayCurrentActions= props.currentActions.map((data, i) => {
        return <CurrentActionItem key={i} i={i} {...data} />
    })

    const displayActivities = props.activities.map((act, i) => {
        return <ActivityItem key={i} i={i} {...act}/>
    })

    return (
        <div id="dashboard-wrapper">
            <h1 className="page-title">dashboard</h1>
            <div className="dashboard-section-1">
                <h3 className="current-actions-title">Current Actions</h3>
                {displayCurrentActions}
            </div>

            <div className="dashboard-section-1">
                <h3 className="current-actions-title">Activities</h3>
                <div className="activities-container">
                {displayActivities}
                </div>
            </div>
        </div>
    )
}

export default connect(state => (
    { 
        currentActions: state.currentAction,
        historicalActions: state.historicalActions,
        activities: state.activities
    }), {} )(Dashboard)