import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAccount } from "./userAccount.entity";

@Entity()
export class User extends CommonEntity{
    @PrimaryGeneratedColumn()
    userSn: number;

    @Column()
    name: string;

    @Column()
    ci: string;

    @OneToOne(type=>UserAccount, (userAccount)=>userAccount.user)
    // @JoinColumn()
    userAccount: UserAccount
}