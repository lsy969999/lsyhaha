import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from './type/Token';
import { RVO, RVOCode } from 'src/common/ApiResponse.dto';
import { SingUpDTO } from './dto/signUp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get('test')
    async test(){
        return this.authService.tests()
    }

    @Post("signup")
    async signUp(@Body(ValidationPipe) signUpDTO: SingUpDTO): Promise<RVO<Token>>{
        const token = await this.authService.signUp(signUpDTO)
        return RVO.Gen('생성됐습니다.', RVOCode.OK, token);
    }

    // @Post("signin")
    // signIn(){

    // }

    // @Post("signout")
    // signOut(){

    // }

    // @Post("withdrawl")
    // withdrawl(){

    // }

    // @Post("refresh")
    // refresh(){

    // }

    // @Get("emailValidation")
    // emailValidation(){

    // }
}