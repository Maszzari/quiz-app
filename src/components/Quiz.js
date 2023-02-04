import React, { useContext } from "react";
import { QuizContext } from "../context/Quiz";
import Answer from "./Answer";
import ChooseQuizzes from "./ChooseQuizzes";
import Question from "./Question";

export default function Quiz() {
	const [quizState] = useContext(QuizContext);
	// const [isLoading, setIsLoading] = useState(true);

	// const apiCalled = useRef(false);
	// useEffect(() => {
	// 	if (!apiCalled.current) {
	// 		axios("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
	// 			.then((response) => {
	// 				dispatch({ type: "FETCH_DATA", payload: response.data.results });
	// 				setIsLoading(false);
	// 			})
	// 			.catch((error) => console.log(error));
	// 	}
	// 	apiCalled.current = true;
	// }, [dispatch]);

	// if (isLoading) return <p>Loading ...</p>;
	// console.log(Object.keys(quizState.questions).length)
	return (
		<section className="py-5 max-w-2xl mx-auto">
			<div className="container">
				<h1 className="font-bold text-center mb-5 text-4xl">TIME TO QUIZZ</h1>
				{Object.keys(quizState.questions).length < 1 && <ChooseQuizzes />}
				{Object.keys(quizState.questions).length > 0 && <MainQuiz />}
			</div>
		</section>
	);
}

const MainQuiz = () => {
	const [quizState, dispatch] = useContext(QuizContext);


	return (
		<>
			{quizState.showResult && (
				<div className="bg-white p-3 border rounded text-center">
					<h2 className="font-semibold text-2xl">Congratulations you have answered all the questions!</h2>
					<div className="my-5">
						<p>
							Your Score: <span className="font-medium">{Math.round(quizState.scoreResults)}</span>
						</p>
						<p>
							Answers is correct: <span className="font-medium">{quizState.correctAnswers}</span>/{quizState.questions.length}
						</p>
					</div>
					<button className="w-full py-3 bg-blue-700 rounded text-white" onClick={() => dispatch({ type: "RESET_QUESTION" })}>
						Reset
					</button>
				</div>
			)}
			{!quizState.showResult && (
				<>
					<div className="p-2 border text-center font-semibold rounded shadow">
						Questions {quizState.currentIndex + 1} / {quizState.questions.length}
					</div>
					<Question />
					<Answer />
					<button onClick={() => dispatch({ type: "NEXT_QUESTION" })} className="w-full py-2 block bg-blue-700 text-white rounded">
						NEXT
					</button>
				</>
			)}
		</>
	);
};
