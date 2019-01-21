import { optionName } from '../config';
import { isEmpty, values } from 'lodash';

export const parseQuestion = question => {
  const { type, level, topic, ...rest } = question;

  const _question = {
    type,
    level,
    topic,
    question: { content: rest.question.raw },
    answers: rest.answers,
    options: values(rest.choices)
  }
  return _question;
}

export const questionFromData = ({
  question, options, answers, level, type, topic
}) => {
  const short = JSON.parse(question.content).blocks[0].text;

  const newQuestion = {
    type,
    level,
    topic,
    question: {
      raw: question.content,
      short,
    },
    answers: answers.reduce((acc, v, i) => ({ ...acc, [i]: v }), {}),
    choices: options.reduce((acc, v, i) => ({ ...acc, [i]: v }), {})
  }

  return newQuestion;
}

export const updatedData = (questionKey, question, topicId) => {
  let updatedData = {};
  updatedData[`questions/${questionKey}`] = question;
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
