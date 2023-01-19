import { generateId } from './utils.js';

let todos = [
    {
        id: '1',
        title: 'HTML',
        isCompleted: false,
        date: '',
    },
    {
        id: '2',
        title: 'CSS',
        isCompleted: true,
        date: '',
    },
    {
        id: '3',
        title: 'JS',
        isCompleted: false,
        date: '',
    },
    {
        id: '4',
        title: 'REACT',
        isCompleted: true,
        date: '',
    },
    {
        id: '5',
        title: 'NODE',
        isCompleted: false,
        date: '',
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

        return updatingTodo;
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
        const truthIsCompleted = isCompleted || currentIsCompleted;

        if (
            typeof truthTitle !== 'string' ||
            typeof truthDate !== 'string' ||
            typeof truthIsCompleted !== 'boolean'
        ) {
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
};
