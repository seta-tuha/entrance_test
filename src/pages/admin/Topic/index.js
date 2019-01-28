import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TopicForm } from 'components/Form';
import { TopicTable } from 'components/Table';
import { Loading, withModal } from 'components/Common';
import { getTopics } from 'services/api/firebase';

class TopicsPage extends React.Component {
  state = {
    topics: [],
    isLoading: true
  }

  componentDidMount() {
    this.unsubcribe = getTopics(topics =>
      this.setState({ topics, isLoading: false }));
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
    // deleteTopic(id, ({ notification }) => this.setState({ notification }));
  }

  render() {
    const { openModal } = this.props;
    const { topics, isLoading } = this.state;

    return (
      <React.Fragment>
        <div className="topic-question-title">
          <p>Topics</p>
          <Button
            type="button" color="primary" variant="outlined"
            onClick={() => openModal({})}
          >
            New topic
          </Button>
        </div>
        {
          isLoading
            ? <Loading />
            : (
              <TopicTable
                topics={topics} onSeeDetail={this.onSeeDetail}
                onDelete={this.onDelete}
              />
            )
        }
      </React.Fragment>
    );
  }
}

TopicsPage.propTypes = {
  openModal: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default withModal(TopicForm, TopicsPage);

// ToDo: refactor this code file
