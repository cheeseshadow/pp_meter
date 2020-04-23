export const send = (ws: WebSocket, message: any) => {
    ws.send(JSON.stringify(message))
}