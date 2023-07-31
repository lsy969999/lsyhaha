import { Provider } from "../entity/userAccount.entity"

export class SingUpDTO {
    email: string
    password: string
    provider: Provider
    name: string
    nickName: string
}