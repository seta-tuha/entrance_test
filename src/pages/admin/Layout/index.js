import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';

const Layout = ({ component: Component, ...rest }) => {
  return (
    <DefaultLayout>
      <Route {...rest} render={match => <Component {...match} />} />
    </DefaultLayout>
  );
};

Layout.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]).isRequired
};

export default Layout;
