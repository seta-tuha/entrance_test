import React from 'react';
import PropTypes from 'prop-types';
import { createTopic } from 'services/api/firebase';
import { trim, isEmpty, toLower } from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class TopicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      error: null
    };
  }

  onChange = e => this.setState({ topic: e.target.value });


  onSubmit = () => {
    let { topic } = this.state;
    topic = toLower(trim(topic));

    if (isEmpty(topic)) {
      this.setState({
        error: 'Invalid topic name',
        topic: ''
      }, () => setTimeout(() => this.setState({
        error: null,
        topic: ''
      }), 1000));
    } else {
      const { closeModal } = this.props;

      createTopic(
        { name: topic },
        ({ error, topic }) =>
          this.setState({ error, topic }, () => setTimeout(() =>
            this.setState({ error: null, topic: '' }),
          1000)),
        closeModal
      );
    }
  }

  render() {
    const { isOpen, closeModal } = this.props;
    const { error } = this.state;

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Create new Topic</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              type="text"
              margin="dense"
              label="Topic name *"
              onChange={this.onChange}
            />
            {
              error
              && <div className="error">{error}</div>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default TopicForm;

TopicForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

// ToDo: refactor
