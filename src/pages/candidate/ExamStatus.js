import React from 'react';
import PropTypes from 'prop-types';
import { getExam } from 'services/api/firebase';
import { Loading } from 'components/Common';
import { PageNotFound, Thanks } from 'pages/common';

class ExamStatus extends React.Component {
  state = {
    seen: false,
    done: false,
    isLoading: true,
    questions: []
  }

  componentDidMount() {
    const { examKey } = this.props;

    getExam(examKey, (questions) => {
      if (questions) {
        this.setState({
          questions,
          isLoading: false
        });
      } else {
        this.setState({ isLoading: false, seen: true });
      }
    });
  }

  done = () => {
    this.setState({ done: true });
  }

  render() {
    const {
      isLoading, seen, done, questions
    } = this.state;

    const { examKey, children } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    if (seen) {
      return <PageNotFound />;
    }

    if (done) {
      return <Thanks />;
    }

    return children({ examKey, questions, done: this.done });
  }
}

ExamStatus.propTypes = {
  examKey: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default ExamStatus;
