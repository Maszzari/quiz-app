import React, { useContext } from "react";
import { QuizContext } from "../context/Quiz";

export default function Answer() {
	const color = ["bg-red-600", "bg-yellow-600", "bg-purple-600", "bg-orange-600"];
	// // const randomNumber = Math.floor(Math.random() * 3 + 1);

	// console.log(Math.floor(Math.random() * 3 + 1))
	const [quizState, dispatch] = useContext(QuizContext);
	const currentAnswer = quizState.currentAnswer;
	const correctAnswer = quizState.questions[quizState.currentIndex].correct_answer;

	return (
		<div className="my-5 grid gap-2 md:grid-cols-2">
			{quizState.answers.map((answer, i) => (
				<button key={answer} className={`first-letter:w-full ${color[i]} py-2 rounded text-white ${currentAnswer && currentAnswer !== answer && correctAnswer !== answer ? "opacity-30" : ""} relative`} onClick={() => dispatch({ type: "ANSWER", payload: answer })}>
					<span dangerouslySetInnerHTML={{ __html: answer }}></span>
					{currentAnswer && (currentAnswer === answer || answer === correctAnswer) ? <span className="material-symbols-outlined absolute right-0 top-0">{answer === correctAnswer ? "check_circle" : "cancel"}</span> : ""}
				</button>
			))}
		</div>
	);
}
