import { BaseContext } from 'koa';

import ContentfulService from '../services/contentful';

export default class OrdersController {

  public static async createOrderEntry(ctx: BaseContext) {

    const { orderId } = ctx.request.body;

    console.log('createOrderEntry -->', ctx.request.body);

    if ( !ctx.request.body || !ctx.request.body.orderId ) {
      ctx.status = 500;
      ctx.body = 'You must specify an orderId';
      ctx.app.emit('error', 'No orderId was specified', ctx);
    }

    try {
      const entry = await ContentfulService.createOrder(orderId);
      ctx.body = entry;
    } catch (error) {
      console.log('createOrderEntry Error -->', error);
      ctx.body = error;
    }
  }

}
