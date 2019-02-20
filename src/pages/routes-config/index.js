import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserConsumer } from 'context';
import { PageNotFound } from 'pages/common';

export const withAuthentication = (WrappedComponent) => {
  const AuthenticationRoute = (props) => {
    const { location } = props; // eslint-disable-line

    return (
      <UserConsumer>
        {
          ({ user }) => {
            if (user) {
              return <WrappedComponent {...props} user={user} />;
            }

            return (
              <Redirect to={{
                pathname: '/login',
                state: { from: location }
              }}
              />
            );
          }
        }
      </UserConsumer>
    );
  };

  return AuthenticationRoute;
};

export const withLoggedIn = (WrappedComponent) => {
  const LoggedIn = (props) => {
    const { location } = props;  // eslint-disable-line

    return (
      <UserConsumer>
        {
          ({ user }) => {
            if (user) {
              return (
                <Redirect to={{
                  pathname: '/',
                  state: { from: location }
                }}
                />
              );
            }

            return <WrappedComponent {...props} />;
          }
        }
      </UserConsumer>
    );
  };

  return LoggedIn;
};

const withAuthorization = allowedRoles => (WrappedComponent) => {
  const AuthorizationRoute = ({ user: { role }, ...rest }) => { // eslint-disable-line
    const allowed = allowedRoles.reduce((acc, allowedRole) =>
      acc || role[allowedRole], false);
    if (allowed) {
      return <WrappedComponent {...rest} />;
    }

    return <PageNotFound />;
  };

  return AuthorizationRoute;
};

const hrAuthorization = withAuthorization(['admin', 'hr']);
const adminAuthorization = withAuthorization(['admin']);

export { hrAuthorization, adminAuthorization };
