import {Module} from "@nestjs/common";
import {DatabaseController} from "./database.controller";
import {DatabaseService} from "./database.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user";
import {RoomConfig} from "./entities/room-config";
import {Room} from "./entities/room";
import {SensorData} from "./entities/sensor-data";
import {ClickModule} from "./clickHouse/clickhouse.module";
import {SensorConfig} from "./entities/sensor-config";

@Module({
    imports: [TypeOrmModule.forFeature([User, RoomConfig, Room, SensorData, SensorConfig]), ClickModule],
    controllers: [DatabaseController],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {}