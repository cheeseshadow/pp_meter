import Router from "koa-router"
import { DefaultState, DefaultContext } from "koa"
import context from './model/context/context'
import { generateUUID } from "./utils"
import User from "./model/user/user"

const router = new Router<DefaultState, DefaultContext>()

router.all('/lobby/:name', async ctx => {
    const ws = ctx.websocket
    const name = ctx.params.name
    console.log('gay', ctx.params)
    const id = generateUUID()
    const user: User = new User(id, name, ws)

    console.log('soochara connected:', name)

    context.addUser(user)
})

export default router