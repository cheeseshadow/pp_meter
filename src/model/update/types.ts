import { RoomUpdate } from "../room/types"
import { ContextUpdate } from "../context/types"

export type Update = {
    type: UpdateType
    data: RoomUpdate | ContextUpdate
}

export enum UpdateType {
    Context = 'Context',
    Room = 'Room'
}