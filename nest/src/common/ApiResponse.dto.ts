export class RVO<T> {
    message: string
    data: T

    static Gen <T> (message: string, data: T): RVO<T>{
        const rvo = new RVO<T>()
        rvo.message = message
        rvo.data = data
        return rvo
    }
}