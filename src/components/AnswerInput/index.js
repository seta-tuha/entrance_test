import React from 'react';
import PropTypes from 'prop-types';
import { RichEditor } from 'components/RichEditor';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import './index.css';

const AnswerInput = ({
  meta,
  name,
  check,
  remove,
  content,
  isAnswer,
  onChange
}) => {
  return (
    <div className="answer-wrapper">
      <RemoveCircleOutline
        fontSize="small" className="removeIcon"
        onClick={() => remove(meta)}
      />
      <CheckCircle
        fontSize="small" onClick={() => check(meta)}
        className={isAnswer ? 'isAnswer' : 'checkIcon'}
      />
      <div className="answer-name">
        <span className={isAnswer ? 'answerName' : 'optionName'}>
          {name}
          .
        </span>
      </div>
      <div className="editor">
        <RichEditor onChange={onChange} initData={content} meta={meta} />
      </div>
    </div>
  );
};

AnswerInput.defaultProps = {
  content: ''
};

AnswerInput.propTypes = {
  meta: PropTypes.shape({
    questionIndex: PropTypes.number.isRequired,
    optionIndex: PropTypes.number.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  check: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  content: PropTypes.string,
  isAnswer: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AnswerInput;
