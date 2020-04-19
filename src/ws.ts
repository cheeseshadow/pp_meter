import Router from "koa-router"
import { DefaultState, DefaultContext } from "koa"


const router = new Router<DefaultState, DefaultContext>()

router.all('/room/:name', async ctx => {
    const ws = ctx.websocket
    const name = ctx.params.name

    console.log('soochara', name)

    ws.on('close', (message: any) => {
        console.log('it closed!', message)
    })

    ws.on('error', (message: any) => {
        console.log('something happened!', message)
    })

    ws.on('message', (message: any) => {
        console.log(message)
        ctx.websocket.send(`${name} said ${message}`)
    })
})

export default router