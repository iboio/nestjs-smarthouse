import {Module} from "@nestjs/common";
import {ClickhouseController} from "./clickhouse.controller";
import {ClickhouseService} from "./clickhouse.service";
import {ClickHouseClient, ClickHouseConnectionProtocol, ClickHouseModule} from "@depyronick/nestjs-clickhouse";
import {ScheduleModule} from "@nestjs/schedule";
import {DummyDataService} from "./dummy.data.service";
@Module({
    imports: [
        ClickHouseModule.register([{
        host: 'nas1.local',
        port: 8123,
        name:'iboio',
        database: 'iboio',
    }])],
    providers: [ClickhouseService,DummyDataService],
    controllers: [ClickhouseController],
    exports: [ClickhouseService]
})
export class ClickModule {}