import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'

const dbConfig = config.get('db')

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDSPORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DATABASE || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: true,
}