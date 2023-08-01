import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './type/Token';
import { RVO } from 'src/common/ApiResponse.dto';
import { SingUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("signup")
    async signUp(@Body(ValidationPipe) signUpDTO: SingUpDTO): Promise<RVO<Token>>{
        const token = await this.authService.signUp(signUpDTO)
        return RVO.Gen('', token);
    }

    @Post("signin")
    signIn(){

    }

    @Post("signout")
    signOut(){

    }

    @Post("withdrawl")
    withdrawl(){

    }

    @Post("refresh")
    refresh(){

    }

    @Get("emailValidation")
    emailValidation(){

    }
}