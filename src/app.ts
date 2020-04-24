import Koa from 'koa'
import Router from 'koa-router'
import websockify from 'koa-websocket'
import serve from 'koa-static'
import ws from './ws'

const app = websockify(new Koa())
const router = new Router()

// router init
router.all('/', async (ctx, next) => {
    ctx.redirect('/index.html')
    await next()
})

// middleware
app.use(serve('./client/dist'))

// do not allow other routes
app.use(async (ctx, next) => {
    if (!['/login', '/'].includes(ctx.path)) {
        ctx.status = 401
        ctx.redirect('/')
    } else {
        await next()
    }
})

// router
// @ts-ignore
app.ws.use(ws.routes())
app.use(router.routes())
// .use(router.allowedMethods())


app.listen(3000, () => {
    console.log('koa started')
})