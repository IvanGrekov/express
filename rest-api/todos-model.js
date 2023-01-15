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
            return { error: { message: `There is no todo with id:${id}` } };
        }

        return todo;
    },
};
