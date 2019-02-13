/* eslint-disable */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const Modal = ({
  renderLeftBtn,
  renderRightBtn,
  renderHeader,
  renderContent
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

export default Modal;
