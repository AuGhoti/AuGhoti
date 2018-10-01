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
    padding: theme.spacing.unit * 3
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  toolbar: {
    ...theme.mixins.toolbar,
    position: "relative"
  }
});

class App extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Nav />
        <main className={this.props.classes.content}>
          <div className={this.props.classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(App));
