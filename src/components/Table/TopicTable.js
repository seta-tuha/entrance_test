import React from 'react';
import { toUpper } from 'lodash';
import { TableHead } from './index';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import { withModal, Confirm } from 'components/Common';
import { DeleteButton, DetailButton } from 'components/Button';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const TopicTable = ({ topics, openModal, onSeeDetail, onDelete, classes }) => {
  const content = topics.map(topic =>
    <TableRow key={topic.id} hover>
      <TableCell align="center">{toUpper(topic.name)}</TableCell>
      <TableCell align="center">{topic.questions}</TableCell>
      <TableCell align="center">
        <DetailButton onClick={onSeeDetail(topic.name)} />
        <DeleteButton onClick={() => openModal({ id: topic.id })} />
      </TableCell>
    </TableRow>
  )

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead heads={['Name', 'Number of questions', 'Action']} />
        <TableBody>
          {content}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withModal(Confirm, withStyles(styles)(TopicTable));
