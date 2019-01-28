import React from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import SelectMaterial from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: `${theme.spacing.unit} 0`,
    minWidth: 120
  }
});

const Select = ({
  value, options, name, onSelect, classes
}) => {
  const content = options.map(el =>
    <MenuItem value={el} key={el}>{upperFirst(el)}</MenuItem>);

  return (
    <FormControl className={classes.formControl}>
      <SelectMaterial
        value={value}
        onChange={onSelect}
        inputProps={{ name }}
      >
        {content}
      </SelectMaterial>
    </FormControl>
  );
};

Select.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Select);
