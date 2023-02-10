import { generateId } from './utils.js';

let todos = [
    {
        id: '1',
        title: 'HTML',
        isCompleted: false,
        date: new Date('2023-02-11'),
    },
    {
        id: '2',
        title: 'CSS',
        isCompleted: true,
        date: new Date('2023-02-09'),
    },
    {
        id: '3',
        title: 'JS',
        isCompleted: false,
        date: new Date('2023-03-03'),
    },
    {
        id: '4',
        title: 'REACT',
        isCompleted: true,
        date: new Date('2023-09-08'),
    },
    {
        id: '5',
        title: 'NODE',
        isCompleted: false,
        date: new Date('2023-02-10'),
    },
];

export default {
    getTodos: () => {
        return todos;
    },
    getSignleTodo: (id) => {
        const todo = todos.find((todo) => todo.id === id);

        if (!todo) {
            return null;
        }

        return todo;
    },
    createTodo: ({ title, date = '', isCompleted = false }) => {
        if (
            typeof title !== 'string' ||
            typeof date !== 'string' ||
            typeof isCompleted !== 'boolean'
        ) {
            return null;
        }

        const newTodo = {
            id: generateId(),
            title,
            date,
            isCompleted,
        };

        todos.push(newTodo);

        return newTodo;
    },
    deleteTodo: (id) => {
        const deletingTodoIndex = todos.findIndex((todo) => todo.id === id);

        if (deletingTodoIndex === -1) {
            return null;
        }

        const [deletingTodo] = todos.splice(deletingTodoIndex, 1);

        return deletingTodo;
    },
    putTodo: (updatingTodo) => {
        const { id, title, isCompleted, date = '' } = updatingTodo;
        const updatingTodoIndex = todos.findIndex((todo) => todo.id === id);

        if (updatingTodoIndex === -1) {
            return null;
        }

        if (
            typeof title !== 'string' ||
            typeof isCompleted !== 'boolean' ||
            typeof date !== 'string'
        ) {
            return null;
        }

        todos[updatingTodoIndex] = {
            id,
            title,
            isCompleted,
            date,
        };

        return todos[updatingTodoIndex];
    },
    patchTodo: ({ id, title, date, isCompleted }) => {
        const patchingTodoIndex = todos.findIndex((todo) => todo.id === id);

        if (patchingTodoIndex === -1) {
            return null;
        }

        const {
            title: currentTitle,
            date: currentDate,
            isCompleted: currentIsCompleted,
        } = todos[patchingTodoIndex];
        const truthTitle = title || currentTitle;
        const truthDate = date || currentDate;
        const truthIsCompleted =
            typeof isCompleted === 'boolean' ? isCompleted : currentIsCompleted;

        if (typeof truthTitle !== 'string' || typeof truthDate !== 'string') {
            return null;
        }

        todos[patchingTodoIndex] = {
            id,
            title: truthTitle,
            date: truthDate,
            isCompleted: truthIsCompleted,
        };

        return todos[patchingTodoIndex];
    },
    replaceTodos: (newTodos) => {
        const formattedNewTodos = [];

        newTodos.forEach(({ id, title, date = '', isCompleted = false }) => {
            if (
                typeof id !== 'string' ||
                typeof title !== 'string' ||
                typeof date !== 'string' ||
                typeof isCompleted !== 'boolean'
            ) {
                return;
            }

            formattedNewTodos.push({
                id,
                title,
                date,
                isCompleted,
            });
        });

        if (!!newTodos.length && !formattedNewTodos.length) {
            return null;
        } else {
            todos = formattedNewTodos;
            return todos;
        }
    },
};
