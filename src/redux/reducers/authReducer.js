import { ADD_USER } from '../constants';

const initialState = {
	isLoading: false,
	message: '',
	token: '',
	error: '',
};

export default (state=initialState, action) => {
	switch (action.type) {
	case ADD_USER:
		return { ...state, isLoading: true, message: '', token: '', error: '' };
	case `${ADD_USER}_SUCCESS`:
		return { ...state, isLoading: false,
			message: action.message.message,
			token: action.message.token,
			error: ''
		};
	case `${ADD_USER}_FAILURE`:
		return { ...state, isLoading: false, message: '', token: '', error: action.error };
	default: return state;
	}
};
