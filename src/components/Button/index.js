import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export const DeleteButton = ({ onClick }) => {
  return (
    <Tooltip title="Delete" placement="top">
      <IconButton aria-label="Delete"
        onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export const DetailButton = ({ onClick }) => {
  return (
    <Tooltip title="Detail" placement="top">
      <IconButton aria-label="Detail"
        onClick={onClick}
      >
        <MoreHorizIcon />
      </IconButton>
    </Tooltip>
  )
}

export const ShowDemoButton = ({ onClick }) => {
  return (
    <Tooltip title="Demo" placement="top">
      <IconButton aria-label="Demo"
        onClick={onClick}
      >
        <LaunchIcon />
      </IconButton>
    </Tooltip>
  )
}
