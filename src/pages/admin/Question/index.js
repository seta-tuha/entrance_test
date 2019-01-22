import React from 'react';
import { isEmpty, toUpper } from 'lodash';
import Question from 'components/Question';
import { Loading } from 'components/Common';
import { validate, questionFromData } from 'ultis';
import { levelConfig, typeConfig, optionName } from 'config';
import {
  getQuestion,
  createQuestion,
  updateQuestion
} from 'services/api/firebase';

class QuestionPage extends React.Component {

  state = {
    question: {},
    options: [],
    answers: [],
    topic: '',
    level: levelConfig[0],
    type: typeConfig[0],
    isLoading: true,
    error: 'error',
  }

  componentDidMount() {
    const { match: { params: { questionId } } } = this.props;
    if (isEmpty(questionId)) {
      this.setState({ isLoading: false })
    } else {
      getQuestion(questionId, question => {
        this.setState({
          ...question,
          isLoading: false
        })
      })
    }
  }

  onClickAddOption = () => {
    this.setState(({ options }) =>
      options.length < optionName.length
        ? { options: [...options, { content: null }] }
        : { options }
    )
  }

  onEditorChange = name => content => {
    this.setState(({ options }) => {
      if (name === 'question') {
        return { question: { ...content } }
      } else {
        const index = optionName.indexOf(name);
        return {
          options: options.map((op, optionIndex) => {
            if (optionIndex === index) {
              return { ...content }
            }
            return op
          })
        }
      }
    })
  }

  onRemove = name => () => {
    this.setState(({ options, answers }) => {
      const index = optionName.indexOf(name);
      return {
        answers: answers.filter((answer, optionIndex) => optionIndex !== index),
        options: options.filter((op, optionIndex) => optionIndex !== index)
      }
    })
  }

  onCheck = name => () => {
    const index = optionName.indexOf(name);
    this.setState(({ answers, type }) => {
      if (answers.includes(index)) {
        return { answers: answers.filter(answer => answer !== index) }
      }

      if (type === typeConfig[0]) {
        return { answers: [index] }
      }

      if (answers.length < optionName.length - 1) {
        return { answers: [...answers, index] }
      }
    })
  }

  onSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      answers: []
    })
  }

  hasError = (maybeError, type) => {
    maybeError ? this.setState({
      ...maybeError,
      notification: `${toUpper} question fail`
    }) : this.setState({
      ...maybeError,
      notification: `${toUpper} question successfully`
    })
  }

  onSubmit = () => {
    // ToDo: validate already choose a correct answer
    const {
      question,
      options,
      answers,
      level,
      type
    } = this.state;
    const { match: { params: { topic, questionId } } } = this.props;

    try {
      validate(answers, options);

      const newQuestion = questionFromData({ question, options, answers, level, type, topic });

      if (!questionId) {
        createQuestion(topic, newQuestion, error =>
          this.hasError(error, 'create')
        );
      } else {
        updateQuestion(questionId, newQuestion, error =>
          this.hasError(error, 'update')
        );
      }
    } catch (err) {
      alert(err.message)
    }
  }

  render() {
    const { isLoading, error, ...question } = this.state;

    return (
      <React.Fragment>
        {
          isLoading
            ? <Loading />
            : <Question {...this.props}
              question={question}
              onCheck={this.onCheck}
              onSelect={this.onSelect}
              onSubmit={this.onSubmit}
              onRemove={this.onRemove}
              onEditorChange={this.onEditorChange}
              onClickAddOption={this.onClickAddOption}
            />
        }
      </React.Fragment>
    );
  }
}

export default QuestionPage;
