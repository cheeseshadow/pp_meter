import Room from '../room/room'
import User from '../user/user'
import { convertToNameDto, removeFromArray, generateUUID } from "../../utils"
import { ContextUpdate, ContextSignal, ContextAction } from './types'
import { Signal, SignalType } from '../signal/types'
import { UpdateType, Update } from '../update/types'

class Context {
    private rooms: Room[]
    private users: User[]

    constructor() {
        this.rooms = []
        this.users = []
    }

    public createRoom(id: string, name: string, host: User): Room {
        const room = new Room(id, name, host)
        this.rooms.push(room)

        return room
    }

    public update(users?: User[]) {
        const updateData: ContextUpdate = {
            rooms: this.rooms.map(room => convertToNameDto(room))
        }

        const update = { type: UpdateType.Context, data: updateData };

        (users || this.users)
            .filter(user => !user.room)
            .forEach(user => user.update(update))
    }

    public addUser(user: User) {
        if (!this.users.includes(user)) {
            this.users.push(user)
            this.initUser(user)
            this.update([user])
        }
    }

    public removeUser(user: User) {
        removeFromArray(this.users, user, () => {
            this.rooms.forEach(room => {
                if (room.host === user) {
                    this.removeRoom(room)
                } else {
                    room.removeUser(user)
                }
            })
        })
    }

    private addRoom(room: Room) {
        this.rooms.push(room)
        this.update()
    }

    private removeRoom(room: Room) {
        const users = room.users
        room.clearRoom()
        removeFromArray(this.rooms, room, this.update)
        this.update(users)
    }

    private initUser(user: User) {
        const update: Update = {
            type: UpdateType.Init,
            data: {
                id: user.id
            }
        }
        user.update(update)

        this.initOnClose(user)
        this.initOnMessage(user)
    }

    private initOnMessage(user: User) {
        const signalHandler = (signal: Signal) => {
            if (signal.type === SignalType.Context) {
                const contextSignal = signal.data as ContextSignal
                const { action, roomId } = contextSignal

                if (action === ContextAction.Create) {

                    const room = new Room(generateUUID(), roomId, user)
                    this.addRoom(room)
                    room.update()

                } else if (action === ContextAction.Join) {

                    const room = this.rooms.find(room => room.id === roomId)
                    room && room.addUser(user)
                    this.update()

                }
            }
        }

        user.addMessageCallback(signalHandler)
    }

    private initOnClose(user: User) {
        const closeHandler = () => {
            this.removeUser(user)
            user.removeCloseCallback(closeHandler)
        }

        user.addCloseCallback(closeHandler)
    }
}

export default new Context()