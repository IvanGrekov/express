import axios from 'axios';

const URL = 'http://localhost:3000/json';
axios.post(URL, { name: 'Ivan', surname: 'Grekov' }).then(({ data }) => console.log('data:', data));
