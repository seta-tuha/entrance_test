import React from 'react';
import { TableHead } from './index';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { withModal, Confirm } from '../common';
import {
  DeleteButton,
  DetailButton,
  ShowDemoButton,
} from '../button';

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

class TopicQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, questions, openModal, onSeeDetail } = this.props;
    const { page, rowsPerPage } = this.state;

    const content = questions.map((q, index) =>
      <TableRow key={q.id} hover >
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{q.question.short}</TableCell>
        <TableCell align="center">{q.type}</TableCell>
        <TableCell align="center">
          <DetailButton onClick={onSeeDetail(q.id)} />
          <ShowDemoButton />
          <DeleteButton onClick={() => openModal({ id: q.id })} />
        </TableCell>
      </TableRow>
    )

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead heads={['ID', 'Question', 'Type', 'Action']} />
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
    );
  }
}

export default withModal(Confirm, withStyles(styles)(TopicQuestion))
