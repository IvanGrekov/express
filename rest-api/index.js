import * as dotenv from 'dotenv';
dotenv.config();
console.clear();

import express from 'express';
import cors from 'cors';
import todosModel from './todos-model.js';
import { TODOS_APP_ENDPOINTS } from './constants.js';
import { getServerError } from './utils.js';

const PORT = process.env.PORT;
const app = express();

// NOTE: middleware to don't set headers 'Access-Control-...' each time
app.use(
    cors({
        // NOTE: not required
        origin: 'http://localhost:3000',
    }),
);

// NOTE: for preflight requests before such methods as DELETE
// NOTE: don't need with middleware cors
// app.options('/todos', (req, res) => {
//     // NOTE: to prevent CORS
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     // NOTE: to prevent sending json (for post)
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token');
//     // NOTE: to allow other methods
//     res.setHeader('Access-Control-Allow-Methods', 'DELETE');

//     res.end();
// });

// NOTE: home address
app.get('/', (_, res) => {
    res.write('<h1>Hello, below the endpoints list</h1>');
    res.write('</br>');
    res.end(JSON.stringify(Object.values(TODOS_APP_ENDPOINTS)));
});

// NOTE: get all todos
app.get(TODOS_APP_ENDPOINTS.todos, (req, res) => {
    // NOTE: to take a look from where request is
    // console.log(req.headers.origin);

    // NOTE: don't need with middleware cors
    // NOTE: to prevent CORS
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // NOTE: to prevent sending json (for post)
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token');
    // NOTE: to allow other methods
    // res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    res.send(todosModel.getTodos());
});

// NOTE: get signle todo
app.get(TODOS_APP_ENDPOINTS.todoId, (req, res) => {
    const { todoId } = req.params;
    const resultFromModel = todosModel.getSignleTodo(todoId);

    if (!resultFromModel) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todoId}`));
    } else {
        res.send(resultFromModel);
    }
});

app.post(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
    const resultFromModel = todosModel.createTodo(req.body);

    if (!resultFromModel) {
        // NOTE: Bad request
        res.statusCode = 422;
        res.send(getServerError('Incorrect types of provided fields'));
    } else {
        // NOTE: Created
        res.statusCode = 201;
        res.send(resultFromModel);
    }
});

app.delete(TODOS_APP_ENDPOINTS.todoId, (req, res) => {
    const { todoId } = req.params;
    const resultFromModel = todosModel.deleteTodo(todoId);

    if (!resultFromModel) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todoId}`));
    } else {
        // NOTE: Accepted
        res.statusCode = 202;
        res.send(resultFromModel);
    }
});

app.put(TODOS_APP_ENDPOINTS.todoId, express.json(), (req, res) => {
    const { todo } = req.body;

    if (!todo) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please sent a todo to put it'));

        return;
    }

    const puttingTodo = todosModel.getSignleTodo(id);

    if (!puttingTodo) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todo.todoId}`));

        return;
    }

    const resultFromModel = todosModel.putTodo(req.body.todo);

    if (!resultFromModel) {
        // NOTE: Bad Request
        res.statusCode = 422;
        res.send(getServerError('Incorrect types of provided fields'));
    } else {
        res.statusCode = 200;
        res.send(resultFromModel);
    }
});

app.patch(TODOS_APP_ENDPOINTS.todoId, express.json(), (req, res) => {
    const { todoId } = req.params;
    const patchingTodo = todosModel.getSignleTodo(id);

    if (!patchingTodo) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todoId}`));

        return;
    }

    const resultFromModel = todosModel.patchTodo({ id, ...req.body });

    if (!resultFromModel) {
        // NOTE: Bad Request
        res.statusCode = 422;
        res.send(getServerError('Incorrect types of provided fields'));
    } else {
        res.statusCode = 200;
        res.send(resultFromModel);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
