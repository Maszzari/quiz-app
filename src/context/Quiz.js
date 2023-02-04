import React, { createContext, useReducer } from "react";
import { shuffleAnswer } from "../helpers";

export const QuizContext = createContext();
const initialState = {
	questions: {},
	currentIndex: 0,
	answers: [],
	showResult: false,
	currentAnswer: "",
	scoreResults: 0,
	correctAnswers: 0,
};
const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_DATA":
			return {
				...state,
				questions: action.payload,
				answers: shuffleAnswer(action.payload[0]),
			};

		case "NEXT_QUESTION":
			const showResult = state.currentIndex === state.questions.length - 1;
			const currentIndex = showResult ? state.currentIndex : state.currentIndex + 1;
			const answers = shuffleAnswer(state.questions[currentIndex]);
			return {
				...state,
				currentIndex,
				showResult,
				answers,
				currentAnswer: "",
			};

		case "ANSWER":
			const currentAnswer = state.currentAnswer ? state.currentAnswer : action.payload;
			const correctAnswers = currentAnswer === state.questions[state.currentIndex].correct_answer ? state.correctAnswers + 1 : state.correctAnswers;
			const scoreResults = (correctAnswers / state.questions.length) * 100;
			return {
				...state,
				currentAnswer,
				scoreResults,
				correctAnswers,
			};

		case "RESET_QUESTION":
			return initialState;
		default:
			return state;
	}
};

export const QuizProvider = ({ children }) => {
	const [state, dipstach] = useReducer(reducer, initialState);
	return <QuizContext.Provider value={[state, dipstach]}>{children}</QuizContext.Provider>;
};
