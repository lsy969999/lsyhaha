import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserAccountToken } from "./userAccountToken.entity";

export enum Provider {
    GUEST = 'GUEST',
    EMAIL = 'EMAIL',
    GOOGLE = 'GOOGLE',
    KAKAO = 'KAKAO',
    NAVER = 'NAVER',
}

@Entity({name: 'TB_USER_ACCOUNT'})
// @Index(['email','provider','delStatus'], {unique: true})
export class UserAccount extends CommonEntity{
    @PrimaryGeneratedColumn({name: 'USER_ACCOUNT_SN'})
    userAccountSn: number;

    @ManyToOne(type=>User, user=>user.userAccount)
    @JoinColumn({name: 'USER_SN'})
    user: User;

    @OneToMany(type=>UserAccountToken, userAccountToken=>userAccountToken.userAccount)
    userAccountToken: UserAccountToken[];

    @Column({name: 'EMAIL'})
    email: string;

    @Column({name: 'PASSWORD'})
    password: string;

    @Column({name: 'PROVIDER'})
    provider: Provider;

    @Column({name: 'PROVIDER_ID', nullable: true})
    providerId: string;
}