import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '3rem auto',
    width: '400px'
  }
});

const Thanks = ({ classes }) => {
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        Thank you
      </Typography>
      <Typography component="p">
        Thankyou for do this exam. We will contact you soon :D
      </Typography>
    </Paper>
  );
};

Thanks.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Thanks);
