import React, { useContext } from "react";
import { QuizContext } from "../context/Quiz";

export default function Question() {
	const [quizState] = useContext(QuizContext);
	const question = quizState.questions[quizState.currentIndex].question;

	return (
		<div className="py-5 px-2 text-center">
			<p dangerouslySetInnerHTML={{ __html: question }} />
		</div>
	);
}
