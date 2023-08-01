import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum DelStatus{
    N = 'N',
    Y = 'Y'
}

export abstract class CommonEntity extends BaseEntity{
    @Column({name: 'DEL_STATUS', default: DelStatus.N})
    delStatus: DelStatus;

    @Column({name: 'CREATED_BY', nullable: true})
    createdBy: number;

    @Column({name: 'UPDATED_BY', nullable: true})
    updatedBy: number;

    @CreateDateColumn({name: 'CREATED_AT', type: 'timestamp', default: 'now()'})
    createdAt: Date;

    @UpdateDateColumn({name: 'UPDATED_AT', type: 'timestamp', default: 'now()'})
    updatedAt: Date;
}