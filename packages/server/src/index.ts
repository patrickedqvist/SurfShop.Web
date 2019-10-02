import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as koaCors from 'koa2-cors';
import * as koaSession from 'koa-session';
import * as logger from 'koa-logger';

// Routes
import { router } from './routes';

const PORT = process.env.port || 4000;
const app = new Koa();

app.keys = ['some secret hurr'];

const SESSION_CONFIG = {
  key: '@surfshop:server:session', /** (string) cookie key */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(logger());
app.use(koaSession(SESSION_CONFIG, app as any));
app.use(koaCors({
  origin: '*',
  credentials: true
}))
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`@SurfShop/Server now available on http://localhost:${PORT}`)
});
app.on('error', (err, ctx) => {
  console.error('@SurfShop/Server an error occured', err, ctx);
  ctx.session = null;
});

app.on('session:expired', (ctx) => {
  ctx.session.cart = {
    items: [],
    total_amount: 0,
    total_discount_amount: 0,
    total_tax_amount: 0
  }
});
