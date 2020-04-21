export type NameDto = {
    id: string
    name: string
}

export type QueueEntryDto = {
    id: string,
    name: string,
    timestamp: number
}

export type ContextUpdate = {
    rooms: NameDto[]
}

export enum RoomState {
    Idle = 'Idle',
    InProgress = 'InProgress'
}

export type RoomUpdate = {
    state: RoomState
    users: NameDto[],
    queue: NameDto[],
}

export enum SignalType {
    Queue,
    Unqueue
}

export type UserSignal = {
    type: SignalType,
    userId: string,
    timestamp: number
}