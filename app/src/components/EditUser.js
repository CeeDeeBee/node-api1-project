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
			.put(
				`https://node-user-app.herokuapp.com/api/users/${user.id}`,
				inputValues
			)
			.then((res) => {
				setUsers(
					users.map((user) => (user.id === res.data.id ? res.data : user))
				);
				setIsEditing(false);
			})
			.catch((err) => console.log(err.message));
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
					<button type="submit">Save Changes</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default EditUser;
