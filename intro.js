import http from 'http';
import express from 'express';

console.clear();

const PORT = 3000;
// const server = new http.Server();

// server.on('request', (req, res) => {
//     res.end('<h1>Hello, world!</h1>');
// });

// server.on('error', (err) => {
//     console.warn('Server error:', err.message);
// });

// server.listen(PORT, () => {
//     console.log(`Server is running, http://localhost:${PORT}`);
// });

const server = express();

//#region only for '/index' with method 'GET'
// server.get('/index', (req, res) => {
//     res.end('<h1>Hello world!</h1>');
// });
//#endregion

//#region only for '/index' with method 'POST'
// server.post('/index', (req, res) => {
//     res.end('<h1>Hello world!</h1>');
// });
//#endregion

//#region for '/...' with any method
// server.use('/', (req, res) => {
//     res.end('<h1>Home page!</h1>');
// });
//#endregion

//#region for '/about...' with any method
// server.use('/about', (req, res) => {
//     res.end('<h1>About page!</h1>');
// });
//#endregion

//#region break 'use' method
// server.use('/', (req, res) => {
//     res.end('<h1>Home page!</h1>');
// });

// NOTE: won't work even for 'http://localhost:3000/team' because we already have matched url above
// server.use('/team', (req, res) => {
//     res.end('<h1>About page!</h1>');
// });
//#endregion

//#region prevent breaking for 'use' method
// server.use('/', (req, res, next) => {
//     res.write('<h1>Home page!</h1>');

//     // NOTE: if there is no matching below, we won't end the response
//     // NOTE: if there is a matching below, we will get error because we already made 'end'
//     // NOTE: if there is a matching below and to prevent the error we should use 'write' instead of 'end' above
//     next();
// });

// server.use('/team', (req, res) => {
//     // NOTE: if it will end the response if the request has '/team...' address
//     res.end('<h1>About page!</h1>');
// });
//#endregion

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
