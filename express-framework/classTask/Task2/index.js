const express = require("express");
const users = require("../../classWork/MOCK_DATA.json");
const app = express();
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.send("Home page..");
});

// HTML list of users
app.get("/users", (req, res) => {
    const html = `${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join(" ")}`;
    res.send(html);
});

// REST API (JSON)
app.get("/api/users", (req, res) => {
    res.json(users);
});

// localhost query user find by id
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((u) => u.id == id);
    if (!user) {
        return res.json({ message: "user not found.." });
    }
    res.json(user);
});

// POST request
app.post("/api/users", (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser,
    });
});

// PATCH request
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // update only provided fields
    Object.assign(user, req.body);

    res.json({
        message: "User updated successfully",
        user,
    });
});

// DELETE request
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deleteUser = users.splice(index, 1);
    res.json({
        message: "User deleted successfully",
        user: deleteUser[0],
    });
});

// server PORT
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server started successfully..");
});