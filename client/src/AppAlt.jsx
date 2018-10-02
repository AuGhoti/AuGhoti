import React, { Component } from 'react'

// components
import Login from './componentsAlt/Login'
import Main from './componentsAlt/Main'

// styles
import './styles/styles.css'

class AppAlt extends Component {
    constructor(){
        super()
        this.state = {
            isAuthenticated: true,
            user: {
                username: '',
                password: '',
                isAdmin: '',
                _id: ''
            }
        }
    }

    handleChange = e => {
        console.log(e.target.value)
        console.log(e.target.name)
        const { name, value } = e.target
        this.setState({
            user: {
                [name]: value
            }
        })
    }

    handleLogin = e => {
        e.preventDefault()
        // login action handler
    }

    handleSignup = e => {
        e.preventDefault()
        // signup action handler
    }

    handleLogout = e => {
        e.preventDefault()
        this.setState({
            isAuthenticated: false,
            user: {
                username: '',
                password: '',
                isAdmin: '',
                _id: ''
            }
        })
    }

    render() {
        return (
            <div>
            {this.state.isAuthenticated 
            ? <Main handleLogout={this.handleLogout}/>
            : <Login 
                    authState={this.state.user} 
                    handleChange={this.handleChange} 
                    handleLogin={this.handleLogin} 
                    handleSignup={this.handleSignup}/>}
            </div>
        )
    }
}

export default AppAlt