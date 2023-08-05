import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from'@nestjs/jwt'
import * as config from 'config'
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

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
        PrismaModule
        // TypeOrmModule.forFeature([User, UserAccount, UserAccountToken])
    ],
    controllers: [AuthController],
    providers: [AuthService, ]//UserRepository, UserAccountRepository, UserAccountTokenRepository
})
export class AuthModule {}
