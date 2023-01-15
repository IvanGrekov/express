let todos = [
    {
        id: 1,
        title: 'HTML',
        completed: false,
    },
    {
        id: 2,
        title: 'CSS',
        completed: true,
    },
    {
        id: 3,
        title: 'JS',
        completed: false,
    },
    {
        id: 4,
        title: 'REACT',
        completed: true,
    },
    {
        id: 5,
        title: 'NODE',
        completed: false,
    },
];

export default {
    getTodos: () => {
        return todos;
    },
    getSignleTodo: (id) => {
        const todo = todos.find((todo) => todo.id === +id);

        if (!todo) {
            return { error: { message: `There is no todo with id:${id}` } };
        }

        return todo;
    },
};
