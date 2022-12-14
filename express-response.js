import express from 'express';
import path from 'path';

console.clear();

const PORT = 3000;
const app = express();

//#region send json
// app.use('/json', (req, res) => {
//     // NOTE: will be an error since we can't end with json
//     // res.setHeader('Content-Type', 'application/json');
//     // res.end({ name: 'Ivan' });

//     res.send({ name: 'Ivan' });
// });
//#endregion

//#region send html
// app.use('/', (req, res) => {
//     // res.setHeader('Content-Type', 'text/html');
//     // res.end('Hello, world!');

//     res.send('Hello, world!');
// });
//#endregion

//#region send status with code description
// app.use('/', (req, res) => {
//     // res.sendStatus(200);
//     // res.sendStatus(300);
//     // res.sendStatus(400);
//     // res.sendStatus(404);
//     // res.sendStatus(500);
// });
//#endregion

//#region send file
// app.use('/', (req, res) => {
//     res.setHeader('Content-Disposition', 'attachment; filename="video.mp4');
//     res.sendFile(path.resolve('public', 'lviv.mp4'));
// });
//#endregion

//#region static server
// app.use(express.static(path.resolve('public')));

// //NOTE: fallback
// app.use('/', (req, res) => {
//     res.sendStatus(404);
// });
//#endregion

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
