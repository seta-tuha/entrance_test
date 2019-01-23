import React from 'react';
import { Loading } from 'components/Common';
import Button from '@material-ui/core/Button';
import { QuestionTable } from 'components/Table';
import { getQuestions } from 'services/api/firebase';

class QuestionsPage extends React.Component {

  state = {
    page: 0,
    rowsPerPage: 5,
    questions: [],
    isLoading: true,
  }

  componentDidMount() {
    const { match: { params: { topic } } } = this.props;

    getQuestions(topic, ({ questions, isLoading }) =>
      this.setState({ questions, isLoading })
    )
  }

  onCreate = () => {
    const { history, match: { params: { topic } } } = this.props;
    history.push(`/admin/topic/${topic}/questions`);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onDelete = id => () => {
    alert('delete');
  }

  onSeeDetail = id => () => {
    const { history, match: { params: { topic } } } = this.props;
    history.push(`/admin/${topic}/question/${id}`)
  }

  onSeeDemo = data => () => {
    console.log('see demo');
  }

  render() {
    const { questions, isLoading } = this.state;

    return (
      <React.Fragment>
        <div className="topic-question-title">
          <p>Topic questions</p>
          <Button type="button" color="primary" variant="outlined"
            onClick={this.onCreate}
          >
            New question
          </Button>
        </div>
        {
          isLoading
            ? <Loading />
            : <QuestionTable questions={questions} onDelete={this.onDelete}
              onSeeDetail={this.onSeeDetail} onSeeDemo={this.onSeeDemo}
            />
        }
      </React.Fragment>
    );
  }
}

export default QuestionsPage;
