import React, { Fragment } from 'react';
import { login } from 'services/authenticate/firebase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  loginForm: {
    width: 300,
    margin: '3rem auto 0',
    padding: '1rem 1rem 2rem'
  },
  button: {
    marginTop: '1.5rem',
  },
  center: {
    textAlign: 'center',
  }
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: null,
    notification: null,
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();

    login(email, password)
      .then(res => {
        this.setState({
          ...INITIAL_STATE,
          error: null,
          notification: 'Login successful'
        })
      })
      .catch(error => {
        this.setState({ error: error.message, notification: null });
      });
  }

  render() {
    const { classes } = this.props;
    const { email, password, error, notification } = this.state;

    return (
      <Fragment>
        <Paper className={classes.loginForm}>
          <FormControl fullWidth>
            {error ? error : notification}
          </FormControl>

          <h1 className={classes.center}>Login</h1>
          <form onSubmit={this.onSubmit}>
            <FormControl fullWidth>
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.onChange}
              />
            </FormControl>
            <Button className={classes.button} type="submit"
              fullWidth variant="contained" color="primary">
              Login
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        </Paper>
      </Fragment >
    );
  }
}

export default withStyles(styles)(Login);
