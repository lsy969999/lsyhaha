import { BaseEntity, Column } from "typeorm";

export enum DelStatus{
    N = 'N',
    Y = 'Y'
}

export abstract class CommonEntity extends BaseEntity{
    @Column({name: 'DEL_STATUS', default: DelStatus.N})
    delStatus: DelStatus;

    @Column({name: 'CREATED_BY'})
    createdBy: number;

    @Column({name: 'UPDATED_BY'})
    updatedBy: number;

    @Column({name: 'CREATED_AT'})
    createdAt: Date;

    @Column({name: 'UPDATED_AT'})
    updatedAt: Date;
}