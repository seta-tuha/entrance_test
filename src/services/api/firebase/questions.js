import Firebase from 'services/firebase';
import { isNull, keys } from 'lodash';
import { parseQuestion } from 'ultis';

function updatedData(questions, topicId) {
  const updatedData = questions.reduce((acc, q) => ({
    ...acc,
    [`questions/${q.key}`]: q,
    [`topics/${topicId}/questions/${q.key}`]: true
  }), {});
  return updatedData;
}

export const getQuestion = (id, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.once('value', (snapshot) => {
    if (isNull(snapshot)) {
      onComplete({ error: 'An error occurred' });
    } else {
      const questionData = snapshot.val();
      const question = parseQuestion(questionData);

      onComplete(question);
    }
  });

  return () => questionRef.off();
};

export const createQuestion = (topic, questions, onComplete) => {
  const topicRef = Firebase.db.ref('topics').orderByChild('name')
    .equalTo(topic);
  topicRef.once('value', (snapshot) => {
    const topicId = keys(snapshot.val())[0];
    const convertedQuestions = questions.map((question) => {
      const newQuestionRef = Firebase.db.ref('questions').push();
      const newQuestionKey = newQuestionRef.key;
      return { ...question, key: newQuestionKey };
    });

    const newData = updatedData(convertedQuestions, topicId);

    Firebase.db.ref().update(newData, error => onComplete({ error }));
  });
};

export const updateQuestion = (id, question, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.update(question, error => onComplete({ error }));
};

export const deleteQuestion = (id, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);

  questionRef.once('value', (snapshot) => {
    const topicName = snapshot.val().topic;

    const topicRef = Firebase.db.ref('topics').orderByChild('name')
      .equalTo(topicName);
    topicRef.once('value', (snapshot) => {
      const topicId = keys(snapshot.val())[0];
      const updatedData = {};
      updatedData[`questions/${id}`] = null;
      updatedData[`topics/${topicId}/questions/${id}`] = null;
      Firebase.db.ref().update(updatedData, error => onComplete(error));
    });
  });
};
