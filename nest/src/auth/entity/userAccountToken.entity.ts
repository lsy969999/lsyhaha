import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAccountToken extends CommonEntity{
    @PrimaryGeneratedColumn()
    userAccountTokenSn: number;

    @Column()
    accesToken: string;

    @Column()
    refreshToken :string;
}