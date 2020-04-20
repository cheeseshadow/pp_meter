import Koa from 'koa'
import Router from 'koa-router'
import websockify from 'koa-websocket'
import serve from 'koa-static'
import path from 'path'

const app = websockify(new Koa())
const router = new Router()

import ws from './ws'
import { resolve } from 'dns'

// router init
router.all('/', async (ctx, next) => {
    ctx.redirect('/index.html')
    // ctx.body = { ping: 'pong' }

    await next()
})

// middleware
app.use(serve('./client/dist'))

// router
// @ts-ignore
app.ws.use(ws.routes())
app.use(router.routes())
// .use(router.allowedMethods())


app.listen(3000, () => {
    console.log('koa started')
})