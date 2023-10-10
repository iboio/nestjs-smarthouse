import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseModule} from "./database/database.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {User} from "./database/entities/user";
import {Room} from "./database/entities/room";
import {RoomConfig} from "./database/entities/room-config";
import {SensorData} from "./database/entities/sensor-data";
import {ClickHouseModule} from "@depyronick/nestjs-clickhouse";
import {ClickModule} from "./database/clickHouse/clickhouse.module";
import {ScheduleModule} from "@nestjs/schedule";
import {SensorConfig} from "./database/entities/sensor-config";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '10121990',
            database: 'smarthouse',
            entities: [User, Room, RoomConfig, SensorData, SensorConfig],
        }),
        ScheduleModule.forRoot(),
        DatabaseModule,
        AuthenticationModule,
        ClickModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
