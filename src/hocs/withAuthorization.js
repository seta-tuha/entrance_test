import React from 'react';
import { compose } from 'redux';
import UnAuthorizedPage from 'pages/UnAuthorized';
import withAuthentication from './withAuthentication';


const withAuthorization  = (alowedRoles) => WrappedComponent => {
    return (props) => {
        const { roles } = props;
        if (!roles) {
            return <div>Authorizing...</div>
        }
        const allowed = alowedRoles.reduce((acc, alowedRole) => acc || roles[alowedRole], false);
        if(allowed) {
            return <WrappedComponent {...props} />
        }
        return <UnAuthorizedPage />
    }
}

const adminRoute = compose(
    withAuthentication,
    withAuthorization(['admin']),
)

const editorRoute = compose(
    withAuthentication,
    withAuthorization(['admin', 'editor'])
)

export {
    adminRoute,
    editorRoute
}
