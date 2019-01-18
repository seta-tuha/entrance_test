import React from 'react';
import { getQuestion } from '../../../firebase';
import { Loading } from '../../../components/common';
import RichQuestion from '../../../components/question';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      question: {},
      options: [],
      answers: [],
      level: '',
      type: '',
      topic: '',
      isLoading: true,
      error: 'error'
    }
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getQuestion(id, state => this.setState({ ...state }))
  }

  render() {
    const { isLoading, error, ...question } = this.state;
    return (
      <React.Fragment>
        {
          isLoading
            ? <Loading />
            : <RichQuestion {...this.props} question={question}
              typeOfSubmit='update'
            />
        }
      </React.Fragment>
    );
  }
}

export default Question;
