import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserAccountRepository } from './repository/userAccount.repository';
import { UserAccountTokenRepository } from './repository/userAccountToken.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Token } from './type/Token';
import { SingUpDTO } from './dto/signUp.dto';
import { DelStatus } from 'src/common/common.entity';
import { Provider } from './entity/userAccount.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private userAccountRepository: UserAccountRepository,
        private userAccountTokenRepository: UserAccountTokenRepository,
        private jwtService: JwtService,
        private dataSource: DataSource,
    ){}

    async signUp(signUpDTO: SingUpDTO): Promise<Token>{
        /**
         * 1. email 중복체크
         * 2. user 생성
         * 3. userAccount 생성
         * 4. tokengenerate
         * 5. userAccountToken 생성
         */
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect()
        await queryRunner.startTransaction()
        // let token;
        try {
            const {email, name, nickName, password, provider} = signUpDTO
            //(*1)
            this.userAccountRepository.count({where:{email, provider, delStatus: DelStatus.N,}})
    
            //(*2)
            const user = await this.userRepository.create({name, nickName})
    
            //(*3)
            const userAccount = this.userAccountRepository.create({user, email, provider, password})
    
            //(*4)
            const token = this.getTokens(userAccount.userAccountSn, userAccount.email, userAccount.provider)
        
            //(*5)
            const userAccountToken = this.userAccountTokenRepository.create({userAccount, })
            return token
        } catch (err) {
            await queryRunner.rollbackTransaction()
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            await queryRunner.release();
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
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

    async getTokens(userSn: number, email: string, provider: Provider): Promise<Token>{
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userSn,
                    email,
                    provider
                },
                {
                    secret: 'at-secret',
                    expiresIn: 60*15,
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userSn,
                    email,
                    provider
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
