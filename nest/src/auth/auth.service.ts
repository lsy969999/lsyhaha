import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Token } from './type/Token';
import { SingUpDTO } from './dto/signUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAccount } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        // private userRepository: UserRepository,
        // private userAccountRepository: UserAccountRepository,
        // private userAccountTokenRepository: UserAccountTokenRepository,
        private jwtService: JwtService,
        // private dataSource: DataSource,
        private prisma: PrismaService,
    ){}

    async tests(): Promise<UserAccount[]>{
        return this.prisma.userAccount.findMany()
    }

    // async signUp(signUpDTO: SingUpDTO): Promise<Token>{
    //     /**
    //      * 1. email 중복체크
    //      * 2. user 생성
    //      * 3. userAccount 생성
    //      * 4. tokengenerate
    //      * 5. userAccountToken 생성
    //      */
    //     const queryRunner = this.dataSource.createQueryRunner();

    //     await queryRunner.connect()
    //     await queryRunner.startTransaction()
    //     // let token;
    //     try {
    //         const {email, name, nickName, password, provider} = signUpDTO
    //         //(*1)
    //         const dupCnt = await this.userAccountRepository.count({where:{email, provider, delStatus: DelStatus.N,}})
    //         if(dupCnt){
    //             throw new HttpException('eamil duplicated', HttpStatus.INTERNAL_SERVER_ERROR)
    //         }
    
    //         //(*2)
    //         const user = await this.userRepository.create({name, nickName})
    //         await this.userRepository.save(user)

    //         //(*3)
    //         const salt = await bcrypt.genSalt();
    //         const hashedPassword = await bcrypt.hash(password, salt)
    //         const userAccount = this.userAccountRepository.create({user, email, provider, password: hashedPassword})
    //         await this.userAccountRepository.save(userAccount)
    
    //         //(*4)
    //         const token = await this.getTokens(userAccount.userAccountSn, userAccount.email, userAccount.provider)
            
    //         const hashedRefreshToken = this.hashData(token.refreshToekn)
        
    //         //(*5)
    //         const userAccountToken = this.userAccountTokenRepository.create({userAccount, hashedRefreshToken,})
    //         await this.userAccountTokenRepository.save(userAccountToken)

    //         await queryRunner.commitTransaction()
    //         return token
    //     } catch (err) {
    //         await queryRunner.rollbackTransaction()
    //         console.error('signUp', err)
    //         throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    //     } finally {
    //         await queryRunner.release();
    //         //throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

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

    // async getTokens(userSn: number, email: string, provider: Provider): Promise<Token>{
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

    // private hashData(data: string){
    //     return bcrypt.hashSync(data, 10)
    // }

    // async emailValidation(eamil: string){

    // }
}
