import React, { Component } from "react";
import { connect } from "react-redux";

import { login, signup } from "../redux/actions";
import logo from "../images/au.svg";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (e.target.name === "login") this.props.login(this.state);
    else if (e.target.name === "signup") this.props.signup(this.state);
    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <div id="user-authentication">
        <h1 className="login-title">[Au]Ghoti</h1>
        <img className="login-signup-logo logo" src={logo} alt="logo"/>
        <form id="login-signup-form">
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />
          <div id="auth-action-handlers">
            <button
              type="button"
              className="login-btn btn"
              name="login"
              onClick={this.handleSubmit}
            >
              login
            </button>
            <button
              type="button"
              className="signup-btn btn"
              name="signup"
              onClick={this.handleSubmit}
            >
              signup
            </button>
          </div>
          <p >{this.props.error}</p>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({ error: state.error }),
  { login, signup }
)(Login);
