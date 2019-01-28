import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-scroll';
import { optionName } from 'config';
import { sortBy } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import './index.css';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  paper: {
    margin: '1rem 0',
    padding: '1rem'
  }
});

const QuestionBoxs = ({ classes, questions }) => {
  const content = questions.map((q, qIndex) => (
    <Link
      key={qIndex} to={`question_${qIndex + 1}`} spy // eslint-disable-line
      smooth
      offset={-88} duration={500} className="question-result-box"
    >
      <div className="question-index">{qIndex + 1}</div>
      <div className="answers">
        {
          sortBy(q).map(ans => (
            <span className="correct-answer-box" key={ans}>
              {optionName[ans]}
            </span>
          ))
        }
      </div>
    </Link>
  ));
  return (
    <Paper className={classes.paper}>
      <p>Question result selection</p>
      <div className="question-result-selection-wrapper">
        {content}
      </div>
    </Paper>
  );
};

QuestionBoxs.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(QuestionBoxs);
