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
// NOTE: to prevent CORS
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// NOTE: to prevent sending json (for post)
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token');
// NOTE: to allow other methods
// res.setHeader('Access-Control-Allow-Methods', 'DELETE');

// res.end();
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
        res.send(getServerError(`There is no todo with id:${id}`));
    } else {
        res.send(resultFromModel);
    }
});

app.post(TODOS_APP_ENDPOINTS.todos, express.json(), (req, res) => {
    const { title, date } = req.body;

    if (!title || !date) {
        const errorMessage = !!title ? 'Date' : 'Title' + " wasn't provided";

        // NOTE: Bad request
        // res.statusCode = 400;
        // NOTE: Syntax is correct, but server can't proceed with provided data
        res.statusCode = 422;
        res.send(getServerError(errorMessage));

        return;
    }

    const resultFromModel = todosModel.createTodo(req.body);

    // NOTE: Created
    res.statusCode = 201;
    res.send(resultFromModel);
});

// app.delete('/todos/:todoId', (req, res) => {
//     const todoId = +req.params.todoId;
//     let removedTodo;

//     todos = todos.filter((todo) => {
//         if (todo.id === todoId) {
//             removedTodo = todo;

//             return false;
//         }

//         return true;
//     });

//     if (!removedTodo) {
//         res.sendStatus(404);
//     } else {
//         res.send(removedTodo);
//     }
// });

// app.put('/todos/:todoId', express.json(), (req, res) => {
//     const todoId = +req.params.todoId;
//     const { date, completed, title } = req.body;

//     if (
//         typeof date === 'undefined' ||
//         typeof completed === 'undefined' ||
//         typeof title === 'undefined'
//     ) {
//         res.sendStatus(400);

//         return;
//     }

//     let updatedTodo;

//     todos = todos.map((todo) => {
//         if (todo.id === todoId) {
//             updatedTodo = {
//                 id: todoId,
//                 userId,
//                 title,
//                 completed,
//             };

//             return updatedTodo;
//         }

//         return todo;
//     });

//     if (!updatedTodo) {
//         res.sendStatus(404);
//     } else {
//         res.send(updatedTodo);
//     }
// });

// app.patch('/todos/:todoId', express.json(), (req, res) => {
//     const todoId = +req.params.todoId;
//     const { title, date, completed } = req.body;

//     let patchedTodo;

//     todos = todos.map((todo) => {
//         if (todo.id === todoId) {
//             if (
//                 typeof date === 'undefined' &&
//                 typeof completed === 'undefined' &&
//                 typeof title === 'undefined'
//             ) {
//                 patchedTodo = todo;
//                 return todo;
//             }

//             const {
//                 title: currentTitle,
//                 userId: currentUserId,
//                 completed: currentCompleted,
//             } = todo;

//             patchedTodo = {
//                 ...todo,
//                 title: title || currentTitle,
//                 userId: userId || currentUserId,
//                 completed: completed || currentCompleted,
//             };

//             return patchedTodo;
//         }

//         return todo;
//     });

//     if (!patchedTodo) {
//         res.sendStatus(404);
//     } else {
//         res.send(patchedTodo);
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
