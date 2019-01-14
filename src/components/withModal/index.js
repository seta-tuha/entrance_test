import React from 'react';

const withModal = (ModalComponent, WrappedComponent) => {
  return class withModalComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        data: null
      }
    }

    openModal = data => {
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
              ? <ModalComponent isOpen={open} handleClickOpen={this.openModal}
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
