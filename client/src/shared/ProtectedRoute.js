import React from 'react'
import { Redirect, Route } from 'react-router-dom'

class ProtectedRoute extends Component {

    render() {
        const {isAuthenticated, redirectTo} = this.props
        return (
            isAuthenticated
                ? this.props.render
                : <Redirect to={redirectTo} />
        )
    }
}

export default ProtectedRoute