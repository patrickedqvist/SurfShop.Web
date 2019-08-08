import { PRODUCTS_FETCH, PRODUCTS_RECEIVE } from "../definitions";
import { Action } from "../../typeDefs/store";

export const getProducts = (): Action => ({
    type: PRODUCTS_FETCH
})

export const receiveProducts = (products: object, error?: boolean, meta?: object): Action => ({
    type: PRODUCTS_RECEIVE,
    payload: { products },
    error,
    meta
})