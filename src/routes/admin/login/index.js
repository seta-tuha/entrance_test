import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withFirebase } from '../../../firebase';

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
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;

    return (
      <Paper className={classes.loginForm}>
        <h1 className={classes.center}>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormControl fullWidth>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button className={classes.button} type="submit"
            fullWidth variant="contained" color="primary">
            Login
          </Button>

          {error && <p>{error.message}</p>}
        </form>

      </Paper>
    );
  }
}

export default withFirebase(withStyles(styles)(Login));
