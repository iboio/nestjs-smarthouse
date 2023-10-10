import {Inject, Injectable} from '@nestjs/common';
import {ClickHouseClient} from "@depyronick/nestjs-clickhouse";
import {Cron} from "@nestjs/schedule";

interface SensorData {
    room_id: number,
    type: string,
    value: number,
    name: string,
    createdAt: Date,
}


@Injectable()
export class ClickhouseService {
    constructor(
        @Inject('iboio')
        private readonly iboio: ClickHouseClient
    ) {
    }

    async getSensorData(roomId): Promise<any> {
        const sensorDataQuery = `SELECT DISTINCT ON (type) *
                                 FROM iboio.sensorData
                                 WHERE room_id = ${roomId}
                                 ORDER BY createdAt DESC`

        return await this.iboio.queryPromise<SensorData>(sensorDataQuery);
    }


    async getSensorDataByType(roomId, type): Promise<any> {
        const query = `SELECT value, createdAt
                       FROM iboio.sensorData
                       WHERE room_id = ${roomId}
                         AND type = '${type}'
                         and now() - toIntervalSecond(30) < createdAt
                       ORDER BY createAt`
        const returnData = {
            value: [],
            labels: []
        }
        const data = await this.iboio.queryPromise<SensorData>(query);
        if (typeof data !== "string") {
            data.map((data) => {
                returnData.value.push(data.value)
                returnData.labels.push(data.createdAt)
            })
        }
        return returnData
    }

    async GetRoomCardSensorData(roomId, sensors) {
        const query2 = `
            SELECT DISTINCT ON (type) *
            FROM iboio.sensorData
            where type in (${sensors.map((sensor) => `'${sensor}'`)})
              and room_id = ${roomId}
            order by createdAt desc
        `
        return this.iboio.queryPromise(query2)
    }

    async GetRoomData(roomIds: number[]) {
        const query2 = `
            SELECT DISTINCT ON (type,room_id) *
            FROM iboio.sensorData
            where room_id IN (${roomIds})
            order by createdAt desc
        `
        return this.iboio.queryPromise(query2)
    }
}