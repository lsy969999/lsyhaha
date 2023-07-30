import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./userAccount.entity";

@Entity({name: 'TB_USER_ACCOUNT_TOKEN'})
export class UserAccountToken extends CommonEntity{
    @PrimaryGeneratedColumn({name: 'USER_ACCOUNT_TOKEN_SN'})
    userAccountTokenSn: number;

    @ManyToOne(type=>UserAccountToken, userAccount=>userAccount.userAccountTokenSn)
    @JoinColumn({name: 'USER_ACCOUNT_SN'})
    userAccount: UserAccount

    @Column({name: 'ACCESS_TOKEN'})
    accessToken: string;

    @Column({name: 'REFRESH_TOKEN'})
    refreshToken :string;
}