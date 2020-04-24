import { HasId, HasName } from "../interfaces"
import { Signal } from "../signal/types"
import { Update } from "../update/types"
import { removeFromArray } from "../../utils"
import Room from "../room/room"

export default class User implements HasId, HasName {
    id: string
    name: string
    room: Room | undefined
    ws: any //WebSocket

    onCloseCallbacks: Function[] = []
    onMessageCallbacks: Function[] = []
    onErrorCallbacks: Function[] = []

    constructor(id: string, name: string, ws: WebSocket) {
        this.id = id
        this.name = name
        this.ws = ws

        this.initWS()
    }

    public update(update: Update) {
        this.ws.send(JSON.stringify(update))
    }

    public addCloseCallback(callback: Function) {
        this.onCloseCallbacks.push(callback)
    }

    public removeCloseCallback(callback: Function) {
        removeFromArray(this.onCloseCallbacks, callback)
    }

    public addErrorCallback(callback: Function) {
        this.onErrorCallbacks.push(callback)
    }

    public removeErrorCallback(callback: Function) {
        removeFromArray(this.onErrorCallbacks, callback)
    }

    public addMessageCallback(callback: Function): Function {
        this.onMessageCallbacks.push(callback)
        return () => removeFromArray(this.onMessageCallbacks, callback)

    }

    public removeMessageCallback(callback: Function) {
        removeFromArray(this.onMessageCallbacks, callback)
    }

    private initWS() {
        this.ws.on('close', (message: any) => {
            this.applyCallbacks(this.onCloseCallbacks, message)
            console.log('soochara disconnected:', this.name, message)
        })

        this.ws.on('message', (message: any) => {
            const signal: Signal = JSON.parse(message) as Signal
            if (!signal.type) {
                throw new Error('wrong message format!')
            }

            this.applyCallbacks(this.onMessageCallbacks, signal)
        })

        this.ws.on('error', (message: any) => {
            this.applyCallbacks(this.onErrorCallbacks, message)
            console.log('something happened!', this.name, message)
        })
    }

    private applyCallbacks(callbacks: Function[], message: any) {
        callbacks.forEach(callback => callback(message))
    }


}