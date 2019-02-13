import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, capitalize } from 'lodash';
import { Loading } from 'components/Common';
import { levelConfig, typeConfig, optionName } from 'config';
import { questionFromData, listQuestionsFromData } from 'ultis';
import { Events, scrollSpy } from 'react-scroll';
import {
  getQuestion,
  createQuestion,
  updateQuestion
} from 'services/api/firebase';
import { NotificationManager } from 'react-notifications';
import UpdateQuestionPage from './UpdateQuestionPage';
import CreateQuestionPage from './CreateQuestionPage';

const emptyQuestion = {
  content: '',
  options: [],
  answers: [],
  level: levelConfig[0],
  type: typeConfig[0]
};

class QuestionPage extends React.Component {
  state = {
    isLoading: true,
    questions: []
  }

  componentDidMount() {
    const { match: { params: { questionId } } } = this.props;

    Events.scrollEvent.register('begin');

    Events.scrollEvent.register('end');

    scrollSpy.update();

    if (isEmpty(questionId)) {
      this.setState({ questions: [emptyQuestion], isLoading: false });
    } else {
      this.unsubscribe = getQuestion(questionId, (question) => {
        this.setState(({ questions }) => ({
          questions: [...questions, question],
          isLoading: false
        }));
      });
    }
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  }

  onClickAddOption = (questionIndex) => {
    this.setState(({ questions }) => ({
      questions: questions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          return q.options.length < optionName.length
            ? { ...q, options: [...q.options, { content: null }] }
            : q;
        }
        return q;
      })
    }));
  }

  onClickAddQuestion = () => {
    this.setState(({ questions }) => ({
      questions: [...questions, emptyQuestion]
    }));
  }

  onUpdateQuestion = meta => (content) => {
    this.setState(({ questions }) => ({
      questions: questions.map((q, qIndex) => {
        if (qIndex === meta.questionIndex) {
          return { ...q, content };
        }
        return q;
      })
    }));
  }

  onUpdateAnswer = meta => (content) => {
    this.setState(({ questions }) => ({
      questions: questions.map((q, qIndex) => {
        if (qIndex === meta.questionIndex) {
          return {
            ...q,
            options: q.options.map((op, opIndex) => {
              if (opIndex === meta.optionIndex) {
                return {
                  content
                };
              }
              return op;
            })
          };
        }
        return q;
      })
    }));
  }

  onRemoveOption = ({ questionIndex, optionIndex }) => {
    this.setState(({ questions }) => ({
      questions: questions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...q,
            answers: q.answers.filter((op, opIndex) => opIndex !== optionIndex),
            options: q.options.filter((op, opIndex) => opIndex !== optionIndex)
          };
        }
        return q;
      })
    }));
  }

  onRemoveQuestion = questionIndex => this.setState(({ questions }) => ({
    questions: questions.filter((q, qIndex) => qIndex !== questionIndex)
  }))

  onCheck = ({ questionIndex, optionIndex }) => {
    this.setState(({ questions }) => ({
      questions: questions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          const { answers, type } = q;
          if (answers.includes(optionIndex)) {
            return {
              ...q,
              answers: answers.filter(answer => answer !== optionIndex)
            };
          }
          if (type === typeConfig[0]) {
            return { ...q, answers: [optionIndex] };
          }
          if (answers.length < optionName.length - 1) {
            return { ...q, answers: [...answers, optionIndex] };
          }
        }
        return q;
      })
    }));
  }

  onSelect = (e, questionIndex) => {
    this.setState(({ questions }) => ({
      questions: questions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          if (e.target.name === 'level') {
            return { ...q, [e.target.name]: e.target.value };
          }
          return { ...q, [e.target.name]: e.target.value, answers: [] };
        }
        return q;
      })
    }));
  }

  onDelete = (e, callback) => {
    callback();
  }

  onInitQuestion = () => this.setState({
    questions: [emptyQuestion], isLoading: false
  })

  /* eslint-disable no-unused-expressions */
  hasError = ({ error }, type) => {
    error
      ? NotificationManager.warning(`${capitalize(type)} question fail`,
        `${capitalize(type)} fail`)
      : NotificationManager.success(`${capitalize(type)} question successfully`,
        `${capitalize(type)} fail`);
  }
  /* eslint-eable no-unused-expressions */

  onSubmit = () => {
    // ToDo: validate already choose a correct answer
    const { questions } = this.state;
    const { match: { params: { topic, questionId } } } = this.props;
    try {
      // validate(answers, options);
      if (questionId) {
        const newQuestion = questionFromData({ ...questions[0] });
        updateQuestion(questionId, newQuestion, error =>
          this.hasError(error, 'update'));
      } else {
        const listQuestions = listQuestionsFromData(questions, topic);
        createQuestion(topic, listQuestions, error =>
          this.hasError(error, 'create'));
      }
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  setQuestionRef = (node, questionIndex) => {
    this[`question_${questionIndex + 1} `] = node;
  }

  render() {
    const { isLoading, questions } = this.state;
    const { children } = this.props;

    return (
      <React.Fragment>
        {
          isLoading
            ? <Loading />
            : children({
              questions,
              onCheck: this.onCheck,
              onSubmit: this.onSubmit,
              onSelect: this.onSelect,
              onRemoveOption: this.onRemoveOption,
              onUpdateAnswer: this.onUpdateAnswer,
              onUpdateQuestion: this.onUpdateQuestion,
              onClickAddOption: this.onClickAddOption,
              onClickAddQuestion: this.onClickAddQuestion,
              onRemoveQuestion: this.onRemoveQuestion,
              onInitQuestion: this.onInitQuestion
            })
        }
      </React.Fragment>
    );
  }
}

export default QuestionPage;

QuestionPage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  children: PropTypes.func.isRequired
};

export { UpdateQuestionPage, CreateQuestionPage };
