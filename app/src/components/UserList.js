import React, { useEffect } from "react";
import axios from "axios";

import User from "./User";

const UserList = ({ users, setUsers }) => {
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/users")
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err.response.message));
	}, [setUsers]);

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:5000/api/users/${id}`)
			.then((res) => setUsers(users.filter((user) => user.id !== res.data.id)))
			.catch((err) => console.log(err.response.message));
	};

	return (
		<div className="user-list">
			{users.map((user) => (
				<User
					key={user.id}
					user={user}
					handleDelete={handleDelete}
					users={users}
					setUsers={setUsers}
				/>
			))}
		</div>
	);
};

export default UserList;
