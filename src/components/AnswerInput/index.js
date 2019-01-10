import React from 'react';
import RichEditor from 'components/RichEditor';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

const AnswerInput = ({
  meta,
  name,
  check,
  remove,
  content,
  isAnswer,
  onChange,
}) => {
  return (
    <div className="answer-wrapper">
      <RemoveCircleOutline fontSize="small" className="removeIcon"
        onClick={() => remove(meta)}
      >
      </RemoveCircleOutline>
      <CheckCircle fontSize="small" onClick={() => check(meta)}
        className={isAnswer ? "isAnswer" : "checkIcon"}
      />
      <div className="answer-name">
        <span className={isAnswer ? "answerName" : "optionName"}>
          {name}.
          </span>
      </div>
      <div className="editor">
        <RichEditor onChange={onChange} initData={content} meta={meta} />
      </div>
    </div>
  );
}

export default AnswerInput;
