import React from 'react';
import Select from 'components/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RichEditor from 'components/RichEditor';
import AnswerInput from 'components/AnswerInput';
import { levelConfig, typeConfig, optionName } from 'config';
import { withStyles } from '@material-ui/core/styles';
import { Element } from 'react-scroll';

const styles = theme => ({
  paper: {
    marginBottom: '1.5rem',
    padding: '0.5rem 0'
  },
  button: {
    marginBottom: '0.5rem'
  }
})

const Question = ({
  meta,
  question,
  onCheck,
  onSelect,
  onRemoveOption,
  onRemoveQuestion,
  onUpdateQuestion,
  onUpdateAnswer,
  onClickAddOption,
  classes,
  renderDeleteButton,
  renderSubmitButton
}) => {
  const { options, answers, level, type, content } = question;

  const optionContent = options.map((op, index) => {
    const name = optionName[index];

    return (
      <AnswerInput name={name} key={name} content={op.content}
        meta={{ ...meta, optionIndex: index }}
        check={onCheck}
        remove={onRemoveOption}
        onChange={onUpdateAnswer({ ...meta, optionIndex: index })}
        isAnswer={answers.includes(index)}
      />
    );
  })

  return (
    <Element name={`question_${meta.questionIndex + 1}`}>
      <Paper className={classes.paper}>
        <div className="question-wrapper">
          <div className="editor-container">
            <div className="action">
              <p className="title">Câu hỏi {meta.questionIndex + 1} </p>
              <div className="config">
                <Select value={level} options={levelConfig}
                  name="level" onSelect={e => onSelect(e, meta.questionIndex)}
                />
                <Select value={type} options={typeConfig}
                  name="type" onSelect={e => onSelect(e, meta.questionIndex)}
                />
                {renderDeleteButton()}
              </div>
            </div>
            <div className="question">
              <RichEditor onChange={onUpdateQuestion(meta)}
                initData={content} meta={meta}
              />
            </div>
            <div className="answer-group">
              {optionContent}
            </div>
            <div className="action">
              <Button type="button" size="small" color="primary"
                className={classes.button}
                onClick={() => onClickAddOption(meta.questionIndex)}
              >
                Add an answer toption
            </Button>
            </div>
            {renderSubmitButton()}
          </div>
        </div>
      </Paper>
    </Element>
  );
}

export default withStyles(styles)(Question);
