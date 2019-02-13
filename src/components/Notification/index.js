import React from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer } from 'react-notifications';

const NotificationWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <NotificationContainer />
      {children}
    </React.Fragment>
  );
};

NotificationWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]).isRequired
};

export default NotificationWrapper;
