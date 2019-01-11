import React from 'react';
import Modal from '../modal';

const withModal = (ModalComponent = Modal, WrappedComponent) => {
  return class withModalComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        data: null
      }
    }

    openModal = data => {
      console.log('open modal');
      this.setState({ open: true })
    }

    closeModal = () => {
      this.setState({ open: false })
    }

    render() {
      const { open } = this.state;

      return (
        <React.Fragment>
          <WrappedComponent {...this.props} handleClick={this.openModal} />
          {
            open
              ? <Modal isOpen={open} handleClickOpen={this.openModal}
                handleClickClose={this.closeModal}
              />
              : null
          }
        </React.Fragment>
      );
    }
  }
}

export default withModal;
