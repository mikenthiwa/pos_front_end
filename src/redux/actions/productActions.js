import { FETCH_PRODUCTS, ADD_PRODUCT, FETCH_SINGLE_PRODUCT} from '../constants';
import { toast } from 'react-toastify';
import sokoAPI from '../../services';


const requestProducts = () => ({
    type: FETCH_PRODUCTS
});

const fetchProductsSuccess = data => ({
    type: `${FETCH_PRODUCTS}_SUCCESS`,
    data,
});

const fetchProductsFailure = error => ({
    type: `${FETCH_PRODUCTS}_FAILURE`,
    error
});

export const fetchProducts = (socket) => async dispatch => {
    dispatch(requestProducts());
    try {
        return socket.on('initialList', (data) => {
            return dispatch(fetchProductsSuccess(data))
        });
    } catch (e) {
        const { isAxiosError } = e;
        if(isAxiosError){
            const error = { error: "Something went wrong"};
            return dispatch(fetchProductsFailure(error))
        }
    }
};

// ADD_PRODUCT

const requestAddProduct = () => ({
    type: ADD_PRODUCT
});

const addProductSuccess = data => ({
    type: `${ADD_PRODUCT}_SUCCESS`,
    data
});

const addProductConflict = message => ({
    type: `${ADD_PRODUCT}_CONFLICT`,
    message,
});

const addProductFailure = error => ({
    type: `${ADD_PRODUCT}_FAILURE`,
    error,
});

export const newProduct = (data, socket) => async(dispatch) => {
    dispatch(requestAddProduct());
    try {
        socket.emit('addProduct', data);
        socket.on('productAdded', data => {
            console.log("data", data);
            const { conflictMessage } = data;
            if(!conflictMessage) {
                dispatch(addProductSuccess(data))
            } else{
                const conflictError = "Product already exists";
                toast.error(conflictError);
                dispatch(addProductConflict(conflictError))
            }
        })
    }catch (e) {
        dispatch(addProductFailure(e.response))
    }
};

// Get Single Product ----------------------------------------------------------

const requestSingleProduct = () => ({
   type:  FETCH_SINGLE_PRODUCT,
});

const fetchSingleProductSuccess = data => ({
    type: `${FETCH_SINGLE_PRODUCT}_SUCCESS`,
    data,
});

const fetchSingleProductFailure = error => ({
    type: `${FETCH_SINGLE_PRODUCT}_FAILURE`,
    error,
});

export const fetchSingleProduct = (ProductId) => async dispatch => {
    dispatch(requestSingleProduct());
    try {
        const { data: {data} }  = await sokoAPI.get(`/products/${ProductId}`);
        dispatch(fetchSingleProductSuccess(data));
    }catch (e) {
        const { response } = e;
        dispatch(fetchSingleProductFailure(response))
    }
};
