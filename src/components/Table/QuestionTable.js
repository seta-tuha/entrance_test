import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withModal, Confirm } from 'components/Common';
import {
  DeleteButton, DetailButton, ShowDemoButton
} from 'components/Button';
import {
  Paper, Table, TableRow, TableCell, TableBody, TablePagination
} from '@material-ui/core';
import TableContainer from './TableContainer';
import { TableHead } from './index';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const tableHeads = ['ID', 'Question', 'Type', 'Action'];

const QuestionTable = ({
  classes, questions, openModal, onSeeDetail
}) => {
  return (
    <Paper className={classes.root}>
      <TableContainer>
        {({
          page,
          rowsPerPage,
          rowsPerPageOptions,
          handleChangePage,
          handleChangeRowsPerPage
        }) => {
          const showedQuestions = questions.slice(page * rowsPerPage,
            page * rowsPerPage + rowsPerPage);

          const content = showedQuestions.map((q, index) => (
            <TableRow key={q.id} hover>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{q.short}</TableCell>
              <TableCell align="center">{q.type}</TableCell>
              <TableCell align="center">
                <DetailButton onClick={onSeeDetail(q.id)} />
                <ShowDemoButton onClick={() => console.log('demo')} />
                <DeleteButton onClick={() => openModal({ id: q.id })} />
              </TableCell>
            </TableRow>
          ));

          return (
            <React.Fragment>
              <Table className={classes.table}>
                <TableHead heads={tableHeads} />
                <TableBody>
                  {content}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={questions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </React.Fragment>
          );
        }}
      </TableContainer>
    </Paper>
  );
};

QuestionTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openModal: PropTypes.func.isRequired,
  onSeeDetail: PropTypes.func.isRequired
};

export default withModal(Confirm, withStyles(styles)(QuestionTable));
