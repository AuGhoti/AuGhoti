import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Dashboard from "./Dashboard";
import History from "./History";
import CurrentAction from "./CurrentAction";
import Activity from "./Activity";
import Stats from "./Stats";

class Current extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id="main-content-full">
        <div id="main-content-wrapper">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/current" component={CurrentAction} />
            <Route path="/activity" component={Activity} />
            <Route path="/history" component={History} />
            <Route path="/statistics" component={Stats} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Current;
