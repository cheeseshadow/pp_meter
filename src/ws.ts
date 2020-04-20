import Router from "koa-router"
import { DefaultState, DefaultContext } from "koa"
import room from './room'
import { User, Signal } from "./types"

const router = new Router<DefaultState, DefaultContext>()

router.all('/room/:name', async ctx => {
    const ws = ctx.websocket
    const name = ctx.params.name
    const user: User = { name, ws }

    console.log('soochara', name)

    ws.on('close', (message: any) => {
        room.removeUser(user)
        console.log('it closed!', message)
    })

    ws.on('error', (message: any) => {
        console.log('something happened!', message)
    })

    ws.on('message', (message: string) => {
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