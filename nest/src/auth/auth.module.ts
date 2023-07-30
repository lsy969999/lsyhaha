import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAccount } from './entity/userAccount.entity';
import { User } from './entity/user.entity';
import { UserAccountToken } from './entity/userAccountToken.entity';
import { UserRepository } from './repository/user.repository';
import { UserAccountRepository } from './repository/userAccount.repository';
import { UserAccountTokenRepository } from './repository/userAccountToken.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from'@nestjs/jwt'
import * as config from 'config'

const jwtConfig = config.get('jwt') 
@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
        secret: jwtConfig.secret,
        signOptions: {
            expiresIn: 60*5
        }
        }),
        TypeOrmModule.forFeature([User, UserAccount, UserAccountToken])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, UserAccountRepository, UserAccountTokenRepository]
})
export class AuthModule {}
