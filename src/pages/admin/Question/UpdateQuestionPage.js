import React from 'react';
import PropTypes from 'prop-types';
import Question from 'components/Question';
import Button from '@material-ui/core/Button';
import QuestionPage from './index';

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
                fullWidth onClick={onSubmit}
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

UpdateQuestionPage.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default UpdateQuestionPage;
