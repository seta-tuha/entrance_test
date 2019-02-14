import Firebase from 'services/firebase';
import { keys, values } from 'lodash';
import { parseQuestionList, convertExamAnswers } from 'ultis';

export const getExamLevel = (onComplete) => {
  const levelRef = Firebase.db.ref('test-level');
  levelRef.once('value', (snapshot) => {
    const levelKeys = keys(snapshot.val());
    const data = values(snapshot.val());
    const levels = data.reduce((acc, value, index) => {
      return [...acc, {
        id: levelKeys[index],
        name: value.name
      }];
    }, []);

    onComplete(levels);
  });
};

export const getExamDuration = (onComplete) => {
  const durationRef = Firebase.db.ref('test-duration');
  durationRef.once('value', (snapshot) => {
    const durationKeys = keys(snapshot.val());
    const data = values(snapshot.val());
    const durations = data.reduce((acc, value, index) => {
      return [...acc, {
        id: durationKeys[index],
        name: value.name,
        duration: value.duration
      }];
    }, []);

    onComplete(durations);
  });
};

export const generateExam = ({
  level, topic, email, duration
}, onComplete) => {
  const testsRef = Firebase.db.ref('tests');
  const { key } = testsRef.push();
  const newRecord = {};
  newRecord[`${key}`] = { email, level, topic, duration, seen: false }; // eslint-disable-line
  testsRef.update(newRecord, (error) => {
    if (error) {
      onComplete({ isError: true, payload: 'Error has occured during saving process' });
    } else {
      onComplete({ isError: false, payload: `${window.location.origin}/exam/${key}` });
    }
  });
};

export const getExam = (key, onComplete) => {
  const testRef = Firebase.db.ref(`tests/${key}`);
  testRef.once('value', (snapshot) => {
    const { questions, done, seen } = snapshot.val();
    onComplete((seen || done) ? null : parseQuestionList(questions));
    snapshot.ref.child('seen').set(true);
  });
};

export const sendExamAnswers = ({
  examKey, questionKeyArray, answersArray, time: { minutes, seconds }
}, onComplete) => {
  const testRef = Firebase.db.ref(`tests/${examKey}`);
  const examAnswers = convertExamAnswers(answersArray, questionKeyArray);
  testRef.update({
    time: { minutes, seconds },
    examAnswers,
    done: true
  }, error => (error ? onComplete('Error') : onComplete(null)));
};
