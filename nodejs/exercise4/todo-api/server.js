const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let idCounter = 1;


app.post('/todos', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = {
        id: idCounter++,
        title,
        completed: false
    }
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('todos', (req, res) => {
    res.json(todos);
});

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "Task not found" });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`TODO API running on http://localhost:${PORT}`);
});