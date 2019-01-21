import React from 'react';
import Select from '../Select';
import RichInput from '../Input';
import AnswerInput from '../AnswerInput';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { isEmpty, remove, indexOf } from 'lodash';
import { validate, questionFromData } from './helper';
import { createQuestion, updateQuestion } from '../../firebase';
import { levelConfig, typeConfig, optionName } from '../../config';

class Question extends React.Component {

  state = { ...this.props.question }

  shouldComponentUpdate(nextProps, nextState) {
    const { options } = nextState;
    if (options.length > optionName.length) {
      return false;
    }

    return true;
  }

  onClickNewOption = e => {
    const { options } = this.state;
    const newOptions = this.addNewOption(options);

    this.setState({ options: newOptions });
  }

  onInputChange = name => content => {
    const { options } = this.state;
    if (name === 'question') {
      this.setState({ question: { ...content } })
    } else {
      const index = indexOf(optionName, name);
      options[index] = { ...content }
      this.setState({ options })
    }
  }

  onRemove = name => () => {
    const { options, answers: currentanswers } = this.state;
    const index = indexOf(optionName, name);

    options.splice(index, 1);
    remove(currentanswers, key => key > options.length - 1);

    this.setState({
      options,
      answers: currentanswers
    })
  }

  onCheck = name => () => {
    const { answers, type } = this.state;

    const index = indexOf(optionName, name);

    if (answers.includes(index)) { // toggle click: when click 2nth time into a options will remove it from answers
      remove(answers, key => key === index)
      return this.setState({ answers })
    }

    if (type === typeConfig[0] && (
      isEmpty(answers) || answers.length === 1) // add only one correct answer if type of question is 'single choice'
    ) {
      this.setState({ answers: [index] })
    } else if (type === typeConfig[1]) { // when type of question is 'multiple choices'
      if (answers.length < optionName.length - 1) { // do not allowed choose correct answer more than the number of options
        answers.push(index);
        this.setState({ answers });
      }
    }
  }

  onSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      answers: []
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
    const { typeOfSubmit,
      match: { params: { topic, questionId } }
    } = this.props;

    try {
      validate(answers, options);

      const newQuestion = questionFromData({ question, options, answers, level, type, topic });

      if (typeOfSubmit === 'create') {
        createQuestion(topic, newQuestion, ({ notification }) =>
          alert(notification)
        );
      } else if (typeOfSubmit === 'update') {
        updateQuestion(questionId, newQuestion, ({ notification }) =>
          alert(notification)
        );
      }
    } catch (err) {
      alert(err.message)
    }
  }

  isAnswer = index => {
    const { answers } = this.state;
    return answers.includes(index);
  }

  addNewOption = options => {
    if (options.length < optionName.length) {
      return [
        ...options,
        { answer: null }
      ]
    }

    return options;
  }

  render() {
    const { options, type, level, question: { content } } = this.state;
    const optionContent = options.map((op, index) => {
      const name = optionName[index];

      return (
        <AnswerInput name={name} key={name} content={op.content}
          remove={this.onRemove}
          check={this.onCheck}
          isAnswer={this.isAnswer(index)}
          handleChange={this.onInputChange}
        />
      );
    })

    return (
      <Paper>
        <div className="question-wrapper">
          <div className="editor-container">
            <div className="flex-row config">
              <Select value={level} options={levelConfig}
                name="level" handleChange={this.onSelect}
              />
              <Select value={type} options={typeConfig}
                name="type" handleChange={this.onSelect}
              />
            </div>
            <div className="question">
              <RichInput handleChange={this.onInputChange('question')}
                content={content}
              />
            </div>
            <div className="answer-group">
              {optionContent}
            </div>
            <Button type="button" variant="outlined" size="small"
              color="primary" onClick={this.onClickNewOption}
            >
              Add an answer toption
          </Button>
          </div>

          <Button type="button" color="primary" variant="contained" fullWidth
            onClick={this.onSubmit}
          >
            Submit
        </Button>
        </div>
      </Paper>
    );
  }
}

export default Question;
