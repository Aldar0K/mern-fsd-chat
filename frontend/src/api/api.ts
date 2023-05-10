import axios from 'axios';

// TODO add server string to .env file.
// import { serverString } from 'appConfig';
const serverString = '/api';

export const instance = axios.create({
  baseURL: serverString,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
