import React from "react";
import { connect } from "react-redux";

// components
import Login from "./componentsAlt/Login";
import Main from "./componentsAlt/Main";

// styles
import "./styles/styles.css";

const AppAlt = props => {
  return <div>{props.isAuthenticated ? <Main /> : <Login />}</div>;
};

export default connect(
  state => ({ isAuthenticated: state.isAuthenticated }),
  {}
)(AppAlt);
