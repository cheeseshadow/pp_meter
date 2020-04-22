import { NameDto } from "../types"

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