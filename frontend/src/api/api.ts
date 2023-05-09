import axios from 'axios';

// TODO add server string to .env file.
// import { serverString } from 'appConfig';
const serverString = '/api';

const userData = localStorage.getItem('userData');
const token = userData ? JSON.parse(userData).token : '';

export const instance = axios.create({
  baseURL: serverString,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});
