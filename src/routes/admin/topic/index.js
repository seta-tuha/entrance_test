import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../../../firebase';
import withModal from '../../../components/withModal';
import { TopicForm } from '../../../components/form';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailsIcon from '@material-ui/icons/Details';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let _isMounted = false;

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
    }
  }

  componentDidMount() {
    const { firebase } = this.props;
    _isMounted = true;

    firebase.topics().on('value', snapshot => {
      if (_isMounted) {
        let keys = Object.keys(snapshot.val());
        let data = Object.values(snapshot.val());
        let topics = data.reduce((acc, value, index) => {
          const questions = value.questions ? Object.keys(value.questions).length : 0;
          let temp = {
            id: keys[index],
            name: value.name,
            questions
          };
          acc.push(temp);

          return acc;
        }, []);

        this.setState({ topics });
      }
    })
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  handleClickMore = id => () => {
    const { history } = this.props;
    history.push(`/admin/topic/${id}`);
  }

  handleClickDelete = id => () => {
    const { firebase } = this.props;
    var r = window.confirm("Do you want to delete this topic?");
    if (r == true) {
      firebase.topics().child(id).set(null, function (error) {
        if (error) {
          alert('Delete fail');
        } else {
          alert('Delete success');
        }
      });
    }
  }

  render() {

    const { classes, handleClick } = this.props;
    const { topics } = this.state;

    const content = topics.map(topic =>
      <TableRow key={topic.name} hover>
        <TableCell>{topic.name}</TableCell>
        <TableCell>{topic.questions}</TableCell>
        <TableCell>
          <IconButton aria-label="Delete"
            onClick={this.handleClickMore(topic.name)}
          >
            <MoreHorizIcon />
          </IconButton>
          <IconButton aria-label="Delete"
            onClick={this.handleClickDelete(topic.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )

    return (
      <React.Fragment>
        <div className="topic-question-title">
          <p>Topics</p>
          <Button type="button" color="primary" variant="outlined"
            onClick={handleClick}
          >
            New topic
          </Button>
        </div>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Number of questions</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

Topics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withModal(TopicForm, withStyles(styles)(Topics)));

// ToDo: refactor this code file
