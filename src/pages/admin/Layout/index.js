import React from 'react';
import DefaultLayout from './DefaultLayout';

const withLayout = LayoutComponent => WrappedComponent => (props) => {
  return (
    <LayoutComponent>
      <WrappedComponent {...props} />
    </LayoutComponent>
  );
};

export default withLayout(DefaultLayout);
