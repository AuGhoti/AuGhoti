import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginLeft: 250,
    width: "100%",
    height: "100%"
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className={this.props.classes.content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(App));
