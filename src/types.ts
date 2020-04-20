export type User = {
    ws: WebSocket
    name: string
}

export type Update = {
    users: string[],
    current: string | undefined
}

export type Signal = {
    username: string,
    timestamp: Number
}