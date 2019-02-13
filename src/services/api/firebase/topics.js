import Firebase from 'services/firebase';
import {
  keys, values, filter, toLower
} from 'lodash';
import { parseQuestionList } from 'ultis';

export const getTopics = (onComplete) => {
  const topicsRef = Firebase.db.ref('topics');
  topicsRef.on('value', (snapshot) => {
    const questionKeys = keys(snapshot.val());
    const data = values(snapshot.val());

    const topics = data.reduce((acc, value, index) => {
      const questions = value.questions ? keys(value.questions).length : 0;
      return [...acc, {
        id: questionKeys[index],
        name: value.name,
        questions
      }];
    }, []);

    onComplete(topics);
  });

  return () => topicsRef.off();
};

export const deleteTopic = (id, onComplete) => {
  const topicRef = Firebase.db.ref(`topics/${id}`);
  topicRef.set(null, (error) => {
    if (error) {
      onComplete({ notification: 'Delete fail' });
    } else {
      onComplete({ notification: 'Delete success' });
    }
  });
};

export const getQuestions = (topicName, onComplete) => {
  const questionsRef = Firebase.db.ref('questions');
  questionsRef.on('value', (snapshot) => {
    const data = snapshot.val();

    // const allQuestions = keys(data).map(key => ({ id: key, ...data[key] }));

    // const temp = filter(allQuestions, { topic: topicName });
    // const questions = temp.map(q => parseQuestion(q));

    const allQuestions = parseQuestionList(data);
    const questions = filter(allQuestions, { topic: topicName });

    onComplete({ questions, isLoading: false });
  });
};

export const createTopic = (topic, onFail, onComplete) => {
  const topicsRef = Firebase.db.ref('topics');
  topicsRef.once('value', (snapshot) => {
    const data = values(snapshot.val());
    const currentTopics = data.map(topic => toLower(topic.name));

    if (currentTopics.includes(topic.name)) {
      onFail({ error: 'Topic name already exists', topic: '' });
    } else {
      topicsRef.push({ ...topic });
      onComplete();
    }
  });
};
