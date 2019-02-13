import React from 'react';
import Question from 'components/Question';
import Button from '@material-ui/core/Button';
import QuestionPage from './index';

const UpdateQuestionPage = ({ ...props }) => {
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
        onClickAddOption
      }) => (
        <div className="list-question">
          <Question
            {...props}
            question={questions[0]}
            meta={{ questionIndex: 0 }}
            onCheck={onCheck}
            onSelect={onSelect}
            onRemoveOption={onRemoveOption}
            onUpdateQuestion={onUpdateQuestion}
            onClickAddOption={onClickAddOption}
            onUpdateAnswer={onUpdateAnswer}
            renderSubmitButton={() => (
              <Button
                type="button" color="primary" variant="contained"
                fullWidth onClick={onSubmit} aria-label="Save"
              >
                Save
              </Button>
            )}
            renderDeleteButton={() => null}
          />
        </div>
      )}
    </QuestionPage>
  );
};

export default UpdateQuestionPage;
