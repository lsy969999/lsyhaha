import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserAccountToken } from "./userAccountToken.entity";

@Entity({name: 'TB_USER_ACCOUNT'})
export class UserAccount extends CommonEntity{
    @PrimaryGeneratedColumn({name: 'USER_ACCOUNT_SN'})
    userAccountSn: number;

    @ManyToOne(type=>User, user=>user.userAccount)
    @JoinColumn({name: 'USER_SN'})
    user: User;

    @OneToMany(type=>UserAccountToken, userAccountToken=>userAccountToken.userAccountTokenSn)
    userAccountToken: UserAccountToken[];

    @Column({name: 'EAMIL'})
    email: string;

    @Column({name: 'PASSWORD'})
    password: string;

    @Column({name: 'REGIST_TYPE'})
    registType: string;
}