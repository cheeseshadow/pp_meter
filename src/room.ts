import { User, Update, Signal } from "./types"

class Room {
    id: string
    users: User[]
    current: string | undefined

    constructor() {
        this.id = 'soochara'
        this.users = []
    }

    public challenge(signal: Signal) {
        if (this.current) {
            console.log(`Tried so hard, but got so far! ${signal.username} ${this.current}`)
            return
        }

        this.current = signal.username
        console.log(`Did it! ${signal.username} ${signal.timestamp}`)
        this.update()
    }

    public addUser(user: User) {
        if (!this.users.includes(user)) {
            this.users.push(user)
            this.update()
        }

    }

    public removeUser(user: User) {
        const index = this.users.indexOf(user)
        if (index !== -1) {
            this.users.splice(index, 1)
            this.update()
        }

    }

    public update() {
        const update: Update = {
            users: this.users.map(user => { return { id: user.id, name: user.name } }),
            current: this.current
        }

        this.users.forEach(user => {
            user.ws.send(JSON.stringify(update))
        })
    }
}

export default new Room()