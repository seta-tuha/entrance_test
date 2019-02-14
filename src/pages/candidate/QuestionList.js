import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Paper, Button } from '@material-ui/core';
import { DraftInput, Option } from 'components/RichEditor';
import momentDurationFormatSetup from 'moment-duration-format';
import './questionList.css';

momentDurationFormatSetup(moment);

const QuestionList = ({
  questions, answers, page, questionPerPage, currentQuestion, onClickBox,
  openModal, toggleCheck
}) => {
  const showedQuestions = questions.slice(page * questionPerPage,
    page * questionPerPage + questionPerPage);

  return (
    <React.Fragment>
      <div className="test-layout">
        <div className="transcript">
          <Paper className="question-box-wrapper" elevation={1}>
            {questions.map((i, index) => (
              <div
                key={index} role="presentation" // eslint-disable-line
                className={
                  (index === currentQuestion - 1)
                    ? 'question-box current-question'
                    : 'question-box'
                }
                onClick={() => onClickBox(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </Paper>
          <Button
            type="button" fullWidth color="primary"
            variant="contained"
            onClick={openModal}
          >
            Submit
          </Button>
        </div>
        <div className="question-list">
          {
            showedQuestions.map((q, qIndex) => (
              <Paper key={q.id} className="candidate-question">
                <p className="candidate-question-title">
                  Câu hỏi
                  {' '}
                  {page * questionPerPage + qIndex + 1}
                </p>
                <DraftInput initData={q.content} />
                <div className="options">
                  {
                    q.options.map((op, opIndex) => (
                      <Option
                        key={`${qIndex}${opIndex}`} //eslint-disable-line
                        initData={op.content}
                        className="option"
                        meta={{
                          questionIndex: page * questionPerPage + qIndex,
                          optionIndex: opIndex,
                          checked: answers[page * questionPerPage + qIndex] === opIndex
                        }}
                        toggleCheck={toggleCheck}
                      />
                    ))
                  }
                </div>
              </Paper>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
  page: PropTypes.number.isRequired,
  questionPerPage: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  onClickBox: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  toggleCheck: PropTypes.func.isRequired
};

export default QuestionList;
