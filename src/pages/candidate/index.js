import React from 'react';
import PropTypes from 'prop-types';
import ExamStatus from './ExamStatus';
import Exam from './Exam';
import './index.css';

const Candidate = ({ match: { params: { examKey } } }) => {
  return (
    <ExamStatus examKey={examKey}>
      {({ examKey, questions, done }) => {
        return (
          <Exam
            examKey={examKey}
            questions={questions}
            done={done}
          />
        );
      }}
    </ExamStatus>
  );
};

Candidate.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Candidate;
