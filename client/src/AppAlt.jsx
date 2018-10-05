import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { verify } from "./redux/actions";

// components
import Login from "./componentsAlt/Login";
import Main from "./componentsAlt/Main";
import Current from "./componentsAlt/Current";
import { withRouter } from "react-router-dom";

// styles
import "./styles/styles.css";

class AppAlt extends Component {
  componentDidMount() {
    this.props.verify();
  }

  render() {
    return this.props.isAuthenticated ? (
      <Fragment>
        <Main />
        <Current />
      </Fragment>
    ) : (
      <Login />
    );
  }
}

export default withRouter(
  connect(
    state => ({ isAuthenticated: state.isAuthenticated }),
    { verify }
  )(AppAlt)
);
