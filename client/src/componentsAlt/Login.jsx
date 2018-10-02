import React, { Component } from 'react';
import logo from '../images/au.svg'

class Login extends Component {
    constructor() {
        super()

    }
    render() {
        return (
            <div id="user-authentication">
                <h1 className="login-title">[Au]Ghoti</h1>
                <img className="login-signup-logo logo" src={logo}></img>
                <form id="login-signup-form">
                    <input type="text" name="username" value={this.props.authState.username} onChange={this.props.handleChange} placeholder="username" />
                    <input type="password" name="password" value={this.props.authState.password} onChange={this.props.handleChange} placeholder="password" />
                    <div id="auth-action-handlers">
                        <button className="login-btn btn" onClick={this.handleLogin}>login</button>
                        <button className="signup-btn btn" onClick={this.handleSignup}>signup</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default Login;