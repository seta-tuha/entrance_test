import React from 'react';
import PropTypes from 'prop-types';
import Draft from 'draft-js';
import Prism from 'prismjs';
import CheckCircle from '@material-ui/icons/CheckCircle';
import PrismDecorator from './decorators/PrismDraftDecorator';
import './index.css';

const {
  Editor, EditorState, convertFromRaw
} = Draft;
const prismDecorator = new PrismDecorator(Prism.languages.javascript);

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const Option = ({ initData, toggleCheck, meta }) => {
  return (
    <div className="option">
      <CheckCircle
        fontSize="small"
        onClick={() => toggleCheck(meta)}
        className={meta.checked ? 'checked' : ''}
      />
      <Editor
        customStyleMap={styleMap}
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(initData)),
          prismDecorator
        )}
        readOnly
      />
    </div>
  );
};

Option.propTypes = {
  initData: PropTypes.string.isRequired,
  toggleCheck: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    questionIndex: PropTypes.number,
    optionIndex: PropTypes.number,
    checked: PropTypes.bool
  }).isRequired
};

export default Option;
