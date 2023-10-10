import {Controller, Get, Param} from "@nestjs/common";
import {DatabaseService} from "./database.service";
import {Room} from "./entities/room";
import {SensorData} from "./entities/sensor-data";
import * as timers from "timers";

@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService,) {
    }

    @Get('/test/test1')
    async test(): Promise<SensorData> {
        return this.databaseService.sensorData(1, 'chemical')
    }

    @Get('/:id')
    async allRoomData(@Param('id') userId): Promise<Room[]> {
        return await this.databaseService.allRoomData(userId)
    }

    @Get('/:id/:roomId')
    async roomData(@Param('id') userId, @Param('roomId') roomId): Promise<any> {
        //return await this.databaseService.roomData(userId, roomId)
        return await this.databaseService.sensorClickhouse(userId, roomId)
    }

    @Get('/:id/:roomId/:sensor')
    sensorData(@Param('roomId') roomId, @Param('sensor') sensor): Promise<any> {
        //return null
        return this.databaseService.sensorDataByType(roomId, sensor)
    }
}

console.log('database.controller.ts')