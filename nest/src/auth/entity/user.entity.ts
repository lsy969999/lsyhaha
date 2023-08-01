import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./userAccount.entity";

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    IN_ACTIVE = 'IN_ACTIVE',
}

@Entity({name: 'TB_USER'})
export class User extends CommonEntity{
    @PrimaryGeneratedColumn({name: 'USER_SN'})
    userSn: number;

    @OneToMany(type=>UserAccount, (userAccount)=>userAccount.user)
    userAccount: UserAccount[]

    @Column({name: 'NAME'})
    name: string;

    @Column({name: 'NICK_NAME'})
    nickName: string;

    @Column({name: 'CI', nullable: true})
    ci: string;

    @Column({name: 'USER_STATUS', default: UserStatus.ACTIVE})
    userStatus: UserStatus;
}