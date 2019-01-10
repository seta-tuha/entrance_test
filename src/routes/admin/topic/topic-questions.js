import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { withFirebase } from '../../../firebase';
import { filter } from 'lodash';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Topic extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      questions: []
    }
  }

  componentDidMount() {
    const { firebase } = this.props;
    const { match: { params: { id } } } = this.props;

    firebase.questions().on('value', snapshot => {
      const data = snapshot.val();

      const temp = Object.keys(data).map(key => {
        let t = { id: key, ...data[key] }
        return t;
      })

      const questions = filter(temp, { 'topic': id });
      this.setState({ questions });
    })
  }

  handleClick = id => () => {
    const { history } = this.props;
    history.push(`/admin/question/${id}`)
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };


  render() {
    const { classes } = this.props;
    const { page, rowsPerPage, questions } = this.state;

    const content = questions.map((question, index) =>
      <TableRow key={question.id} hover onClick={this.handleClick(question.id)}>
        <TableCell>
          {index + 1}
        </TableCell>
        <TableCell>{question.question}</TableCell>
        <TableCell>{question.type}</TableCell>
      </TableRow>
    )

    return (
      <React.Fragment>
        <h1>Topic questions</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={36}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

Topic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withStyles(styles)(Topic));
