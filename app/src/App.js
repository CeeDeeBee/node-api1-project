import React, { useState } from "react";
import "./App.css";

import UserList from "./components/UserList";
import AddUser from "./AddUser";

function App() {
	const [showAddUser, setShowAddUser] = useState(false);
	const [users, setUsers] = useState([]);

	const handleShowAdd = () => {
		setShowAddUser(!showAddUser);
	};

	return (
		<div className="App">
			{!showAddUser && <button onClick={handleShowAdd}>Add User</button>}
			{showAddUser && (
				<AddUser
					handleShowAdd={handleShowAdd}
					users={users}
					setUsers={setUsers}
				/>
			)}
			<UserList users={users} setUsers={setUsers} />
		</div>
	);
}

export default App;
