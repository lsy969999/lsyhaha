import { BaseEntity, Column } from "typeorm";

export abstract class CommonEntity extends BaseEntity{
    @Column()
    delStatus: string;

    @Column()
    createBy: number;

    @Column()
    modifiedBy: number;

    @Column()
    createAt: Date;

    @Column()
    modifiedAt: Date;
}