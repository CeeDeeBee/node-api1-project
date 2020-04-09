require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortid = require("shortid");

const server = express();

server.use(express.json());
server.use(cors());

let users = [
	{
		id: shortid.generate(), // hint: use the shortid npm package to generate it
		name: "Jane Doe", // String, required
		bio: "Not Tarzan's Wife, another Jane", // String, required
	},
];

server.get("/", (req, res) => {
	res.json({ api: "running..." });
});

server.get("/api/users", (req, res) => {
	users
		? res.json(users)
		: res.status(500).json({
				errorMessage: "The users information could not be retrieved.",
		  });
});

server.post("/api/users", (req, res) => {
	const body = req.body;

	if (!body.name || !body.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	} else {
		const id = shortid.generate();

		users.push({ ...body, id });
		const newUser = users.find((user) => user.id === id);
		newUser
			? res.status(201).json(newUser)
			: res.status(500).json({
					errorMessage:
						"There was an error while saving the user to the database",
			  });
	}
});

server.get("/api/users/:id", (req, res) => {
	try {
		const user = users.find((user) => user.id === id);

		user
			? res.json(user)
			: res
					.status(404)
					.json({ message: "The user with the specified ID does not exist." });
	} catch (err) {
		res
			.status(500)
			.json({ errorMessage: "The user information could not be retrieved." });
	}
});

server.delete("/api/users/:id", (req, res) => {
	const user = users.find((user) => user.id === req.params.id);

	if (user) {
		users = users.filter((user) => user.id !== req.params.id);

		const deletedUser = users.find((user) => user.id === req.params.id);
		deletedUser
			? res.status(500).json({ errorMessage: "The user could not be removed." })
			: res.json(user);
	} else {
		res
			.status(404)
			.json({ message: "The user with the specified ID does not exist." });
	}
});

server.put("/api/users/:id", (req, res) => {
	const body = req.body;
	const id = req.params.id;

	if (!body.name || !body.bio) {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	} else {
		const user = users.find((user) => user.id === id);

		if (user) {
			users = users.map((user) => {
				return user.id === id ? { ...body, id } : user;
			});

			const newUser = users.find((user) => user.id === id);
			newUser
				? res.json(newUser)
				: res
						.status(500)
						.json({ errorMessage: "The information could not be modified." });
		} else {
			res
				.status(404)
				.json({ message: "The user with the specified ID does not exist." });
		}
	}
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
	console.log(`\n=== server running on port ${port} ===\n`)
);
