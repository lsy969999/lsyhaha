import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserAccountRepository } from './repository/userAccount.repository';
import { UserAccountTokenRepository } from './repository/userAccountToken.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Token } from './type/Token';
import { SingUpDTO } from './dto/signUp.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private userAccountRepository: UserAccountRepository,
        private userAccountTokenRepository: UserAccountTokenRepository,
        private jwtService: JwtService
    ){}

    async signUp(signUpDTO: SingUpDTO): Promise<Token>{
        /**
         * 1. email 중복체크
         * 2. user 생성
         * 3. userAccount 생성
         * 4. tokengenerate
         * 5. userAccountToken 생성
         */
        return {accessToekn:'', refreshToekn: ''}
    }

    async signIn(){
        /**
         * 1. signInDto
         * 2. 
         */
    }

    async withdrawl(){

    }

    async createAccessToken(){

    }

    async createRefreshToken(){

    }

    async getTokens(userSn: number, email: string): Promise<Token>{
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userSn,
                    email
                },
                {
                    secret: 'at-secret',
                    expiresIn: 60*15,
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userSn,
                    email
                },
                {
                    secret: 'rt-secret',
                    expiresIn: 60*60*24*7,
                }
            )
        ])
        return{
            accessToekn: at,
            refreshToekn: rt,
        }
    }

    private hashData(data: string){
        return bcrypt.hashData(data, 10)
    }

    async emailValidation(eamil: string){

    }
}
