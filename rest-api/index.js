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
        origin: 'http://localhost:4000',
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

// NOTE: create todo
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

// NOTE: delete todo
app.delete(TODOS_APP_ENDPOINTS.todoId, (req, res) => {
    const { todoId } = req.params;
    const resultFromModel = todosModel.deleteTodo(todoId);

    if (!resultFromModel) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todoId}`));
    } else {
        // NOTE: Accepted
        // res.statusCode = 202;
        // NOTE: Succeeded
        // res.statusCode = 204;
        res.statusCode = 200;
        res.send(resultFromModel);
    }
});

// NOTE: update todo
app.put(TODOS_APP_ENDPOINTS.todoId, express.json(), (req, res) => {
    const { todoId } = req.params;

    if (!req.body.todo) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send todo data in format `{ todo: {...} }` to put todo'));

        return;
    }

    const puttingTodo = todosModel.getSignleTodo(todoId);

    if (!puttingTodo) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todoId}`));

        return;
    }

    const resultFromModel = todosModel.putTodo({ id: todoId, ...req.body.todo });

    if (!resultFromModel) {
        // NOTE: Bad Request
        res.statusCode = 422;
        res.send(getServerError('Incorrect types of provided fields'));
    } else {
        res.statusCode = 200;
        res.send(resultFromModel);
    }
});

// NOTE: modify todo
app.patch(TODOS_APP_ENDPOINTS.todoId, express.json(), (req, res) => {
    const { todoId } = req.params;

    if (!req.body.todo) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send todo data in format `{ todo: {...} }` to patch todo'));

        return;
    }

    const patchingTodo = todosModel.getSignleTodo(todoId);

    if (!patchingTodo) {
        // NOTE: Not found
        res.statusCode = 404;
        res.send(getServerError(`There is no todo with id:${todoId}`));

        return;
    }

    const resultFromModel = todosModel.patchTodo({ id: todoId, ...req.body.todo });

    if (!resultFromModel) {
        // NOTE: Bad Request
        res.statusCode = 422;
        res.send(getServerError('Incorrect types of provided fields'));
    } else {
        res.statusCode = 200;
        res.send(resultFromModel);
    }
});

// NOTE: modify todos
app.patch(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
    if (!req.body.todos) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(
            getServerError(
                'Please send todos in format `{ todos: ITodo[] }` to modify several todos, or add todoId param to your url to modify single todo',
            ),
        );

        return;
    }

    if (Array.isArray(req.body.todos) && !req.body.todos.length) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send a not empty array of todos to modify several todos'));

        return;
    }

    for (const todo of req.body.todos) {
        if (!todo?.id) {
            continue;
        }

        const { id } = todo;
        todosModel.patchTodo({ id, ...todo });
    }

    res.statusCode = 200;
    res.send(todosModel.getTodos());
});

// NOTE: update todos data
app.put(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
    if (!req.body.todos) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(
            getServerError(
                'Please send todos in format `{ todos: ITodo[] }` to update todos data, or add todoId param to your url to update a single todo',
            ),
        );

        return;
    }

    if (Array.isArray(req.body.todos) && !req.body.todos.length) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send a not empty array of todos to update todos data'));

        return;
    }

    const resultFromModel = todosModel.replaceTodos(req.body.todos);

    if (!resultFromModel) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(
            getServerError('Please provide the array with todos corresponded to todo interface'),
        );
    } else {
        res.statusCode = 200;
        res.send(resultFromModel);
    }
});

// NOTE: remove todos
app.delete(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
    if (!req.body.todoIds) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(getServerError('Please send todoIds for removing in format `{ todoIds: id[] }`'));

        return;
    }

    if (Array.isArray(req.body.todoIds) && !req.body.todoIds.length) {
        // NOTE: Bad request
        res.statusCode = 400;
        res.send(
            getServerError('Please send a not empty array of todoIds to remove several todos'),
        );

        return;
    }

    for (const id of req.body.todoIds) {
        todosModel.deleteTodo(id);
    }

    // NOTE: Succeeded
    res.statusCode = 200;
    res.send(todosModel.getTodos());
});

app.get('/check', (req, res) => {
    res.send(req.query.check);
});

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
