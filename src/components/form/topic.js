import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withFirebase } from '../../firebase';
import { trim, isEmpty, toLower } from 'lodash';

class TopicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      error: null,
    }
  }

  handleChange = e => {
    this.setState({ topic: e.target.value });
  }

  handleSubmit = () => {
    let { topic } = this.state;
    topic = toLower(trim(topic));

    if (isEmpty(topic)) {
      this.setState({
        error: 'Invalid topic name',
        topic: ''
      })

      setTimeout(() => this.setState({ error: null, topic: '' }), 1000);
    } else {
      const { firebase, handleClickClose } = this.props;

      firebase.topics().once('value', snapshot => {
        const data = Object.values(snapshot.val());
        const currentTopics = data.map(topic => toLower(topic.name));

        if (currentTopics.includes(topic)) {
          this.setState({
            error: 'Topic name already exists',
            topic: ''
          })

          setTimeout(() => this.setState({ error: null, topic: '' }), 1000);
        } else {
          firebase.topics().push({ name: topic });
          handleClickClose();
        }
      })
    }
  }

  render() {
    const { isOpen, handleClickClose } = this.props;
    const { error } = this.state;

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Create new Topic</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="topic"
              label="Topic name *"
              type="text"
              onChange={this.handleChange}
            />
            {
              error &&
              <div className="error">{error}</div>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withFirebase(TopicForm);

// ToDo: refactor
