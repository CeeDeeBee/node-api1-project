import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ handleShowAdd, users, setUsers }) => {
	const [inputValues, setInputValues] = useState({
		name: "",
		bio: "",
	});

	const handleChange = (e) => {
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("https://node-user-app.herokuapp.com/api/users", inputValues)
			.then((res) => {
				setUsers([...users, res.data]);
				handleShowAdd();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="user-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					onChange={handleChange}
					value={inputValues.name}
				/>
				<input
					type="text"
					name="bio"
					placeholder="Bio"
					onChange={handleChange}
					value={inputValues.bio}
				/>
				<div className="form-buttons">
					<button type="submit">Add User</button>
					<button onClick={handleShowAdd}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default AddUser;
