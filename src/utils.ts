import { HasId, HasName } from "./model/interfaces"
import { NameDto } from "./model/types"

export const generateUUID = () => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

export const removeFromArray = (array: any[], element: any, callback?: Function | undefined) => {
    const index = array.indexOf(element)
    if (index !== -1) {
        array.splice(index, 1)
        callback && callback()
    }
}

export const convertToNameDto = <T extends HasId & HasName>(thing: T): NameDto => {
    return {
        id: thing.id,
        name: thing.name
    }
}