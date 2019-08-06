import * as Koa from 'koa';


export const logging = async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
  console.log(`log url --> (${ctx.method}) ${ctx.url}`);
  next();
}
