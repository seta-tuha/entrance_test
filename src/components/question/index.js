import React from 'react';
import RichInput from '../input';
import AnswerInput from '../answerInput';
import { isEmpty, remove, indexOf } from 'lodash';
import { withFirebase } from '../../firebase';
import Select from '../select';

const alpha = ['A', 'B', 'C', 'D'];

const levelConfig = ['easy', 'medium', 'hard'];

const typeConfig = ['single choice', 'multiple choices'];

class RichQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      answerOptions: [{ answer: null }], // [{answer: null}, {answer: null}]
      answerKeys: [],
      type: typeConfig[0],
      level: levelConfig[0],
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { answerOptions } = nextState;
    if (answerOptions.length > alpha.length) {
      return false;
    }

    return true;
  }

  handleClick = () => {
    const { answerOptions } = this.state;
    const newOptions = this.addNewOption(answerOptions);

    this.setState({ answerOptions: newOptions });
  }

  handleRemove = name => {
    const { answerOptions, answerKeys: currentAnswerKeys } = this.state;
    const index = indexOf(alpha, name);

    answerOptions.splice(index, 1);
    remove(currentAnswerKeys, key => key > answerOptions.length - 1);

    this.setState({
      answerOptions,
      answerKeys: currentAnswerKeys
    })
  }

  handleCheck = name => {
    const { answerKeys, type } = this.state;

    const index = indexOf(alpha, name);

    if (answerKeys.includes(index)) {
      remove(answerKeys, key => key === index)
      return this.setState({ answerKeys })
    }

    if (type === typeConfig[0] && (
      isEmpty(answerKeys) || answerKeys.length === 1)
    ) {
      this.setState({ answerKeys: [index] })
    } else if (type === typeConfig[1]) {
      if (answerKeys.length < alpha.length) {
        answerKeys.push(index);
        this.setState({ answerKeys });
      }
    }
  }

  handleChange = e => {
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
    if (options.length < alpha.length) {
      return [
        ...options,
        { answer: null }
      ]
    }

    return options;
  }

  render() {
    const { answerOptions, type, level } = this.state;
    const options = answerOptions.map((op, index) => {
      const name = alpha[index];
      return (
        <AnswerInput name={name} key={name}
          remove={this.handleRemove}
          check={this.handleCheck}
          isAnswer={this.isAnswer(index)}
        />
      );
    })

    return (
      <div style={styles.form} >
        <div className="editorContainer">
          <div className="flex-row config">
            <Select currentOption={level} options={levelConfig}
              name="level" handleChange={this.handleChange}
            />
            <Select currentOption={type} options={typeConfig}
              name="type" handleChange={this.handleChange}
            />
          </div>
          <div className="question">
            <RichInput />
          </div>
          <div className="answer-group">
            {options}
          </div>
          <button type="button" onClick={this.handleClick}>
            Add an answer option
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  form: {
    width: '70%',
    margin: '0 auto'
  }
}


export default withFirebase(RichQuestion);
