import Firebase from 'services/firebase';
import { keys, values, filter, toLower } from 'lodash';

export const getTopics = onComplete => {
  const topicsRef = Firebase.db.ref('topics');
  topicsRef.on('value', snapshot => {
    let _keys = keys(snapshot.val());
    let data = values(snapshot.val());

    let topics = data.reduce((acc, value, index) => {
      const questions = value.questions ? keys(value.questions).length : 0;
      return [...acc, {
        id: _keys[index],
        name: value.name,
        questions
      }]
    }, [])

    onComplete(topics)
  })

  return () => topicsRef.off('value')
}

export const deleteTopic = (id, onComplete) => {
  const topicRef = Firebase.db.ref(`topics/${id}`);
  topicRef.set(null, error => {
    if (error) {
      onComplete({ notification: 'Delete fail' })
    } else {
      onComplete({ notification: 'Delete success' })
    }
  })
}

export const getQuestions = (topicName, onComplete) => {
  const questionsRef = Firebase.db.ref('questions');
  questionsRef.once('value', snapshot => {
    const data = snapshot.val();

    const allQuestions = keys(data).map(key => {
      let question = { id: key, ...data[key] }
      return question;
    })

    const questions = filter(allQuestions, { 'topic': topicName })
    onComplete({ questions: questions, isLoading: false });
  })
}

export const createTopic = (topic, onFail, onComplete) => {
  const topicsRef = Firebase.db.ref('topics');
  topicsRef.once('value', snapshot => {
    const data = values(snapshot.val());
    const currentTopics = data.map(topic => toLower(topic.name));

    if (currentTopics.includes(topic.name)) {
      onFail({ error: 'Topic name already exists', topic: '' });
    } else {
      topicsRef.push({ ...topic })
      onComplete();
    }
  })
}
