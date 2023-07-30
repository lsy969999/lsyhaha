import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { UserAccountToken } from "./userAccountToken.entity";

@Entity()
export class UserAccount extends CommonEntity{
    @PrimaryGeneratedColumn()
    userAccountSn: number;

    @OneToOne(type=>User, user=>user.userAccount)
    @JoinColumn()
    user: User;

    @OneToMany(type=>UserAccountToken, userAccountToken=>userAccountToken.userAccountTokenSn, {eager: true})
    userAccountToken: UserAccountToken[];

    @Column()
    email: string;

    @Column()
    password: string;
}