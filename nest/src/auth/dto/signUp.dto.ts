import { IsNotEmpty, IsString } from "class-validator"
import {Provider} from '@prisma/client'

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
    providerId: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    nickName: string
}