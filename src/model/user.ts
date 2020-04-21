import { HasId, HasName } from "./interfaces"

export default class User implements HasId, HasName {
    id: string
    name: string
    ws: WebSocket

    constructor(id: string, name: string, ws: WebSocket) {
        this.id = id
        this.name = name
        this.ws = ws
    }

}