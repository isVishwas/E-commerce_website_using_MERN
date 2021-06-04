import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstant';


export const addToCart = (id,qty) => async (dispatch, getState) => {
    try {

        const { data } = await axios.get(`/api/products/${id}`);
        //console.log("data",data);


        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                price: data.price,
                image: data.image,
                qty,
                countInStock: data.countInStock
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (err) { console.log("error:", err) }
}


export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload:id
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}