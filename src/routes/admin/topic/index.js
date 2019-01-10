import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withFirebase } from '../../../firebase';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: []
    }
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.topics().once('value', snapshot => {
      let data = Object.values(snapshot.val());
      let topics = data.reduce((acc, value) => {
        let temp = {
          name: value.name,
          questions: Object.keys(value.questions).length
        };
        acc.push(temp);

        return acc;
      }, []);

      this.setState({ topics });
    })
  }

  handleClick = id => () => {
    const { history } = this.props;
    history.push(`/admin/topic/${id}`);
  }

  render() {
    const { classes } = this.props;
    const { topics } = this.state;

    const content = topics.map(topic =>
      <TableRow key={topic.name} hover onClick={this.handleClick(topic.name)}>
        <TableCell>{topic.name}</TableCell>
        <TableCell>{topic.questions}</TableCell>
      </TableRow>
    )

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number of questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Topics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Topics));
