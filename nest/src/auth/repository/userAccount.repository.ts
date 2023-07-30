import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserAccount } from "../entity/userAccount.entity";

@Injectable()
export class UserAccountRepository extends Repository<UserAccount>{
    constructor(dataSource: DataSource){
        super(UserAccount, dataSource.createEntityManager())
    }
}