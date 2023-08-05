export class RVO<T> {
    message: string;
    code: RVOCode
    data: T;

    static Gen <T> (message: string, code: RVOCode, data: T): RVO<T>{
        const rvo = new RVO<T>()
        rvo.message = message
        rvo.code = code
        rvo.data = data
        return rvo
    }
}

export enum RVOCode {
    OK = '0000'
}