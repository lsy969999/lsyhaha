import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserAccountRepository } from './repository/userAccount.repository';
import { UserAccountTokenRepository } from './repository/userAccountToken.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,
        private userAccountRepository: UserAccountRepository,
        private uerAccountTokenRepository: UserAccountTokenRepository){}
}
