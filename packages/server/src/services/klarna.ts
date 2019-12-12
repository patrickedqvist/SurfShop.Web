// @flow
import axios from 'axios'
import { CheckoutMerchantUrls } from '../types/klarna'

import { KLARNA_BASE_URL, KLARNA_USERNAME, KLARNA_PASSWORD, KLARNA_PUSH_URL, EXTERNAL_SITE } from '../config/env'

const klarnaApi = axios.create({
  baseURL: KLARNA_BASE_URL,
  timeout: 10000,
  auth: {
    username: KLARNA_USERNAME,
    password: KLARNA_PASSWORD,
  },
})

export default class KlarnaService {
  public static async createOrder(order) {
    const orderConfig = {
      purchase_country: 'se',
      purchase_currency: 'SEK',
      locale: 'sv-SE',
    }

    const merchantUrls: CheckoutMerchantUrls = {
      terms: `${EXTERNAL_SITE}/term-and-conditions`,
      checkout: `${EXTERNAL_SITE}/checkout?sid={checkout.order.id}`,
      confirmation: `${EXTERNAL_SITE}/thank-you?sid={checkout.order.id}`,
      push: `${KLARNA_PUSH_URL}/{checkout.order.id}`,
    }

    const newOrder = {
      ...orderConfig,
      merchant_urls: merchantUrls,
      ...order,
    }

    try {
      const { data } = await klarnaApi.post('/checkout/v3/orders', newOrder)
      return data
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error.response.data
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw error.request
      }

      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message)

      throw error.message
    }
  }

  public static async getOrder(orderId: string) {
    try {
      const { data } = await klarnaApi.get(`/checkout/v3/orders/${orderId}`)
      return data
    } catch (error) {
      return error
    }
  }

  public static async getOrderFromManagement(orderId: string) {
    try {
      const { data } = await klarnaApi.get(`/ordermanagement/v1/orders/${orderId}`)
      return data
    } catch (error) {
      return error
    }
  }

  public static async acknowledgeOrderToManagement(orderId: string) {
    try {
      await klarnaApi.post(`/ordermanagement/v1/orders/${orderId}/acknowledge`, {})
      return true
    } catch (error) {
      return error
    }
  }
}
