import Firebase from './firebase';
import { isNull, keys } from 'lodash';
import { parseQuestion } from '../routes/admin/question/helper';
import { updatedData } from '../components/question/helper';

export const getQuestion = (id, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.once('value', snapshot => {
    if (isNull(snapshot)) {
      onComplete({ error: 'An error occurred', isLoading: false });
    } else {
      const questionData = snapshot.val();
      const question = parseQuestion(questionData);

      onComplete({ ...question, isLoading: false })
    }
  })
}


export const createQuestion = (topic, question, onComplete) => {
  const topicRef = Firebase.db.ref('topics').orderByChild('name').equalTo(topic);
  topicRef.once('value', snapshot => {
    const topicId = keys(snapshot.val())[0];

    let newQuestionRef = Firebase.db.ref('questions').push();
    let newQuestionKey = newQuestionRef.key;
    let newData = updatedData(newQuestionKey, question, topicId);

    Firebase.db.ref().update(newData, error => {
      if (error) {
        onComplete({ notification: `Error creating question ${error}` })
      } else {
        onComplete({ notification: 'Create successful question' })
      }
    })
  })
}

export const updateQuestion = (id, question, onComplete) => {
  const questionRef = Firebase.db.ref(`questions/${id}`);
  questionRef.update(question, error => {
    if (error) {
      onComplete({ notification: `Error updating question ${error}` })
    } else {
      onComplete({ notification: 'Update successful question' })
    }
  })
}
