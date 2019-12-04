import * as Koa from 'koa'

export const logging = async (ctx, next: () => Promise<any>) => {
  console.log(`log url --> (${ctx.method}) ${ctx.url}`)
  next()
}
