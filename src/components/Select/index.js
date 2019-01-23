import React from 'react';
import { upperFirst } from 'lodash';
import SelectMaterial from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Select = ({ value, options, name, onSelect }) => {
  const content = options.map(el =>
    <MenuItem value={el} key={el}>{upperFirst(el)}</MenuItem>
  )

  return (
    <SelectMaterial
      value={value}
      onChange={onSelect}
      inputProps={{ name: name }}
    >
      {content}
    </SelectMaterial>
  );
}

export default Select;
