import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const withAuthentication = (WrappedComponent) => {
    return class extends Component {
        render() {
            const { user } = this.props;
            if (user) {
                return <WrappedComponent {...this.props} />
            }
            return <Redirect to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }}
            />
        }
    }
}

export default compose(
    connect(state => {
        return {
            user: state.authenticate.user,
            roles: state.authenticate.roles
        }
    }),
    withAuthentication
)
