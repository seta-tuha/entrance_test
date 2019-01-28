import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export const DeleteButton = ({ onClick }) => {
  return (
    <Tooltip title="Delete" placement="top">
      <IconButton
        aria-label="Delete"
        onClick={onClick}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const DetailButton = ({ onClick }) => {
  return (
    <Tooltip title="Detail" placement="top">
      <IconButton
        aria-label="Detail"
        onClick={onClick}
      >
        <MoreHorizIcon />
      </IconButton>
    </Tooltip>
  );
};

DetailButton.propTypes = {
  onClick: PropTypes.func.isRequired
};


export const ShowDemoButton = ({ onClick }) => {
  return (
    <Tooltip title="Demo" placement="top">
      <IconButton
        aria-label="Demo"
        onClick={onClick}
      >
        <LaunchIcon />
      </IconButton>
    </Tooltip>
  );
};

ShowDemoButton.propTypes = {
  onClick: PropTypes.func.isRequired
};
