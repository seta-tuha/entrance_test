import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { logIn, checkUserSession, logOut } from 'services/authenticate/reducer';

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    componentDidMount() {
        this.props.doCheckUserSession();
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onLogin = () => {
        this.props.doLogin(this.state.email, this.state.password);
    }

    render() {
        if (this.props.user) {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            return <Redirect to={from} />
        }

        if (this.props.checkingSession) {
            return <div>Verifying user...</div>
        }

        return (
            <div>
                <h2>Login</h2>
                <input name="email" value={this.state.email} onChange={this.onTextChange} />
                <input name="password" type="password" value={this.state.password} onChange={this.onTextChange} />
                <button onClick={this.onLogin}>login</button>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        checkingSession: state.authenticate.checkingSession,
        user: state.authenticate.user
    }),
    (dispatch) => ({
        doLogin: compose(dispatch, logIn),
        doCheckUserSession: compose(dispatch, checkUserSession),
        doLogout: compose(dispatch, logOut)
    })
)(Login);
