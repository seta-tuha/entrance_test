import React from 'react';
import UnAuthorizedPage from '../pages/UnAuthorized';
import LoginPage from '../pages/Login';


const withAuthorization  = (alowedRoles) => WrappedComponent => {
    return (props) => {
        console.log(props);
        const { user } = props;
        if (!user) return <LoginPage />
        const { role } = user;
        const allowed = alowedRoles.reduce((acc, alowedRole) => acc || role[alowedRole], false);
        if(allowed) {
            return <WrappedComponent />
        }
        return <UnAuthorizedPage />
    }
}

export default withAuthorization;
