import React from 'react';
import TopicTable from './TopicTable';
import QuestionTable from './QuestionTable';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHeadMaterial from '@material-ui/core/TableHead';

export const TableHead = ({ heads }) => {
  const tableHeads = heads.map(head =>
    <TableCell align="center" key={head}>{head}</TableCell>
  )

  return (
    <TableHeadMaterial>
      <TableRow>
        {tableHeads}
      </TableRow>
    </TableHeadMaterial>
  );
}

export { QuestionTable, TopicTable }
