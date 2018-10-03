import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

// Components 
import Dashboard from './Dashboard'
import History from './History'
import CurrentAction from './CurrentAction'
import Activity from './Activity'
import Stats from './Stats'

const Current = () => {
    return (
        <div id="main-content-full">
            <div id="main-content-wrapper">
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/current" component={CurrentAction}/>
                    <Route exact path="/activity" component={Activity}/>
                    <Route exact path="/history" component={History}/>
                    <Route exact path="/statistics" component={Stats}/>
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Current)