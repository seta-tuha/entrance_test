import React from 'react';
import Select from 'components/Select';
import RichEditor from 'components/RichEditor';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AnswerInput from 'components/AnswerInput';
import { levelConfig, typeConfig, optionName } from 'config';

const Question = ({
  question,
  onCheck,
  onSubmit,
  onSelect,
  onRemove,
  onEditorChange,
  onClickAddOption,
}) => {
  const { options, answers, level, type, question: { content } } = question;

  const optionContent = options.map((op, index) => {
    const name = optionName[index];

    return (
      <AnswerInput name={name} key={name} content={op.content}
        check={onCheck}
        remove={onRemove}
        onChange={onEditorChange}
        isAnswer={answers.includes(index)}
      />
    );
  })

  return (
    <Paper>
      <div className="question-wrapper">
        <div className="editor-container">
          <div className="flex-row config">
            <Select value={level} options={levelConfig}
              name="level" onSelect={onSelect}
            />
            <Select value={type} options={typeConfig}
              name="type" onSelect={onSelect}
            />
          </div>
          <div className="question">
            <RichEditor onChange={onEditorChange('question')}
              initData={content}
            />
          </div>
          <div className="answer-group">
            {optionContent}
          </div>
          <Button type="button" variant="outlined" size="small"
            color="primary" onClick={onClickAddOption}
          >
            Add an answer toption
          </Button>
        </div>

        <Button type="button" color="primary" variant="contained" fullWidth
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}

export default Question;
