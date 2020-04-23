import User from "../user/user"
import { convertToNameDto } from "../../utils"
import { HasName, HasId } from "../interfaces"
import { QueueEntry, QueueEntryDto, RoomState, RoomUpdate, RoomSignal } from "./types"
import { UpdateType } from "../update/types"

export default class Room implements HasName, HasId {
    id: string
    name: string
    host: User
    users: User[]
    queue: QueueEntry[]
    state: RoomState

    constructor(id: string, name: string, host: User) {
        this.id = id
        this.name = name
        this.host = host
        this.users = []
        this.queue = []
        this.state = RoomState.Idle

        this.users.push(host)
        this.update()
    }

    public setState(state: RoomState, userId: string) {
        if (userId !== this.host.id) {
            console.warn('Attempt to change the room state by a player')
            return
        }

        this.state = state
        this.update()
    }

    public clearQueue() {
        this.queue.length = 0
        this.update()
    }

    public addToQueue(signal: RoomSignal) {
        if (this.state !== RoomState.InProgress) {
            console.warn('Attempt to add to the queue when the room is idle')
            return
        }

        const user = this.getUser(signal.userId)
        const entry = this.getEntry(signal.userId)

        if (!entry) {
            this.queue.push({ user, timestamp: signal.timestamp })
            this.update()
        }
    }

    public removeFromQueue(userId: string) {
        if (this.state !== RoomState.InProgress) {
            console.warn('Attempt to remove from the queue when the room is idle')
            return
        }

        const entry = this.getEntry(userId)

        if (entry) {
            this.queue.splice(this.queue.indexOf(entry), 1)
            this.update()
        }
    }

    public clearRoom() {
        this.users.forEach(user => user.room = undefined)
        this.users.length = 0
        this.update()
    }

    public addUser(user: User) {
        if (!this.users.includes(user)) {
            this.users.push(user)
            user.room = this
            this.update()
        }
    }

    public removeUser(user: User) {
        const index = this.users.indexOf(user)
        if (index !== -1) {
            user.room = undefined
            this.users.splice(index, 1)
            this.update()
        }

    }

    public update() {
        const update: RoomUpdate = {
            id: this.id,
            state: this.state,
            host: convertToNameDto(this.host),
            users: this.users.map(user => convertToNameDto(user)),
            queue: this.queue.map(entry => {
                const dto = convertToNameDto(entry.user) as QueueEntryDto
                dto.timestamp = entry.timestamp
                return dto
            })
        }

        this.users.forEach(user => {
            user.update({ type: UpdateType.Room, data: update })
        })
    }

    private getEntry(userId: string): QueueEntry | undefined {
        return this.queue.find(entry => entry.user.id === userId)
    }

    private getUser(userId: string): User {
        const user = this.users.find(user => user.id === userId)
        if (!user) {
            throw new Error(`No user with id ${userId} in the room ${this.id}`)
        }

        return user
    }
}