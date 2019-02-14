import React from 'react';
import PropTypes from 'prop-types';

const rowsPerPageOptions = [5, 10, 25];

class TableContainer extends React.Component {
  state = {
    page: 0,
    rowsPerPage: rowsPerPageOptions[0]
  }

  handleChangePage = (e, page) => this.setState({ page });

  handleChangeRowsPerPage = e => this.setState({ rowsPerPage: e.target.value });

  render() {
    const { children } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      children({
        page,
        rowsPerPage,
        rowsPerPageOptions,
        handleChangePage: this.handleChangePage,
        handleChangeRowsPerPage: this.handleChangeRowsPerPage
      })
    );
  }
}

TableContainer.propTypes = {
  children: PropTypes.func.isRequired
};

export default TableContainer;
