import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPen } from "@fortawesome/free-solid-svg-icons";

import EditUser from "./EditUser";

const User = ({ user, handleDelete, users, setUsers }) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className="user">
			{!isEditing && (
				<div className="user-content">
					<FontAwesomeIcon
						className="x"
						icon={faTimes}
						onClick={() => handleDelete(user.id)}
					/>
					<h2>{user.name}</h2>
					<FontAwesomeIcon
						className="pencil"
						icon={faPen}
						onClick={() => setIsEditing(true)}
					/>
					<p>{user.bio}</p>
				</div>
			)}
			{isEditing && (
				<EditUser
					user={user}
					users={users}
					setUsers={setUsers}
					setIsEditing={setIsEditing}
				/>
			)}
		</div>
	);
};

export default User;
