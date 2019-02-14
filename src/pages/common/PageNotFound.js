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

const PageNotFound = ({ classes }) => {
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" component="h3">
        Page not found :(
      </Typography>
      <Typography component="p">
        Maybe the page you are looking for has been removed, or you typed in the wrong URL
      </Typography>
    </Paper>
  );
};

PageNotFound.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(PageNotFound);
