import axios from 'axios';

// const URL = 'http://localhost:3000';
// axios.post(URL).then(({ data }) => console.log('data:', data));

// const URL = 'http://localhost:3000/team';
// axios.post(URL).then(({ data }) => console.log('data:', data));

const URL = 'http://localhost:3000/json';
axios.post(URL, { name: 'Ivan', surname: 'Grekov' }).then((res) => {
    console.log(res.data);
});
