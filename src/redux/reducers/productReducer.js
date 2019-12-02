import { FETCH_PRODUCTS, ADD_PRODUCT, FETCH_SINGLE_PRODUCT } from '../constants';

const initialState = {
    isLoading: false,
    data: [],
    error: {},
    conflictError: {},
    product: {},
    isModalVisible: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case `${ FETCH_PRODUCTS }`:
            return { ...state, isLoading: true, data: [], error: {}};
        case `${ FETCH_PRODUCTS }_SUCCESS`:
            return { ...state, isLoading: false, data: action.data, product: action.data[0], error: {} };
        case `${ FETCH_PRODUCTS}_FAILURE`:
            return { ...state, isLoading: false, data: [], error: action.error };
         // ADD PRODUCT
        case `${ADD_PRODUCT}`:
            return {...state, isLoading: true};
        case `${ADD_PRODUCT}_SUCCESS`:
            return { ...state, isLoading: false, data: [...state.data, action.data], error: {}, isModalVisible: false };
        case `${ADD_PRODUCT}_CONFLICT`:
            return { ...state, isLoading: false, conflictError: action.message, isModalVisible: true};
        case `${ADD_PRODUCT}_FAILURE`:
            return {...state, isLoading: false, data: [], error: action.error};

        // SINGLE_PRODUCT
        case `${FETCH_SINGLE_PRODUCT}`:
            return { ...state, isLoading: true };
        case `${FETCH_SINGLE_PRODUCT}_SUCCESS`:
            return { ...state, isLoading: false, error: {}, product: action.data};
        case `${FETCH_SINGLE_PRODUCT}_FAILURE`:
            return { ...state, isLoading: false, error: action.error};
        default:
            return state
    }
}
