import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import Modal from './Modal';
import withModal from './withModal';
import ModalContainer from './ModalContainer';
import './index.css';

export const Loading = () => {
  return (
    <div className="loading-panel">
      <CircularProgress size={50} />
    </div>
  );
};

export const Confirm = ({
  data,
  isOpen,
  closeModal,
  onDelete
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        Are you sure you want to delete this record?
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeModal} color="primary" aria-label="Cancel">
          Cancel
        </Button>
        <Button
          onClick={() => onDelete(data.id, closeModal)} color="primary"
          aria-label="Delete"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Confirm.propTypes = {
  data: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export { withModal, Modal, ModalContainer };
