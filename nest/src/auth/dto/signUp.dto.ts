import { Provider } from "../entity/userAccount.entity"

export class SingUpDTO {
    email: string
    password: string
    registType: Provider
    name: string
    nickName: string
}