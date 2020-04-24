import Room from '../room/room'
import User from '../user/user'
import {convertToNameDto, generateUUID, removeFromArray} from "../../utils"
import {ContextAction, ContextSignal, ContextUpdate} from './types'
import {Signal, SignalType} from '../signal/types'
import {Update, UpdateType} from '../update/types'

class Context {
    private readonly rooms: Room[]
    private readonly users: User[]

    constructor() {
        this.rooms = []
        this.users = []
    }

    public update(users?: User[]) {
        const updateData: ContextUpdate = {
            rooms: this.rooms.map(room => convertToNameDto(room))
        }

        const update = {type: UpdateType.Context, data: updateData};

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
        removeFromArray(this.rooms, room, () => this.update())
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
                const {action, roomId} = contextSignal

                if (action === ContextAction.Create) {
                    this.createRoom(contextSignal.roomId, user)
                } else if (action === ContextAction.Join) {
                    const room = this.rooms.find(room => room.id === roomId)
                    room && room.addUser(user)
                    this.update()
                }
            }
        }

        user.addMessageCallback((signal: Signal) => signalHandler(signal))
    }

    private createRoom(name: string, host: User) {
        const room = new Room(generateUUID(), name, host)
        this.addRoom(room)
        room.addUser(host)
        room.update()
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