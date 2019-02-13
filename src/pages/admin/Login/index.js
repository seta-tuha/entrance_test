import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { login } from 'services/authenticate/firebase';
import {
  NotificationManager
} from 'react-notifications';
import { Formik } from 'formik';
import { Paper, Button, FormControl } from '@material-ui/core';

// eslint-disable-next-line
const styles = theme => ({
  loginForm: {
    width: 300,
    margin: '3rem auto 0',
    padding: '1rem 1rem 2rem'
  },
  button: {
    marginTop: '1.5rem'
  },
  center: {
    textAlign: 'center'
  }
});

// const INITIAL_STATE = {
//   email: '',
//   password: '',
//   error: null
// };

const Login = ({ classes }) => {
  return (
    <Fragment>
      <Paper className={classes.loginForm}>
        <h1 className={classes.center}>Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            console.log(actions); // eslint-disable-line
            login(values.email, values.password)
              .then(() => {
                NotificationManager.success('Login successfully',
                  'Welcome');
              })
              .catch((error) => {
                NotificationManager.warning(error.message, 'Login fail');
              });
          }}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange
          }) => (
            <form onSubmit={handleSubmit}>
              {errors.name
                && (
                  <FormControl fullWidth>
                    {errors.name}
                  </FormControl>
                )
              }
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                className={classes.button} type="submit" aria-label="Login"
                fullWidth variant="contained" color="primary"
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Fragment>
  );
};

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Login);
