import React from 'react';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RichInput from '../input';

class AnswerInput extends React.Component {

  handleRemove = name => () => {
    const { remove } = this.props;
    remove(name);
  }

  handleCheck = name => () => {
    const { check } = this.props;
    check(name);
  }

  render() {
    const { name, isAnswer } = this.props;

    return (
      <div className="answer-wrapper flex-row">
        <RemoveCircleOutline fontSize="small" className="removeIcon"
          onClick={this.handleRemove(name)}
        >
        </RemoveCircleOutline>
        <CheckCircle fontSize="small" className={isAnswer ? "isAnswer" : "checkIcon"}
          onClick={this.handleCheck(name)} />
        <div className="flex-row answer">
          <div className="answer-name">
            <span className={isAnswer ? "answerName" : "optionName"}>{name}.</span>
          </div>
          <div className="editor">
            <RichInput />
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerInput;
