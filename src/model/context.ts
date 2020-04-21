import Room from './room'
import { ContextUpdate } from '../types'
import User from './user'
import { convertToNameDto } from "../utils"

class Context {
    private rooms: Room[]

    constructor() {
        this.rooms = []
    }

    public createRoom(id: string, name: string, host: User): Room {
        const room = new Room(id, name, host)
        this.rooms.push(room)

        return room
    }

    public update() {
        const update: ContextUpdate = {
            rooms: this.rooms.map(room => convertToNameDto(room))
        }

        this.users.forEach(user => {
            user.ws.send(JSON.stringify(update))
        })
    }
}