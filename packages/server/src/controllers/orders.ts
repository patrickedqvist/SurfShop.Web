import { Context } from 'koa'

import ContentfulService from '../services/contentful'

export default class OrdersController {
  public static async createOrderEntry(ctx: Context) {
    const { orderId } = ctx.body

    console.log('createOrderEntry -->', ctx.body)

    if (!ctx.body || !ctx.body.orderId) {
      ctx.status = 500
      ctx.body = 'You must specify an orderId'
      ctx.app.emit('error', 'No orderId was specified', ctx)
    }

    try {
      const entry = await ContentfulService.createOrder(orderId)
      ctx.body = entry
    } catch (error) {
      console.log('createOrderEntry Error -->', error)
      ctx.body = error
    }
  }
}
