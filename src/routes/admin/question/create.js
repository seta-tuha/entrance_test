import React from 'react';
import RichQuestion from '../../../components/question';
import { levelConfig, typeConfig } from '../../../config';

class CreateQuestionPage extends React.Component {
  render() {
    const question = {
      question: {},
      options: [],
      answers: [],
      level: levelConfig[0],
      type: typeConfig[0],
    }

    return (
      <div>
        <h3>Create questions page</h3>
        <RichQuestion {...this.props} question={question}
          typeOfSubmit='create'
        />
      </div>
    );
  }
}

export default CreateQuestionPage;
