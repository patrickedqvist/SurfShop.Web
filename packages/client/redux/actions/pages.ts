import { Action } from "../../typeDefs/store";
import { PAGE_FETCH, PAGE_RECEIVE } from "../definitions";

export const getPageBySlug = (slug: string): Action => ({
    type: PAGE_FETCH,
    payload: { slug }
})

export const receivePageBySlug = (page: object | null, error?: boolean, meta?: object): Action => ({
    type: PAGE_RECEIVE,
    payload: { page },
    error,
    meta
})