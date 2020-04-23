import { NameDto } from "../types"
import User from "../user/user"

export enum RoomState {
    Idle = 'Idle',
    InProgress = 'InProgress'
}

export type QueueEntry = {
    user: User,
    timestamp: number
}

export type QueueEntryDto = {
    id: string,
    name: string,
    timestamp: number
}

export type RoomUpdate = {
    id: string,
    state: RoomState
    host: NameDto,
    users: NameDto[],
    queue: NameDto[],
}

export type RoomSignal = {
    id: string,
    userId: string,
    timestamp: number,
    action: RoomAction
}

export enum RoomAction {
    Queue = 'Queue',
    Unqueue = 'Unqueue'
}