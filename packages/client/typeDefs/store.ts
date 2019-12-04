/* eslint-disable @typescript-eslint/no-explicit-any */

import { Viewstate } from './viewstate'
import { Cart } from './cart'
import { Product } from './product'
import { Page } from './page'

export interface Action {
  type: string
  payload?: any
  meta?: any
  error?: boolean
}

export interface RequestStatus {
  status: 'REQUEST_SUCCESS' | 'REQUEST_FAILURE' | 'REQUEST_LOADING'
  statusCode: number
}

export interface Store {
  viewstate: Viewstate
  cart: Cart
  products: {
    data: Product[]
    status: RequestStatus
  }
  pages: {
    data: Page[]
    status: RequestStatus
  }
}
