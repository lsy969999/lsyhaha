import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import {Provider} from '@prisma/client'
import { ApiProperty } from "@nestjs/swagger"

export class SingUpDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(Provider)
    provider: Provider

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    providerId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nickName: string
}