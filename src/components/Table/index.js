import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHeadMaterial from '@material-ui/core/TableHead';
import QuestionTable from './QuestionTable';
import TopicTable from './TopicTable';

export const TableHead = ({ heads }) => {
  const tableHeads = heads.map(head =>
    <TableCell align="center" key={head}>{head}</TableCell>);

  return (
    <TableHeadMaterial>
      <TableRow>
        {tableHeads}
      </TableRow>
    </TableHeadMaterial>
  );
};

TableHead.propTypes = {
  heads: PropTypes.arrayOf(PropTypes.string).isRequired
};

export { QuestionTable, TopicTable };
