import React from 'react';
import { upperFirst } from 'lodash';

const Select = ({ currentOption, options, name, handleChange }) => {
  const content = options.map(el =>
    <option value={el} key={el}>{upperFirst(el)}</option>
  )

  return (
    <select value={currentOption} name={name} onChange={handleChange}>
      {content}
    </select>
  );
}

export default Select;
