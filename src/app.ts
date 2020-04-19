import Koa from 'koa'
import Router from 'koa-router'
import websockify from 'koa-websocket'

const app = websockify(new Koa())
const router = new Router()

import ws from './ws'

// router init
router.all('/', async (ctx, next) => {
    ctx.body = { ping: 'pong' }

    await next()
})

// middleware


// router
// @ts-ignore
app.ws.use(ws.routes())
app.use(router.routes())
// .use(router.allowedMethods())


app.listen(3000, () => {
    console.log('koa started')
})