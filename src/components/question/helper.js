import config from './config';
import { isEmpty } from 'lodash';

export const questionFromData = (question, options, answerKeys, level, type) => {
  const theCorrectAnswer = answerKeys.map(key => config.optionName[key])
    .reduce((acc, key) => (acc[key] = true, acc), {});
  const theAnswerOptions = options.reduce(
    (acc, option, index) => (acc[config.optionName[index]] = option, acc), {});

  const newQuestion = {
    question,
    level,
    type,
    answers: theCorrectAnswer,
    choices: theAnswerOptions
  }

  return newQuestion;
}

export const validate = (answerKeys, answerOptions) => {
  if (isEmpty(answerKeys)) {
    throw new Error('You do not choose a correct answer for this question');
  }

  if (answerOptions.length < config.optionName.length) {
    throw new Error(`You need create ${config.optionName.length} ` +
      `answer questions for this question`)
  }

  alert('Sending');
}
