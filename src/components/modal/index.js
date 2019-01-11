import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormModal extends React.Component {
  render() {
    const { isOpen, handleClickClose } = this.props;

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new Topic</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create new topic
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="topic"
              label="Topic name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormModal;
