import React from 'react';
import RichEditor from 'components/RichEditor';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

const AnswerInput = ({
  name,
  check,
  remove,
  content,
  isAnswer,
  onChange,
}) => {
  return (
    <div className="answer-wrapper flex-row">
      <RemoveCircleOutline fontSize="small" className="removeIcon"
        onClick={remove(name)}
      >
      </RemoveCircleOutline>
      <CheckCircle fontSize="small" onClick={check(name)}
        className={isAnswer ? "isAnswer" : "checkIcon"}
      />
      <div className="flex-row answer">
        <div className="answer-name">
          <span className={isAnswer ? "answerName" : "optionName"}>
            {name}.
          </span>
        </div>
        <div className="editor">
          <RichEditor onChange={onChange(name)} initData={content} />
        </div>
      </div>
    </div>
  );
}

export default AnswerInput;
