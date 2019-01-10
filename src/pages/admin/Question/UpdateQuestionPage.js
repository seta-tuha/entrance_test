import React from 'react';
import QuestionPage from './index';
import Question from 'components/Question';
import Button from '@material-ui/core/Button';

const UpdateQuestionPage = ({ classes, ...props }) => {
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
      }) =>
        <div className="list-question">
          <Question {...props}
            question={questions[0]}
            meta={{ questionIndex: 0 }}
            onCheck={onCheck}
            onSelect={onSelect}
            onRemoveOption={onRemoveOption}
            onUpdateQuestion={onUpdateQuestion}
            onClickAddOption={onClickAddOption}
            onUpdateAnswer={onUpdateAnswer}
            renderSubmitButton={() =>
              <Button type="button" color="primary" variant="contained"
                fullWidth onClick={onSubmit}
              >
                Save
              </Button>
            }
            renderDeleteButton={() => null}
          />
        </div>
      }
    </QuestionPage>
  );
}

export default UpdateQuestionPage;
