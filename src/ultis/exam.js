// a = [-1, 1, -1, 1 ];

// eslint-disable-next-line
export const convertExamAnswers = (answersArray, questionsKeyArray) => {
  return answersArray.map((ans, index) => ({
    questionKey: questionsKeyArray[index],
    choice: ans
  }));
};
