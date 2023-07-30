import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserAccountToken } from "../entity/userAccountToken.entity";

@Injectable()
export class UserAccountTokenRepository extends Repository<UserAccountToken>{
    constructor(dataSource: DataSource){
        super(UserAccountToken, dataSource.createEntityManager())
    }
}