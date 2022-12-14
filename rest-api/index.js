import * as dotenv from 'dotenv';
dotenv.config();
console.clear();

import express from 'express';

let todos = [];

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.get('/todos/:todoId', (req, res) => {
    const todoId = +req.params.todoId;
    const todo = todos.find(({ id }) => id === todoId);

    if (!todo) {
        res.sendStatus(404);
    } else {
        res.send(todo);
    }
});

app.post('/todos', express.json(), (req, res) => {
    const { title, date, completed = false } = req.body;

    if (!title) {
        res.sendStatus(400);

        return;
    }

    const newTodo = {
        id: +`${Math.random() * Math.random()}`.replace(/[0.]/g, ''),
        title,
        date,
        completed,
    };

    todos.push(newTodo);
    res.send(newTodo);
});

app.delete('/todos/:todoId', (req, res) => {
    const todoId = +req.params.todoId;
    let removedTodo;

    todos = todos.filter((todo) => {
        if (todo.id === todoId) {
            removedTodo = todo;

            return false;
        }

        return true;
    });

    if (!removedTodo) {
        res.sendStatus(404);
    } else {
        res.send(removedTodo);
    }
});

app.put('/todos/:todoId', express.json(), (req, res) => {
    const todoId = +req.params.todoId;
    const { date, completed, title } = req.body;

    if (
        typeof date === 'undefined' ||
        typeof completed === 'undefined' ||
        typeof title === 'undefined'
    ) {
        res.sendStatus(400);

        return;
    }

    let updatedTodo;

    todos = todos.map((todo) => {
        if (todo.id === todoId) {
            updatedTodo = {
                id: todoId,
                userId,
                title,
                completed,
            };

            return updatedTodo;
        }

        return todo;
    });

    if (!updatedTodo) {
        res.sendStatus(404);
    } else {
        res.send(updatedTodo);
    }
});

app.patch('/todos/:todoId', express.json(), (req, res) => {
    const todoId = +req.params.todoId;
    const { title, date, completed } = req.body;

    let patchedTodo;

    todos = todos.map((todo) => {
        if (todo.id === todoId) {
            if (
                typeof date === 'undefined' &&
                typeof completed === 'undefined' &&
                typeof title === 'undefined'
            ) {
                patchedTodo = todo;
                return todo;
            }

            const {
                title: currentTitle,
                userId: currentUserId,
                completed: currentCompleted,
            } = todo;

            patchedTodo = {
                ...todo,
                title: title || currentTitle,
                userId: userId || currentUserId,
                completed: completed || currentCompleted,
            };

            return patchedTodo;
        }

        return todo;
    });

    if (!patchedTodo) {
        res.sendStatus(404);
    } else {
        res.send(patchedTodo);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
