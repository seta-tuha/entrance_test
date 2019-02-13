import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Paper, Button } from '@material-ui/core';
import { DraftInput, Option } from 'components/RichEditor';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import momentDurationFormatSetup from 'moment-duration-format';
import './questionList.css';

momentDurationFormatSetup(moment);

const QuestionList = ({
  questions, answers, page, questionPerPage, currentQuestion, onBack,
  onClickBox, onForward, openModal, toggleCheck
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
          {/* <Paper className="question" elevation={1}> */}
          <div>
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
          {/* </Paper> */}
          <div className="test-action-bar">
            <Button
              type="button" variant="contained"
              disabled={page === 0}
              onClick={onBack}
            >
              <ArrowBack />
              Back
            </Button>
            <Button
              type="button" variant="contained"
              disabled={page >= Math.floor(questions.length / questionPerPage) - 1}
              onClick={onForward}
            >
              Next
              <ArrowForward />
            </Button>
          </div>
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
  onBack: PropTypes.func.isRequired,
  onClickBox: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  toggleCheck: PropTypes.func.isRequired
};

export default QuestionList;
