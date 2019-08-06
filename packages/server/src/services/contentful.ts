import * as contentful from 'contentful-management';
import { get } from 'lodash/fp';

import { OrderEntry } from '../types/contentful';

import { CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_SPACE_ID } from '../config/env';

const cf = contentful.createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

const spaceId = CONTENTFUL_SPACE_ID;

export default class ContentfulService {

  public static async getSpace() {
    try {
      const space = await cf.getSpace(spaceId);
      const env = await space.getEnvironment('master');
      return env;
    } catch (error) {
      console.log('==== ContentfulService Error ====');
      console.log(error);
    }
  }

  public static async createOrder(orderId: string, rawJson?: any) {
    try {

      const space = await this.getSpace();

      const newOrder = {
        fields: {
          orderId: {
            'sv': orderId
          },
          raw: {
            'sv': rawJson || ''
          },
          klarnaReference: {
            'sv': get('klarna_reference', rawJson)
          }
        }
      }

      const response: OrderEntry = await space.createEntryWithId('order', orderId, newOrder);
      const entryId = response.sys.id;
      const publishedEntry = await this.publishEntry(entryId);
      return publishedEntry;
    } catch (error) {
      console.error('ContentfulService createOrder error -->', error);
      throw error;
    }
  }

  public static async updateOrCreateOrder(orderId: string, rawJSON?: any) {

    try {
      const space = await this.getSpace();
      const entry = await space.getEntry(orderId);

      if ( entry ) {
        entry.fields.raw['sv'] = rawJSON;
        entry.fields.klarnaReference['sv'] = get('klarna_reference', rawJSON);
        await entry.update();

        const publishedEntry = await this.publishEntry(entry.sys.id);
        return publishedEntry;
      }

    } catch ( error ) {

      // If no entry was found the create it
      if ( get('name', error) === 'NotFound' ) {
        ContentfulService.createOrder(orderId, rawJSON);
      } else {
        console.error('ContentfulService updateOrCreateOrder error -->', error);
        throw error;
      }

    }

  }

  public static async updateProductStockQuantity(productSKU: string, quantity: number) {
    try {

      // 1. Find product by it's sku id
      const space = await this.getSpace();
      const response = await space.getEntries({
        content_type: 'product',
        'fields.sku': productSKU,
      });
      const productContentfulId = get('items[0].sys.id', response)

      // 2. Get the specific entry from Contentful
      const entry = await space.getEntry(productContentfulId);

      // 3. Update the stockQuantity of the product
      if ( entry ) {
        const oldQuantity = entry.fields.stockQuantity['sv'];
        entry.fields.stockQuantity['sv'] = oldQuantity - quantity;
        await entry.update();
        await this.publishEntry(entry.sys.id);
      }

    } catch (error) {
      console.log('ContentfulService updateProductStockQuantity error --> ', error);
      throw error;
    }
  }

  public static async publishEntry(entryId: string) {

    try {
      const space = await this.getSpace();
      const entry = await space.getEntry(entryId);
      const publishedEntry = await entry.publish();
      return publishedEntry;
    } catch (error) {
      console.error('ContentfulService publishOrder error -->', error);
      return error;
    }

  }

}
