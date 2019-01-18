import React from 'react';
import Button from '@material-ui/core/Button';
import { getTopics, deleteTopic } from '../../../firebase';
import { TopicForm } from '../../../components/form';
import { Topics } from '../../../components/table';
import { Loading, withModal } from '../../../components/common';

class TopicsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      isLoading: true,
      notification: ''
    }
  }

  componentDidMount() {
    this.unsubcribe = getTopics(({ topics, isLoading }) =>
      this.setState({ topics, isLoading })
    );
  }

  componentWillUnmount() {
    if (typeof this.unsubcribe === 'function') {
      this.unsubcribe();
    }
  }

  onSeeDetail = id => () => {
    const { history } = this.props;
    history.push(`/admin/topic/${id}`);
  }

  onDelete = (id, onConfirm) => {
    onConfirm();
    deleteTopic(id, ({ notification }) => this.setState({ notification }))
  }

  render() {
    const { openModal } = this.props;
    const { topics, isLoading } = this.state;

    return (
      <React.Fragment>
        <div className="topic-question-title">
          <p>Topics</p>
          <Button type="button" color="primary" variant="outlined"
            onClick={() => openModal({})}
          >
            New topic
          </Button>
        </div>
        {
          isLoading
            ? <Loading />
            : <Topics topics={topics} onSeeDetail={this.onSeeDetail}
              onDelete={this.onDelete}
            />
        }
      </React.Fragment>
    );
  }
}

export default withModal(TopicForm, TopicsPage);

// ToDo: refactor this code file
