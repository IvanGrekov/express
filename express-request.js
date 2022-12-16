import express from 'express';
import path from 'path';

console.clear();

export const PORT = 3000;
const app = express();

app.use(express.static(path.resolve('public')));

// NOTE: apply middleware for all requests
// app.use(express.urlencoded({ extended: true }));

app.post('/api', express.urlencoded({ extended: true }), (req, res) => {
    const { body } = req;
    const { email, password } = body || {};

    if (!email || !password) {
        res.sendStatus(401);
        return;
    }

    res.send({
        email,
        password,
    });
});

app.post('/json', express.json(), (req, res) => {
    const { body } = req;
    const { name, surname } = body;

    if (!name || !surname) {
        res.sendStatus(400);
        return;
    }

    res.send(`Hello, ${name} ${surname}`);
});

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
