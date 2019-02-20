import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogActions, CircularProgress
} from '@material-ui/core';
import Modal from './Modal';
import withModal from './withModal';
import ModalContainer from './ModalContainer';
import LoadData from './LoadData';
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

export {
  withModal, Modal, ModalContainer, LoadData
};
