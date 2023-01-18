import { generateId } from './utils.js';

let todos = [
    {
        id: 1,
        title: 'HTML',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'CSS',
        isCompleted: true,
    },
    {
        id: 3,
        title: 'JS',
        isCompleted: false,
    },
    {
        id: 4,
        title: 'REACT',
        isCompleted: true,
    },
    {
        id: 5,
        title: 'NODE',
        isCompleted: false,
    },
];

export default {
    getTodos: () => {
        return todos;
    },
    getSignleTodo: (id) => {
        const todo = todos.find((todo) => todo.id === +id);

        if (!todo) {
            return null;
        }

        return todo;
    },
    createTodo: ({ title, date, isCompleted = false }) => {
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
        const deletingTodoIndex = todos.findIndex((todo) => todo.id === +id);

        if (deletingTodoIndex === -1) {
            return null;
        }

        const [deletingTodo] = todos.splice(deletingTodoIndex, 1);

        return deletingTodo;
    },
};
