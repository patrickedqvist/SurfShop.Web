import { CART_FETCH, CART_RECEIVE, CART_ADD, CART_UPDATE, CART_REMOVE } from "../definitions";

export const getCart = () => ({
    type: CART_FETCH
});

export const receiveCart = (cart: Object, error: boolean = false) => ({
    type: CART_RECEIVE,
    payload: { cart },
    error
});

export const addProductToCart = (cartItem: object) => ({
    type: CART_ADD,
    payload: { cartItem }
})

export const updateProductInCart = (id: string, quantity: number) => ({
    type: CART_UPDATE,
    payload: { id, quantity }
})

export const removeProductFromCart = (id: string) => ({
    type: CART_REMOVE,
    payload: { id }
})