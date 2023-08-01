import { IsNotEmpty, IsString } from "class-validator"
import { Provider } from "../entity/userAccount.entity"

export class SingUpDTO {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    provider: Provider

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    nickName: string
}