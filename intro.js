import http from 'http';
import express from 'express';

console.clear();

// const PORT = 3000;
// const server = new http.Server();

// server.on('request', (req, res) => {
//     res.end('<h1>Hello world!</h1>');
// });

// server.listen(PORT, () => {
//     console.log(`Server is running, http://localhost:${PORT}`);
// });

const PORT = 3000;
const app = express();

//#region only for '/' with method 'GET'
// app.get('/', (req, res) => {
//     res.end('<h1>Hello world!</h1>');
// });
//#endregion

//#region only for '/' with method 'POST'
// app.post('/', (req, res) => {
//     res.end('<h1>Hello world!</h1>');
// });
//#endregion

//#region for '/about...' with any method
// app.use('/about', (req, res) => {
//     res.end('<h1>About page!</h1>');
// });
//#endregion

//#region for '/...' with any method
// app.use('/', (req, res) => {
//     res.end('<h1>Home page!</h1>');
// });
//#endregion

//#region break 'use' method
// app.use('/', (req, res) => {
//     res.end('<h1>Home page!</h1>');
// });

// NOTE: won't work because we already have matched url above
// app.use('/team', (req, res) => {
//     res.end('<h1>About page!</h1>');
// });
//#endregion

//#region prevent breaking for 'use' method
// app.use('/', (req, res, next) => {
//     res.write('<h1>Home page!</h1>');
//     next();
// });

// app.use('/team', (req, res) => {
//     res.end('<h1>About page!</h1>');
// });
//#endregion

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
