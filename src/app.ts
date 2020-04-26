import Koa from 'koa'
import Router from 'koa-router'
import websockify from 'koa-websocket'
import serve from 'koa-static'
import ws from './ws'
import fs from 'fs'
import path from "path";

const app = websockify(new Koa())
const router = new Router()

// router init for vue router history mode
router.get('*', async (ctx, next) => {
    const html = fs.readFileSync(path.resolve('./client/dist/index.html'));
    ctx.type = 'html';
    ctx.body = html;
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