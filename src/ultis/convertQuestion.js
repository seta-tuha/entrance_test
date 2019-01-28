import { values } from 'lodash';

export const parseQuestion = (question) => {
  const {
    type, level, topic, ...rest
  } = question;

  const convertedQuestion = {
    type,
    level,
    topic,
    content: rest.question.raw,
    answers: rest.answers,
    options: values(rest.choices)
  };
  return convertedQuestion;
};

export const questionFromData = ({
  content, options, answers, level, type, topic
}) => {
  const short = JSON.parse(content).blocks[0].text;

  const newQuestion = {
    type,
    level,
    topic,
    question: {
      raw: content,
      short
    },
    answers: answers.reduce((acc, v, i) => ({ ...acc, [i]: v }), {}),
    choices: options.reduce((acc, v, i) => ({ ...acc, [i]: v }), {})
  };
  return newQuestion;
};

export const listQuestionsFromData = (questions, topic) => {
  const listQuestions = questions.map(q => questionFromData({ ...q, topic }));
  return listQuestions;
};
