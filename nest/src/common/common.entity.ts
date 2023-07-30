import { BaseEntity, Column } from "typeorm";

export abstract class CommonEntity extends BaseEntity{
    @Column({name: 'DEL_STATUS'})
    delStatus: string;

    @Column({name: 'CREATED_BY'})
    createdBy: number;

    @Column({name: 'MDFIED_BY'})
    mdifiedBy: number;

    @Column({name: 'CREATED_AT'})
    createdAt: Date;

    @Column({name: 'MDFIED_AT'})
    mdifiedAt: Date;
}