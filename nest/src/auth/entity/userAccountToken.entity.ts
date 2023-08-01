import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./userAccount.entity";

@Entity({name: 'TB_USER_ACCOUNT_TOKEN'})
export class UserAccountToken extends CommonEntity{
    @PrimaryGeneratedColumn({name: 'USER_ACCOUNT_TOKEN_SN'})
    userAccountTokenSn: number;

    @ManyToOne(type=>UserAccount, userAccount=>userAccount.userAccountToken)
    @JoinColumn({name: 'USER_ACCOUNT_SN'})
    userAccount: UserAccount;

    @Column({name: 'HASHED_REFRESH_TOKEN'})
    hashedRefreshToken :string;

    // @Column({name: 'REFRESH_TOKEN_EXPIRES_IN'})
    // refreshTokenExpiresIn: number;
}