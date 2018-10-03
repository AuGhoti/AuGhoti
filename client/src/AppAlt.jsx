import React, { Fragment } from "react";
import { connect } from "react-redux";

// components
import Login from "./componentsAlt/Login";
import Main from "./componentsAlt/Main";
import Current from "./componentsAlt/Current"
import { withRouter } from 'react-router-dom'


// styles
import "./styles/styles.css";

const AppAlt = props => {
  return props.isAuthenticated ? <Fragment><Main /><Current /></Fragment> : <Login />
};

export default withRouter(connect(
  state => ({ isAuthenticated: state.isAuthenticated }),
  {}
)(AppAlt));
