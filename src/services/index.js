import axios from 'axios';
import dotenv from 'dotenv';
import openSocket from 'socket.io-client';



dotenv.config();

const baseURL = process.env.REACT_APP_BACKEND_URL;
const backEndUrl = 'http://127.0.0.1:7000';

export const sokoSocket = () => {
    return openSocket(backEndUrl, {withCredentials: false});
};

const instance =  axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;

