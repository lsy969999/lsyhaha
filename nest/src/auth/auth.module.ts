import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from'@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
        secret: process.env.JWT_SECRET,
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
