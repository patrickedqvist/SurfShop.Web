import { BaseContext } from 'koa';
import { has, get, map } from 'lodash/fp';

// Services
import KlarnaService from '../services/klarna';
import ContentfulService from '../services/contentful';

// Controllers
import CartController from './cart';

// Schemas
import { newOrderSchema } from '../schemas/checkout';

// Types
import { CheckoutOrderLine } from '../types/klarna';

export default class CheckoutController {

  public static async createOrder(ctx: BaseContext) {

    if ( ctx.session.order_id ) {
      const order = await KlarnaService.getOrder(ctx.session.order_id);
      if ( order.status === 'checkout_incomplete' ) {
        ctx.body = order;
      }
    }

    if ( ctx.request.body !== null ) {

      try {

        // Validate input
        const validatedOrder = await newOrderSchema.validate(ctx.request.body, { stripUnknown: true });

        // Create Order in Klarna
        const response = await KlarnaService.createOrder(validatedOrder);

        ctx.session.order_id = response.order_id;
        ctx.body = response;

      } catch (error) {

        if ( has('errors', error) ) {
          ctx.status = 400;
          ctx.body = get('errors', error);
        } else if ( has('error_messages', error) ) {
          ctx.status = 400;
          ctx.body = error;
        } else {
          ctx.status = 400;
          ctx.body = error;
        }

      }

    } else {
      ctx.body = 'You must submit required information to create an order.'
    }

  }

  public static async getOrder(ctx: BaseContext) {

    if ( !ctx.params.id ) {
      ctx.status = 500;
      ctx.body = 'You must specify an id as a parameter';
      ctx.app.emit('error', 'No id parameter was specified', ctx);
    }

    try {
      const order = await KlarnaService.getOrder(ctx.params.id);
      ctx.body = order;
    } catch ( error ) {
      ctx.status = 400;
      ctx.app.emit('error', error, ctx);
      ctx.body = error;
    }

  }

  public static async confirmPurchase(ctx: BaseContext) {

    if ( !ctx.params.id ) {
      ctx.status = 400;
      ctx.body = 'You must specify an id as a parameter';
      ctx.app.emit('error', 'No id parameter was specified', ctx);
    }

    try {

      // 1. Get order from klarna
      const order = await KlarnaService.getOrderFromManagement(ctx.params.id);
      const orderId = order.order_id;

      // @TODO: Don't do steps 2-4 if already acknowledged

      // 2. Acknowledge order to Klarna
      await KlarnaService.acknowledgeOrderToManagement(orderId);

      // 3. Save or update order in Contentful
      await ContentfulService.updateOrCreateOrder(orderId, order);

      // 4. Save and update products (stock quantity) in Contentful
      await CheckoutController.updateProducts(order);

      // 5. Reset cart
      CartController.resetCart(ctx);

      // 6. Let the user know it was successful
      ctx.status = 200;

    } catch (error) {
      ctx.status = 400;
      ctx.app.emit('error', error, ctx);
      ctx.body = error;
    }

  }

  public static async confirmKlarnaPush(ctx: BaseContext) {

    if ( !ctx.params.id ) {
      ctx.status = 400;
      ctx.body = 'You must specify an checkout_uri as a parameter';
      ctx.app.emit('error', 'No checkout_uri parameter was specified', ctx);
    }

    const orderId = ctx.params.id;

    try {
      // 1. Get order from klarna
      const order = await KlarnaService.getOrderFromManagement(ctx.params.id);

      // @TODO: Don't do steps 2-4 if already acknowledged

      // 2. Acknowledge order to Klarna
      await KlarnaService.acknowledgeOrderToManagement(orderId);

      // 3. Save or update order in Contentful
      await ContentfulService.updateOrCreateOrder(orderId, order);

      // 4. Save and update products (stock quantity) in Contentful
      await CheckoutController.updateProducts(order);

      // 6. Let the user know it was successfull
      ctx.status = 200;

    } catch ( error ) {
      ctx.status = 400;
      ctx.app.emit('error', error, ctx);
      ctx.body = error;
    }

  }

  public static async updateProducts(order: { [key: string]: any }) {

    const orderLines: Array<CheckoutOrderLine> = order.order_lines;

    try {
      await Promise.all(
        map((orderLine) => ContentfulService.updateProductStockQuantity(orderLine.reference, orderLine.quantity), orderLines)
      );
    } catch (error) {
      throw error;
    }

  }

}
