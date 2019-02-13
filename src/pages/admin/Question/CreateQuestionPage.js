import React from 'react';
import { isEmpty } from 'lodash';
import Question from 'components/Question';
import Button from '@material-ui/core/Button';
import QuestionBoxs from 'components/QuestionBoxs';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import QuestionPage from './index';

const CreateQuestionPage = ({ ...props }) => {
  return (
    <QuestionPage {...props}>
      {({
        questions,
        onCheck,
        onSubmit,
        onSelect,
        onRemoveOption,
        onUpdateQuestion,
        onUpdateAnswer,
        onClickAddOption,
        onRemoveQuestion,
        onClickAddQuestion,
        onInitQuestion
      }) => {
        if (isEmpty(questions)) {
          return (
            <React.Fragment>
              <div>Tạo câu hỏi</div>
              <Button
                color="primary" onClick={onInitQuestion}
                aria-label="Create new question"
              >
                Create new question
              </Button>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            <div className="question-input">
              <div className="list-question">
                {
                  questions.map((q, qIndex) => (
                    <Question
                      {...props} key={qIndex} question={q} // eslint-disable-line
                      meta={{ questionIndex: qIndex }}
                      onCheck={onCheck}
                      onSelect={onSelect}
                      onRemoveOption={onRemoveOption}
                      onUpdateQuestion={onUpdateQuestion}
                      onClickAddOption={onClickAddOption}
                      onRemoveQuestion={onRemoveQuestion}
                      onUpdateAnswer={onUpdateAnswer}
                      renderDeleteButton={() => (
                        <Tooltip title="Delete" placement="right-start">
                          <IconButton
                            onClick={() => onRemoveQuestion(qIndex)}
                            aria-label="Delete question"
                          >
                            <DeleteIcon
                              className="delete" size="large"
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      renderSubmitButton={() => null}
                    />
                  ))
                }
              </div>
              <Button
                aria-label="Add new question"
                type="button" color="primary" variant="contained"
                fullWidth onClick={onClickAddQuestion}
              >
                Add new question
              </Button>
            </div>
            <div className="sidebar-action">
              <Button
                type="button" variant="outlined" fullWidth
                color="primary" onClick={onSubmit} aria-label="Save"
              >
                Save
              </Button>
              <QuestionBoxs questions={questions.map(q => q.answers)} />
            </div>
          </React.Fragment>
        );
      }}
    </QuestionPage>
  );
};
export default CreateQuestionPage;
