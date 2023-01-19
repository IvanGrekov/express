export const getServerError = (message) => ({
    error: { message },
});

export const generateId = () => `${Math.random() * Math.random()}`.replace(/[0.]/g, '');
