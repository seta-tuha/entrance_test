import { keys, values } from 'lodash';

export const parseQuestion = question => {
  const { type, level, topic, ...rest } = question;

  const answers = keys(rest.answers).map(el => parseInt(el));
  const _question = {
    type,
    level,
    topic,
    question: { content: rest.question.raw },
    answers,
    options: values(rest.choices)
  }
  return _question;
}
