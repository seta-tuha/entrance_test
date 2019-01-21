import React from 'react';
import { getQuestion } from '../../../firebase';
import { Loading } from '../../../components/Common';
import Question from '../../../components/Question';

class QuestionPage extends React.Component {
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
    const { match: { params: { questionId } } } = this.props;
    getQuestion(questionId, state => this.setState({ ...state }))
  }

  render() {
    const { isLoading, error, ...question } = this.state;
    return (
      <React.Fragment>
        {
          isLoading
            ? <Loading />
            : <Question {...this.props} question={question}
              typeOfSubmit='update'
            />
        }
      </React.Fragment>
    );
  }
}

export default QuestionPage;
