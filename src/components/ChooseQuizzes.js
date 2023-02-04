import axios from "axios";
import React, { useContext } from "react";
import { QuizContext } from "../context/Quiz";

const listCategories = [
	{
		id: 27,
		category: "Animals",
	},
	{
		id: 23,
		category: "History",
	},
	{
		id: 21,
		category: "Sports",
	},
	{
		id: 28,
		category: "Vehicles",
	},
];
const listLevels = ["easy", "medium", "hard"];

export default function ChooseQuizzes() {
	const [, dispatch] = useContext(QuizContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		form.append("type", "multiple");
		const data = {};
		for (const [key, value] of form.entries()) {
			// if (value) {
			data[key] = value;
			// }
		}

		// console.log(dispatch);

		axios.get("https://opentdb.com/api.php", { params: data }).then((response) => {
			dispatch({ type: "FETCH_DATA", payload: response.data.results });
		});
	};

	return (
		<div className="bg-white rounded w-full p-5 mb-4 border">
			<form action="" className="w-full" onSubmit={handleSubmit}>
				<div className="mb-3">
					<input type="number" name="amount" className="w-full outline-0 py-1 px-3 border rounded" placeholder="Number of Questions" required />
				</div>
				<div className="flex gap-3 flex-wrap">
					<select name="difficulty" id="difficulty" className="flex-1 py-1 px-3 rounded outline-none border">
						<option label="Choose a Level"></option>
						<option value="">Any</option>
						{listLevels.map((level, i) => (
							<React.Fragment key={i}>
								<option value={level} className="capitalize">
									{level}
								</option>
							</React.Fragment>
						))}
					</select>
					<select name="category" id="category" className="flex-1 py-1 px-3 rounded outline-none border">
						<option label="Choose a Category"></option>
						<option value="">Any</option>
						{listCategories.map((data) => (
							<React.Fragment key={data.id}>
								<option value={data.id} className="capitalize">
									{data.category}
								</option>
							</React.Fragment>
						))}
					</select>
				</div>
				<button className="py-2 w-full bg-blue-700 rounded block mt-3 text-white" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
