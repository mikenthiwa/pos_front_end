import {ADD_USER} from '../constants';
import sokoApi from '../../services';

const requestAddUser = () => ({
	type: ADD_USER
});

const addUserSuccess = message => ({
	type: `${ADD_USER}_SUCCESS`,
	message
});

const addUserFailure = error => ({
	type: `${ADD_USER}_FAILURE`,
	error
});

export const addUser = userDetails => async dispatch => {
	dispatch(requestAddUser());
	try {
		const {data : { message, token } } = await sokoApi.post('/register', userDetails);
		window.localStorage.setItem('token', token);
		dispatch(addUserSuccess({message, token}));
		window.location.href = '/products'
	}catch (error) {
		const { response } = error;
		if(response !== undefined) {
			const { data: { message } } = response;
			return dispatch(addUserFailure(message));
		}
		return dispatch(addUserFailure('No connection, please reload'));
	}
};
