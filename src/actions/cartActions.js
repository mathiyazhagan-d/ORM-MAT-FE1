import axios from 'axios';

import types from './types';
import { API_BASE_URL } from '../config/config';

const URI= API_BASE_URL;

export const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`${URI}/api/products/${id}`)

    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price:data.price,
            countInStock: data.countInStock,
            qty,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: types.CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
};

export const saveShippingAddress = (data) => (dispatch) => {

    dispatch({
        type: types.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    
    dispatch({
        type: types.CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const clearCart = () => {
    return {
        type: types.CART_CLEAR
    }
};