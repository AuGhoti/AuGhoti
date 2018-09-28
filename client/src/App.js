import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route />
        </Switch>
      </div>
    );
  }
}

export default App;
