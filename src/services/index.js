import axios from 'axios';
import dotenv from 'dotenv';
import openSocket from 'socket.io-client';

dotenv.config();

const backEndUrl = process.env.REACT_APP_BACKEND_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const sokoSocket = () => {
	return openSocket(baseUrl, {withCredentials: false});
};

const instance =  axios.create({
	baseURL: backEndUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default instance;

