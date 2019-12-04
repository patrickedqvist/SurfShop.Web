import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as koaCors from 'koa2-cors'
import * as koaSession from 'koa-session'
import * as logger from 'koa-logger'

// Utils
import { EMPTY_CART } from './utils/cart-utilities'

// Routes
import { router } from './routes'

const PORT = process.env.port || 4000
const app = new Koa()

app.keys = ['some secret hurr durr']

const SESSION_CONFIG = {
  key: 'surfshop',
}

app.use(logger())
app.use(koaSession(SESSION_CONFIG, app as any))
app.use(
  koaCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`@SurfShop/Server now available on http://localhost:${PORT}`)
})
app.on('error', (err, ctx) => {
  console.error('@SurfShop/Server an error occured', err, ctx)
  ctx.session = null
})

app.on('session:expired', (ctx: Koa.Context) => {
  ctx.app.emit('error', 'session value is expired')
  ctx.session.cart = EMPTY_CART
})

app.on('session:missed', (ctx: Koa.Context) => {
  ctx.app.emit('error', `can't get session value from external store`)
  ctx.session.cart = EMPTY_CART
})

app.on('session:invalid', (ctx: Koa.Context) => {
  ctx.app.emit('error', 'session value is invalid')
  ctx.session.cart = EMPTY_CART
})
