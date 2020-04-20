import Router from "koa-router"
import { DefaultState, DefaultContext } from "koa"
import room from './room'
import { User, Signal } from "./types"
import { generateUUID } from "./utils"

const router = new Router<DefaultState, DefaultContext>()

router.all('/room/:name', async ctx => {
    const ws = ctx.websocket
    const name = ctx.params.name
    const id = generateUUID()
    const user: User = { id, name, ws }

    console.log('soochara connected:', name)

    ws.on('close', (message: any) => {
        room.removeUser(user)
        console.log('soochara disconnected:', user.name, message)
    })

    ws.on('error', (message: any) => {
        console.log('something happened!', message)
    })

    ws.on('message', (message: string) => {
        console.log('signal!', message)
        const signal: Signal = JSON.parse(message) as Signal
        if (!signal.username || !signal.timestamp) {
            throw new Error('wrong message format!')
        }

        console.log('signal!', message)
        room.challenge(signal)
    })

    room.addUser(user)
})

export default router