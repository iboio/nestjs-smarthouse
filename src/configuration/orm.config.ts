import {Injectable} from "@nestjs/common";

export class OrmConfig{
    static getOrmConfig()   {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '10121990',
            database: 'test',
            entities: [],
            synchronize: true,
        }
    }
}