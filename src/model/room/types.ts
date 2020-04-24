import {NameDto} from "../types"
import User from "../user/user"
import {UserDto} from "../user/types";

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
    users: UserDto[],
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
    Unqueue = 'Unqueue',
    StartRound = 'StartRound',
    EndRound = 'EndRound',
    AcceptAnswer = 'AcceptAnswer',
    RejectAnswer = 'RejectAnswer'
}