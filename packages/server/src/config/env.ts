import * as dotenv from 'dotenv';

dotenv.config();

let path = '';

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}

dotenv.config({ path: path });

export const KLARNA_BASE_URL = process.env.KLARNA_BASE_API_URL;
export const KLARNA_USERNAME = process.env.KLARNA_USERNAME;
export const KLARNA_PASSWORD = process.env.KLARNA_PASSWORD;
export const KLARNA_PUSH_URL = process.env.KLARNA_PUSH_URL;
export const SHOPIFY_STORE_NAME = process.env.SHOPIFY_STORE_NAME;
export const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
export const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
export const EXTERNAL_SITE = process.env.EXTERNAL_SITE;
