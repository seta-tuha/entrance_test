import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Common';

class LoadData extends React.Component {
  state = {
    data: null,
    isLoading: true
  }

  componentDidMount() {
    const { loadData } = this.props;
    this.unsubscirbe = loadData(data => this.setState({ data, isLoading: false }));
  }

  componentWillUnmount() {
    if (typeof this.unsubscirbe === 'function') {
      this.unsubscirbe();
    }
  }

  render() {
    const { children } = this.props;
    const { data, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return children({ data });
  }
}

LoadData.propTypes = {
  children: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired
};

export default LoadData;
