import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timer from '@material-ui/icons/Timer';
import TimerMachine from 'react-timer-machine';
import { getExam, sendExamAnswers } from 'services/api/firebase';
import { DialogTitle, Button } from '@material-ui/core';
import { ModalContainer, Modal, Loading } from 'components/Common';
import momentDurationFormatSetup from 'moment-duration-format';
import { NotificationManager } from 'react-notifications';
import QuestionList from './QuestionList';
import './index.css';

momentDurationFormatSetup(moment);

class Candidate extends React.Component {
  state = {
    started: false,
    questions: [],
    page: 0,
    questionPerPage: 3,
    currentQuestion: 1,
    answers: [],
    isLoading: true
  }

  timer = React.createRef();

  componentDidMount() {
    const { match: { params: { examKey } } } = this.props;
    getExam(examKey, (questions) => {
      if (questions) {
        this.setState({
          questions,
          answers: Array.from(questions, () => -1),
          isLoading: false
        });
        setTimeout(() => this.setState({ started: true }), 1000);
      }
      // this.setState({ done: true });
    });
  }

  onBack = () => {
    this.setState(({ page, questionPerPage }) => ({
      page: page - 1,
      currentQuestion: (page - 1) * questionPerPage + 1
    }));
  }

  onForward = () => {
    this.setState(({ page, questionPerPage }) => ({
      page: page + 1,
      currentQuestion: (page + 1) * questionPerPage + 1
    }));
  }

  onClickBox = (index) => {
    const { questionPerPage, currentQuestion } = this.state;
    if (index > questionPerPage) {
      const p = Math.floor(index / questionPerPage);
      const page = (index / questionPerPage > p) ? p + 1 : p;
      this.setState({ page: page - 1, currentQuestion: index });
    } else if (index !== currentQuestion) {
      this.setState({ page: 0, currentQuestion: index });
    }
  }

  toggleCheck = ({ questionIndex, optionIndex }) => {
    this.setState(({ answers }) => ({
      answers: answers.map((ans, index) => {
        if (questionIndex === index) {
          if (ans === optionIndex) {
            return -1;
          }
          return optionIndex;
        }
        return ans;
      })
    }));
  }

  onSubmit = (callback = null) => {
    if (typeof callback === 'function') {
      callback();
    }
    const { milliseconds } = this.timer.current.state;
    const { match: { params: { examKey } } } = this.props;
    const { answers, questions } = this.state;

    sendExamAnswers({
      examKey,
      questionKeyArray: questions.map(q => q.id),
      answersArray: answers,
      time: {
        minutes: moment.duration(milliseconds).minutes(),
        seconds: moment.duration(milliseconds).seconds()
      }
    }, error => (error
      ? NotificationManager.error(error, 'Error')
      : NotificationManager.success('Send exam successfully', 'Success')
    ));
  }

  render() {
    const {
      started, questions, page, questionPerPage, currentQuestion, answers,
      isLoading
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className="count-down-clock">
          <Timer />
          <span className="timer">
            <TimerMachine
              ref={this.timer}
              timeStart={1800 * 1000}
              started={started}
              countdown
              interval={1000}
              formatTimer={(time, ms) =>
                moment.duration(ms, 'milliseconds').format('mm:ss')
              }
              onComplete={this.onSubmit}
            />
          </span>
        </div>
        <ModalContainer
          modalComponent={
            ({ closeModal }) => (
              <Modal
                renderHeader={() => (
                  <DialogTitle>
                    Do you want to submit this test?
                  </DialogTitle>
                )}
                renderLeftBtn={() => (
                  <Button onClick={closeModal} color="primary" aria-label="Cancel">
                    Cancel
                  </Button>
                )}
                renderRightBtn={() => (
                  <Button
                    onClick={() => this.onSubmit(closeModal)} color="primary"
                    aria-label="Send Test"
                  >
                    Send Test
                  </Button>
                )}
              />
            )}
          mainComponent={
            ({ openModal }) => (
              <QuestionList
                questions={questions}
                answers={answers}
                page={page}
                questionPerPage={questionPerPage}
                currentQuestion={currentQuestion}
                openModal={openModal}
                onBack={this.onBack}
                onClickBox={this.onClickBox}
                onForward={this.onForward}
                toggleCheck={this.toggleCheck}
              />
            )}
        />
      </React.Fragment>
    );
  }
}

Candidate.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Candidate;
