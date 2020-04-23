export type Update = {
    type: UpdateType
    data: RoomUpdate | ContextUpdate
}

export enum UpdateType {
    Context = 'Context',
    Room = 'Room'
}

export type RoomUpdate = {
    state: RoomState
    users: NameDto[],
    queue: NameDto[],
}

export type RoomSignal = {
    userId: string,
    timestamp: number,
    action: RoomAction
}

export enum RoomAction {
    Queue = 'Queue',
    Unqueue = 'Unqueue'
}

export enum RoomState {
    Idle = 'Idle',
    InProgress = 'InProgress'
}

export type ContextUpdate = {
    rooms: NameDto[]
}

export type ContextSignal = {
    roomId: string,
    action: ContextAction
}

export enum ContextAction {
    Create = 'Create',
    Join = 'Join'
}

export type NameDto = {
    id: string
    name: string
}