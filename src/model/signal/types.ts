import { ContextSignal } from "../context/types"
import { RoomSignal } from "../room/types"

export type Signal = {
    type: SignalType,
    data: ContextSignal | RoomSignal
}

export enum SignalType {
    Context = 'Context',
    Room = 'Room'
}