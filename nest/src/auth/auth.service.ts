import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Token } from './type/Token';
import { SingUpDTO } from './dto/signUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Provider, UserAccount } from '@prisma/client';
import { singInDTO } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        
    ){}

    async tests(): Promise<UserAccount[]>{
        return this.prisma.userAccount.findMany()
    }

    async signUp(signUpDTO: SingUpDTO): Promise<Token>{
        const {email, name, nickName, password, provider, providerId} = signUpDTO
        return await this.prisma.$transaction<Token>(async (tx)=>{
             /**
             * 1. email 중복체크
             * 2. user 생성
             * 3. userAccount 생성
             * 4. tokengenerate
             * 5. userAccountToken 생성
             */

             //(*1)
            const dupCnt = await tx.userAccount.count({
                where: {
                    AND:[
                        {email},
                        {provider},
                        {delStatus: 'N'}
                    ]
                }
            });
            if(dupCnt){
                throw new HttpException('eamil duplicated', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            //(*2)
            const user = await tx.user.create({
                data:{
                    name,
                    nickName,
                    updateBy: 1,
                    createBy: 1
                }
            })

            //(*3)
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)
            const userAccount = await tx.userAccount.create({
                data: {
                    email,
                    password: hashedPassword,
                    provider,
                    providerId,
                    user: {
                        connect: user
                    },
                    createBy: 1,
                    updateBy: 1,
                }
            })

            //(*4)
            const refExpiresIn = 60*60*10
            const accToken = await this.getAccToken(userAccount.userAccountSn, userAccount.email, userAccount.provider, 60*60);
            const refToken = await this.getRefToken(userAccount.userAccountSn, userAccount.email, userAccount.provider, refExpiresIn);
            const hashedRefreshToken = this.hashData(refToken)
            //(*5)
            const userAccountToken = await tx.userAccountToken.create({
                data: {
                    createBy: 1,
                    updateBy: 1,
                    hashedRefreshToken,
                    expiresIn: new Date().getTime() + refExpiresIn,
                    userAccount: {
                        connect: userAccount
                    }
                }
            })

            return {
                accessToekn: accToken,
                refreshToken: refToken
            }
        })
    }

    async signIn(singInDTO: singInDTO): Promise<Token>{
        const acc = await this.prisma.userAccount.findFirst({
            where: {
                AND:[
                    {
                        email: singInDTO.email
                    },
                    {
                        delStatus: 'N'
                    }
                ]
            }
        })

        if(!acc){
            throw new HttpException('no user', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        if(! await bcrypt.compare(singInDTO.password, acc.password)){
            throw new HttpException('password not match', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
        const refExpiresIn = 60*60*10
        const accToken = await this.getAccToken(acc.userAccountSn, acc.email, acc.provider, 60*60);
        const refToken = await this.getRefToken(acc.userAccountSn, acc.email, acc.provider, refExpiresIn);
        const hashedRefreshToken = this.hashData(refToken)
        
        const userAccountToken = await this.prisma.userAccountToken.create({
            data: {
                createBy: 1,
                updateBy: 1,
                hashedRefreshToken,
                expiresIn: new Date().getTime() + refExpiresIn,
                userAccount: {
                    connect: acc
                }
            }
        })

        return {
            accessToekn: accToken,
            refreshToken: refToken
        }
    }

    // async signIn(){
    //     /**
    //      * 1. signInDto
    //      * 2. 
    //      */
    // }

    // async withdrawl(){

    // }

    // async createAccessToken(){

    // }

    // async createRefreshToken(){

    // }

    async getAccToken(userSn: number, email: string, provider: Provider, expiresIn: number): Promise<string>{
        return this.jwtService.signAsync(
            {
                sub: userSn,
                email,
                provider
            },
            {
                secret: 'at-secret',
                expiresIn,
            }
        )
    }

    async getRefToken(userSn: number, email: string, provider: Provider, expiresIn: number): Promise<string>{
        return this.jwtService.signAsync(
            {
                sub: userSn,
                email,
                provider
            },
            {
                secret: 'at-secret',
                expiresIn,
            }
        )
    }

    // async getTokens(userSn: number, email: string, provider: Provider, expiresIn: number): Promise<Token>{
    //     const [at, rt] = await Promise.all([
    //         this.jwtService.signAsync(
    //             {
    //                 sub: userSn,
    //                 email,
    //                 provider
    //             },
    //             {
    //                 secret: 'at-secret',
    //                 expiresIn: 60*15,
    //             }
    //         ),
    //         this.jwtService.signAsync(
    //             {
    //                 sub: userSn,
    //                 email,
    //                 provider
    //             },
    //             {
    //                 secret: 'rt-secret',
    //                 expiresIn: 60*60*24*7,
    //             }
    //         )
    //     ])
    //     return{
    //         accessToekn: at,
    //         refreshToekn: rt,
    //     }
    // }

    private hashData(data: string){
        return bcrypt.hashSync(data, 10)
    }

    // async emailValidation(eamil: string){

    // }
}
