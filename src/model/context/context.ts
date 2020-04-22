import Room from '../room/room'
import User from '../user/user'
import { convertToNameDto, removeFromArray, generateUUID } from "../../utils"
import { ContextUpdate, ContextSignal, ContextAction } from './types'
import { Signal, SignalType } from '../signal/types'
import { UpdateType } from '../update/types'

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

    public update() {
        const update: ContextUpdate = {
            rooms: this.rooms.map(room => convertToNameDto(room))
        }
        this.users.forEach(user => user.update({ type: UpdateType.Context, data: update }))
    }

    public addUser(user: User) {
        if (!this.users.includes(user)) {
            this.users.push(user)
            this.initUser(user)
            this.update()
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
        removeFromArray(this.rooms, room, this.update)
    }

    private initUser(user: User) {
        this.initOnClose(user)
        this.initOnMessage(user)
    }

    private initOnMessage(user: User) {
        const signalHandler = (signal: Signal) => {
            if (signal.type !== SignalType.Context) {
                throw new Error('Wrong signal type!')
            }

            const contextSignal = signal.data as ContextSignal
            const { action, roomId } = contextSignal

            if (action === ContextAction.Create) {

                const room = new Room(generateUUID(), roomId, user)
                this.addRoom(room)

            } else if (action === ContextAction.Join) {

                const room = this.rooms.find(room => room.id === roomId)
                room && room.addUser(user)
                this.update()

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