import {
    FETCH_PRODUCTS,
    ADD_PRODUCT,
    FETCH_SINGLE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from '../constants';
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

export const addProductSuccess = data => {
    console.log('data in redux', data)
    return {
        type: `${ADD_PRODUCT}_SUCCESS`,
        data
    }
};

export const addProductConflict = message => ({
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

// UPDATE PRODUCT -------------------------------------------------------------

const updateRequest = () => ({
    type: UPDATE_PRODUCT
});

const updateSuccess = data => ({
    type: `${UPDATE_PRODUCT}_SUCCESS`,
    data
});

const updateFailure = error => ({
    type: `${UPDATE_PRODUCT}_FAILURE`,
    error,
});

export const updateProduct = (data, productId, socket) => dispatch => {
    const productData = { ...data, productId };
    dispatch(updateRequest());
    try {
        socket.emit('updateProduct', productData);
        socket.on('updatedProduct', data => {
            dispatch(updateSuccess(data))
        })
    }catch (e) {
        dispatch(updateFailure(e.response))
    }
};

// DELETE PRODUCT --------------------------------------------------------------------------

const deleteRequest = () => ({
    type: DELETE_PRODUCT,
});

const deleteProductSuccess = (data) => ({
    type: `${DELETE_PRODUCT}_SUCCESS`,
    data,
});

const deleteProductFailure = (error) => ({
    type: `${DELETE_PRODUCT}_FAILURE`,
    error
});

export const delProduct = ( productId, socket ) => async dispatch => {
    dispatch(deleteRequest());
    try {
        socket.emit('deleteProduct', productId);
        socket.on('deletedProduct', data => {
            dispatch(deleteProductSuccess(data))
        })
    }catch (e) {
        dispatch(deleteProductFailure(e));
    }
};
