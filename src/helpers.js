export const shuffleAnswer = (quiz) => {
  // console.log(quiz)
	const unShuffleAnswer = [...quiz.incorrect_answers, quiz.correct_answer];
	return unShuffleAnswer
		.map((answer) => ({ sort: Math.random(), value: answer }))
		.sort((a, b) => a.sort - b.sort)
		.map((result) => result.value);
};
