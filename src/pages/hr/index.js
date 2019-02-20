import React from 'react';
import {
  Paper,
  Button,
  MenuItem,
  TextField,
  FormControl
} from '@material-ui/core';
import {
  getExamLevel,
  getExamDuration,
  getTopics,
  generateExam
} from 'services/api/firebase';
import { NotificationManager } from 'react-notifications';
import Firebase from 'services/firebase';
import './index.css';

class Hr extends React.Component {
  state = {
    topics: [],
    levels: [],
    durations: [],
    email: '',
    level: '',
    topic: '',
    duration: '',
    link: ''
  }

  componentDidMount() {
    getExamLevel(levels => this.setState({ levels }));
    getExamDuration(durations => this.setState({ durations }));
    getTopics(topics => this.setState({ topics }));
  }

  onChange = prop => e => this.setState({ [prop]: e.target.value })

  onSubmit = () => {
    const {
      email, level, topic, duration
    } = this.state;

    generateExam({
      email, level, topic, duration
    }, ({ isError, payload }) => {
      if (isError) {
        NotificationManager.error(payload, 'Error');
      } else {
        NotificationManager.success('Generate successfully', 'Success');
        this.setState({
          link: payload
        });
      }
    });
  }

  onLogout = () => {
    Firebase.auth.signOut();
  }

  render() {
    const {
      topics, email, levels, durations, level, topic, duration, link
    } = this.state;
    return (
      <div className="hr">
        <Paper className="hr">
          <h2 className="text-center">GENERATE TEST FOR CANDIDATE</h2>
          <FormControl margin="dense">
            <TextField
              variant="outlined"
              label="Email"
              value={email}
              onChange={this.onChange('email')}
            />
          </FormControl>
          <FormControl margin="dense">
            <TextField
              select
              variant="outlined"
              label="Level"
              value={level}
              onChange={this.onChange('level')}
            >
              {levels.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl margin="dense">
            <TextField
              select
              variant="outlined"
              label="Topic"
              value={topic}
              onChange={this.onChange('topic')}
            >
              {topics.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl margin="dense">
            <TextField
              select
              variant="outlined"
              label="Duration"
              value={duration}
              onChange={this.onChange('duration')}
            >
              {durations.map(option => (
                <MenuItem key={option.id} value={option.duration}>
                  {option.duration}
                  {' '}
                  min
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl margin="dense">
            <Button
              variant="contained"
              type="button" color="primary" fullWidth
              onClick={this.onSubmit}
            >
              Generate test
            </Button>
          </FormControl>
        </Paper>
        <FormControl margin="dense" className="exam-url">
          <TextField
            variant="outlined"
            label="Link of exam will show here"
            readOnly
            value={link}
          />
        </FormControl>
        <FormControl margin="dense">
          <Button
            variant="contained"
            type="button" color="secondary" fullWidth
            onClick={this.onLogout}
          >
            Logout
          </Button>
        </FormControl>
      </div>
    );
  }
}

export default Hr;
