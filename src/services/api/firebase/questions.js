import Firebase from 'services/firebase';
import { isNull, keys } from 'lodash';
import { parseQuestion } from 'ultis';

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

export const createQuestion = (topic, questions, onComplete) => {
  const topicRef = Firebase.db.ref('topics').orderByChild('name')
    .equalTo(topic);
  topicRef.once('value', snapshot => {
    const topicId = keys(snapshot.val())[0];
    const _questions = questions.map(question => {
      let newQuestionRef = Firebase.db.ref('questions').push();
      let newQuestionKey = newQuestionRef.key;
      return { ...question, key: newQuestionKey }
    })

    const newData = updatedData(_questions, topicId);

    Firebase.db.ref().update(newData, error => onComplete({ error }));
  })
}

export const updateQuestion = (id, question, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.update(question, error => onComplete({ error }));
}

export const deleteQuestion = (id, onComplete) => {

}


function updatedData(questions, topicId) {
  let updatedData = questions.reduce((acc, q) => ({
    ...acc,
    [`questions/${q.key}`]: q,
    [`topics/${topicId}/questions/${q.key}`]: true
  }), {});
  return updatedData
}
