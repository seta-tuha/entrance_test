import { optionName } from '../../config';
import { isEmpty, keys, values } from 'lodash';

export const questionFromData = ({
  question, options, answers, level, type, topic
}) => {
  const theCorrectAnswer = answers.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});

  const theAnswerOptions = options.reduce(
    (acc, option, index) => {
      acc[index] = option;
      return acc;
    }, {});

  const short = JSON.parse(question.content).blocks[0].text;

  const newQuestion = {
    type,
    level,
    topic,
    question: {
      raw: question.content,
      short,
    },
    answers: theCorrectAnswer,
    choices: theAnswerOptions
  }

  return newQuestion;
}

export const parseQuestion = question => {
  const { type, level, topic, ...rest } = question;

  const _question = {
    type,
    level,
    topic,
    question: { content: rest.question.raw },
    answers: keys(rest.answers),
    options: values(rest.choices)
  }
  return _question;
}


export const updatedData = (questionKey, question, topicId) => {
  let updatedData = {};
  updatedData["questions/" + questionKey] = question;
  updatedData[`topics/${topicId}/questions/${questionKey}`] = true;
  return updatedData;
}

export const validate = (answers, options) => {
  if (isEmpty(answers)) {
    throw new Error('You do not choose a correct answer for this question');
  }

  if (options.length < optionName.length) {
    throw new Error(`You need create ${optionName.length} ` +
      `answer questions for this question`)
  }

  alert('Sending');
}
