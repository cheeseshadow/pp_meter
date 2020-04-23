import { RoomUpdate } from "../room/types"
import { ContextUpdate } from "../context/types"

export type Update = {
    type: UpdateType
    data: RoomUpdate | ContextUpdate | Init
}

export type Init = {
    id: string
}

export enum UpdateType {
    Context = 'Context',
    Room = 'Room',
    Init = 'Init'
}