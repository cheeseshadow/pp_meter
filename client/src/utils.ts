export const send = (ws: WebSocket, message: any) => {
    ws.send(JSON.stringify(message))
}

export const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()

    return `${hours}:${minutes}:${seconds}.${milliseconds}`
}