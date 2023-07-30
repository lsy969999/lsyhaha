import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./userAccount.entity";

@Entity({name: 'TB_USER'})
export class User extends CommonEntity{
    @PrimaryGeneratedColumn({name: 'USER_SN'})
    userSn: number;

    @Column({name: 'NAME'})
    name: string;

    @Column({name: 'CI'})
    ci: string;

    @OneToMany(type=>UserAccount, (userAccount)=>userAccount.user)
    userAccount: UserAccount
}