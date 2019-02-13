import React from 'react';
import PropTypes from 'prop-types';

class ModalContainer extends React.Component {
  state = {
    open: false
  }

  openModal = () => {
    this.setState({ open: true });
  }

  closeModal = () => {
    this.setState({ open: false });
  }

  render() {
    const { mainComponent, modalComponent } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        {
          open
            ? modalComponent({ closeModal: this.closeModal })
            : null
        }
        {
          mainComponent({ openModal: this.openModal })
        }
      </React.Fragment>
    );
  }
}

ModalContainer.propTypes = {
  mainComponent: PropTypes.func.isRequired,
  modalComponent: PropTypes.func.isRequired
};

export default ModalContainer;
