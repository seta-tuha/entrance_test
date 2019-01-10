import React from 'react';

const withModal = (ModalComponent, WrappedComponent) => {
  return class withModalComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        data: {}
      }
    }

    openModal = data => {
      this.setState({
        open: true,
        data
      })
    }

    closeModal = () => {
      this.setState({ open: false })
    }

    render() {
      const { open, data } = this.state;

      return (
        <React.Fragment>
          <WrappedComponent {...this.props} openModal={this.openModal} />
          {
            open
              ? <ModalComponent isOpen={open} closeModal={this.closeModal}
                {...this.props} data={data}
              />
              : null
          }
        </React.Fragment>
      );
    }
  }
}

export default withModal;
