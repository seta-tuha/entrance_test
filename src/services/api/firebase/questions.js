import Firebase from 'services/firebase';
import { isNull, keys } from 'lodash';
import { parseQuestion, updatedData } from 'ultis';

export const getQuestion = (id, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.once('value', snapshot => {
    if (isNull(snapshot)) {
      onComplete({ error: 'An error occurred' });
    } else {
      const questionData = snapshot.val();
      const question = parseQuestion(questionData);

      onComplete(question)
    }
  })
}

export const createQuestion = (topic, question, onComplete) => {
  const topicRef = Firebase.db.ref('topics').orderByChild('name')
    .equalTo(topic);
  topicRef.once('value', snapshot => {
    const topicId = keys(snapshot.val())[0];

    let newQuestionRef = Firebase.db.ref('questions').push();
    let newQuestionKey = newQuestionRef.key;
    let newData = updatedData(newQuestionKey, question, topicId);

    Firebase.db.ref().update(newData, error => onComplete({ error }));
  })
}

export const updateQuestion = (id, question, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.update(question, error => onComplete({ error }));
}
