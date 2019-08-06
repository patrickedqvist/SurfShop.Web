import 'next';
import { Store } from 'redux'

declare module 'next' {
    export interface NextPageContext {
        isServer: boolean
        store: Store
    }
}