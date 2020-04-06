import React, { useState } from "react";
import axios from "axios";

const EditUser = ({ user, users, setUsers, setIsEditing }) => {
	const [inputValues, setInputValues] = useState({
		name: user.name,
		bio: user.bio,
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
			.put(`http://localhost:5000/api/users/${user.id}`, inputValues)
			.then((res) => {
				setUsers(
					users.map((user) => (user.id === res.data.id ? res.data : user))
				);
				setIsEditing(false);
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<div className="add-user">
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
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default EditUser;
