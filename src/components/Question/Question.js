import React from 'react';
import Select from 'components/Select';
import RichInput from 'components/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AnswerInput from 'components/AnswerInput';
import { levelConfig, typeConfig, optionName } from 'config';

const Question = ({
  onCheck,
  onSubmit,
  onSelect,
  onRemove,
  onInputChange,
  onClickNewOption,
  question,
}) => {
  const { options, answers, level, type, question: { content } } = question;
  const optionContent = options.map((op, index) => {
    const name = optionName[index];

    return (
      <AnswerInput name={name} key={name} content={op.content}
        remove={onRemove}
        check={onCheck}
        isAnswer={answers.includes(index)}
        handleChange={onInputChange}
      />
    );
  })

  return (
    <Paper>
      <div className="question-wrapper">
        <div className="editor-container">
          <div className="flex-row config">
            <Select value={level} options={levelConfig}
              name="level" handleChange={onSelect}
            />
            <Select value={type} options={typeConfig}
              name="type" handleChange={onSelect}
            />
          </div>
          <div className="question">
            <RichInput handleChange={onInputChange('question')}
              content={content}
            />
          </div>
          <div className="answer-group">
            {optionContent}
          </div>
          <Button type="button" variant="outlined" size="small"
            color="primary" onClick={onClickNewOption}
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
