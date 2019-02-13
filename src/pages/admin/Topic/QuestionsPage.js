import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Common';
import Button from '@material-ui/core/Button';
import { QuestionTable } from 'components/Table';
import { getQuestions, deleteQuestion } from 'services/api/firebase';
import { NotificationManager } from 'react-notifications';

class QuestionsPage extends React.Component {
  state = {
    questions: [],
    isLoading: true
  }

  componentDidMount() {
    const { match: { params: { topic } } } = this.props;

    getQuestions(topic, ({ questions, isLoading }) =>
      this.setState({ questions, isLoading }));
  }

  onCreate = () => {
    const { history, match: { params: { topic } } } = this.props;
    history.push(`/admin/topic/${topic}/questions`);
  }

  onDelete = (id, callback) => {
    callback();
    deleteQuestion(id, (error) => {
      if (error) {
        NotificationManager.warning('Delete question fail', 'Delete fail');
      } else {
        NotificationManager.success('Delete question succcessfully',
          'Delete successfully');
      }
    });
  }

  onSeeDetail = id => () => {
    const { history, match: { params: { topic } } } = this.props;
    history.push(`/admin/${topic}/question/${id}`);
  }

  // eslint-disable-next-line
  onSeeDemo = data => () => {
    // console.log('see demo');
  }

  render() {
    const { questions, isLoading } = this.state;

    return (
      <React.Fragment>
        <div className="topic-question-title">
          <p>Topic questions</p>
          <Button
            type="button" color="primary" variant="outlined"
            onClick={this.onCreate} aria-label="New question"
          >
            New question
          </Button>
        </div>
        {
          isLoading
            ? <Loading />
            : (
              <QuestionTable
                questions={questions} onDelete={this.onDelete}
                onSeeDetail={this.onSeeDetail} onSeeDemo={this.onSeeDemo}
              />
            )
        }
      </React.Fragment>
    );
  }
}

QuestionsPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired
};

export default QuestionsPage;
