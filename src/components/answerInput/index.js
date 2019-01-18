import React from 'react';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RichInput from '../input';

const AnswerInput = ({
  name,
  check,
  remove,
  content,
  isAnswer,
  handleChange,
}) => {
  return (
    <div className="answer-wrapper flex-row">
      <RemoveCircleOutline fontSize="small" className="removeIcon"
        onClick={remove(name)}
      >
      </RemoveCircleOutline>
      <CheckCircle fontSize="small" className={isAnswer ? "isAnswer" : "checkIcon"}
        onClick={check(name)} />
      <div className="flex-row answer">
        <div className="answer-name">
          <span className={isAnswer ? "answerName" : "optionName"}>{name}.</span>
        </div>
        <div className="editor">
          <RichInput handleChange={handleChange(name)} content={content} />
        </div>
      </div>
    </div>
  );
}

export default AnswerInput;
