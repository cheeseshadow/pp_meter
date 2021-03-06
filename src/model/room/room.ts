import User from "../user/user"
import {convertToNameDto, removeFromArray} from "../../utils"
import {HasId, HasName} from "../interfaces"
import {QueueEntry, QueueEntryDto, RoomAction, RoomSignal, RoomState, RoomUpdate} from "./types"
import {UpdateType} from "../update/types"
import {Signal, SignalType} from "../signal/types"
import {UserDto} from "../user/types";

export default class Room implements HasName, HasId {
    id: string
    name: string
    host: User
    users: User[] = []
    queue: QueueEntry[] = []
    state: RoomState

    private removeCallbacks: Map<User, Function> = new Map()

    constructor(id: string, name: string, host: User) {
        this.id = id
        this.name = name
        this.host = host
        this.state = RoomState.Idle
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

        if (this.host.id === signal.userId) {
            console.warn('Host attempted to answer the question')
            return
        }

        let user
        try {
            user = this.getUser(signal.userId)
        } catch (error) {
            console.error('Something is wrong with the user who tried to answer', error)
            return
        }

        const entry = this.getEntry(signal.userId)

        if (!entry) {
            this.queue.push({user, timestamp: Date.now()})
            this.update()
        }
    }

    public removeFromQueue(userId?: string) {
        if (this.state !== RoomState.InProgress) {
            console.warn('Attempt to remove from the queue when the room is idle')
            return
        }

        if (this.queue.length === 0) {
            console.warn('Attempt to remove from the empty queue')
            return
        }

        const entry = userId ? this.getEntry(userId) : this.queue[0]

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
            user.score = 0
            this.removeCallbacks.set(user, user.addMessageCallback((signal: Signal) => this.handleUserSignal(signal)))
            this.update()
        }
    }

    public removeUser(user: User) {
        removeFromArray(this.users, user, () => {
            this.removeFromQueue(user.id)

            user.room = undefined
            user.score = 0
            this.removeCallbacks.get(user)!()
            this.removeCallbacks.delete(user)
            this.update()
        })
    }

    public update() {
        const update: RoomUpdate = {
            room: {id: this.id, name: this.name},
            state: this.state,
            host: convertToNameDto(this.host),
            users: this.users.map(user => {
                const dto = convertToNameDto(user) as UserDto
                dto.score = user.score
                return dto
            }),
            queue: this.queue.map(entry => {
                const dto = convertToNameDto(entry.user) as QueueEntryDto
                dto.timestamp = entry.timestamp
                return dto
            })
        }

        this.users.forEach(user => {
            user.update({type: UpdateType.Room, data: update})
        })
    }

    private handleUserSignal(signal: Signal) {
        if (signal.type === SignalType.Room) {
            const data = signal.data as RoomSignal
            switch (data.action) {
                case RoomAction.Queue:
                    this.addToQueue(data)
                    break

                case RoomAction.Unqueue:
                    if (this.host.id === data.userId) {
                        // remove the top user
                        this.removeFromQueue()
                    } else {
                        if (this.queue.length && this.queue[0].user.id === data.userId) {
                            console.warn('Attempt to remove the performer')
                        } else {
                            this.removeFromQueue(data.userId)
                        }
                    }
                    break

                case RoomAction.StartRound:
                    this.setState(RoomState.InProgress, data.userId)
                    break

                case RoomAction.EndRound:
                    this.queue.length = 0
                    this.setState(RoomState.Idle, data.userId)
                    break

                case RoomAction.AcceptAnswer:
                case RoomAction.AcceptHalf:
                case RoomAction.RejectAnswer:
                case RoomAction.RejectHalf:
                    this.handleAnswer(data.action, data.userId)
                    break
            }
        }
    }

    private handleAnswer(action: RoomAction, userId: string) {
        if (![RoomAction.AcceptAnswer, RoomAction.AcceptHalf, RoomAction.RejectAnswer, RoomAction.RejectHalf].includes(action)) {
            console.warn('Am I a joke to you?')
            return
        }

        if (this.state !== RoomState.InProgress || this.queue.length === 0) {
            console.warn('attempt to accept an answer when there is none')
            return
        }


        this.queue[0].user.score += Room.getActionScore(action)

        if (action === RoomAction.AcceptAnswer) {
            this.queue.length = 0
            this.setState(RoomState.Idle, userId)
        } else {
            this.removeFromQueue()
        }
    }

    private static getActionScore(action: RoomAction): number {
        return action === RoomAction.AcceptAnswer ? 2 :
            action === RoomAction.AcceptHalf ? 1 :
                action === RoomAction.RejectHalf ? -1 :
                    action === RoomAction.RejectAnswer ? -2 : 0;
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