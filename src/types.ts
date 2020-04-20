export type User = {
    id: string
    name: string
    ws: WebSocket
}

export type UserDto = {
    id: string
    name: string
}

export type Update = {
    users: UserDto[],
    current: string | undefined
}

export type Signal = {
    username: string,
    timestamp: Number
}