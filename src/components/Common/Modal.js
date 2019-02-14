import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

const Modal = ({
  renderHeader,
  renderContent,
  renderLeftBtn,
  renderRightBtn
}) => {
  return (
    <Dialog
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {
        renderHeader()
      }
      <DialogContent>
        {
          renderContent()
        }
      </DialogContent>
      <DialogActions>
        {
          renderLeftBtn()
        }
        {
          renderRightBtn()
        }
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  renderLeftBtn: PropTypes.func.isRequired,
  renderRightBtn: PropTypes.func.isRequired
};

export default Modal;
