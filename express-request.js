import express from 'express';
import path from 'path';

console.clear();

export const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.post('/api', express.urlencoded({ extended: true }), (req, res) => {
    const { email, password } = req.body;

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
    const { name, surname } = req.body;
    console.log(name, surname);

    if (!name || !surname) {
        res.send({ error: 'provide name & surname' });

        return;
    }

    res.send({ name, surname });
});

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
