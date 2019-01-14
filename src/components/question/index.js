import React from 'react';
import config from './config';
import Select from '../select';
import RichInput from '../input';
import AnswerInput from '../answerInput';
import { withFirebase } from '../../firebase';
import Button from '@material-ui/core/Button';
import { isEmpty, remove, indexOf } from 'lodash';
import { validate, questionFromData } from './helper';

const topic = window.location.pathname.split('/')[3];

class RichQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: this.props.question || '',
      answerOptions: [{ answer: null }],
      answerKeys: [],
      type: config.type[0],
      level: config.level[0],
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { answerOptions } = nextState;
    if (answerOptions.length > config.optionName.length) {
      return false;
    }

    return true;
  }

  handleClick = e => {
    const { answerOptions } = this.state;
    const newOptions = this.addNewOption(answerOptions);

    this.setState({ answerOptions: newOptions });
  }

  handleSubmit = () => {
    // ToDo: validate already choose a correct answer
    const { question, answerOptions, answerKeys, level, type } = this.state;
    const newQuestion = questionFromData(question, answerOptions, answerKeys, level, type);

    try {
      validate(answerKeys, answerOptions);
      const { firebase } = this.props;
      const { key: questionId } = firebase.questions().push(newQuestion, function (error) { // push the question to questions
        if (error)
          alert('Error has occured during saving process')
        else
          alert("Question has been saved succesfully")
      })

      firebase.topicId(topic).then(res => { // push the question just created to topic
        const id = Object.keys(res.val())[0];
        firebase.topic(id).push({ id: questionId })
      });

    } catch (err) {
      alert(err.message)
    }
  }

  handleContentChange = name => input => {
    const { answerOptions, question } = this.state;
    if (name === 'question') {
      this.setState({ question: input })
    } else {
      const index = indexOf(config.optionName, name);
      answerOptions[index] = { ...input }
      this.setState({ answerOptions })
    }
  }

  handleRemove = name => {
    const { answerOptions, answerKeys: currentAnswerKeys } = this.state;
    const index = indexOf(config.optionName, name);

    answerOptions.splice(index, 1);
    remove(currentAnswerKeys, key => key > answerOptions.length - 1);

    this.setState({
      answerOptions,
      answerKeys: currentAnswerKeys
    })
  }

  handleCheck = name => {
    const { answerKeys, type } = this.state;

    const index = indexOf(config.optionName, name);

    if (answerKeys.includes(index)) { // toggle click: when click 2nth time into a options will remove it from answerKeys
      remove(answerKeys, key => key === index)
      return this.setState({ answerKeys })
    }

    if (type === config.type[0] && (
      isEmpty(answerKeys) || answerKeys.length === 1) // add only one correct answer if type of question is 'single choice'
    ) {
      this.setState({ answerKeys: [index] })
    } else if (type === config.type[1]) { // when type of question is 'multiple choices'
      if (answerKeys.length < config.optionName.length - 1) { // do not allowed choose correct answer more than the number of options
        answerKeys.push(index);
        this.setState({ answerKeys });
      }
    }
  }

  handleSelectionChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      answerKeys: []
    })
  }

  isAnswer = index => {
    const { answerKeys } = this.state;
    return answerKeys.includes(index);
  }

  addNewOption = options => {
    if (options.length < config.optionName.length) {
      return [
        ...options,
        { answer: null }
      ]
    }

    return options;
  }

  render() {
    const { answerOptions, type, level, question } = this.state;
    const options = answerOptions.map((op, index) => {
      const name = config.optionName[index];
      return (
        <AnswerInput name={name} key={name} content=''
          remove={this.handleRemove}
          check={this.handleCheck}
          isAnswer={this.isAnswer(index)}
          handleChange={this.handleContentChange}
        />
      );
    })

    return (
      <div className="question-wrapper">
        <div className="editor-container">
          <div className="flex-row config">
            <Select currentOption={level} options={config.level}
              name="level" handleChange={this.handleSelectionChange}
            />
            <Select currentOption={type} options={config.type}
              name="type" handleChange={this.handleSelectionChange}
            />
          </div>
          <div className="question">
            <RichInput handleChange={this.handleContentChange('question')}
              content={question}
            />
          </div>
          <div className="answer-group">
            {options}
          </div>
          <Button type="button" variant="outlined" size="small" color="primary"
            onClick={this.handleClick}
          >
            Add an answer toption
          </Button>
        </div>

        <Button type="button" color="primary" variant="contained" fullWidth
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
  }
}


export default withFirebase(RichQuestion);
