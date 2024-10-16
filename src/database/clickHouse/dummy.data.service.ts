import {Inject, Injectable} from "@nestjs/common";
import {ClickHouseClient} from "@depyronick/nestjs-clickhouse";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class DummyDataService {
    constructor(
        @Inject('iboio')
        private readonly iboio: ClickHouseClient
    ) {
    }

    async SensorDataGenerator(specificRoom: boolean, roomId, SpecificSensor: boolean, sensor: string[] | string, min, max, time, queryTimeType, instant: boolean, number) {
        let stringSensor = sensor.toString()
        let query = `
            INSERT INTO iboio.sensorData (room_id, type, value, createdAt)
            SELECT CASE
                       WHEN ${specificRoom} = true THEN ${roomId}
                       WHEN ${specificRoom} = false THEN 1 + rand() % ${roomId}
                       END                        as roomId,

                   CASE
                       WHEN ${SpecificSensor} = true
                           THEN '${sensor}'
                       WHEN ${SpecificSensor} = false
                           THEN splitByChar(',', '${stringSensor}')[1 + rand() % ${sensor.length}]
                       END                        as type,

                   ${min} + rand() % ${max - min} as value,
                   CASE
                       WHEN '${queryTimeType}' = 'second'
                           THEN now() - toIntervalSecond(rand() %
                                                         ${time + 1})
                       WHEN '${queryTimeType}' = 'hour' THEN now() - toIntervalSecond(rand() % ${time} * 60 * 60)
                       WHEN '${queryTimeType}' = 'day' THEN now() - toIntervalSecond(rand() % ${time} * 60 * 60 * 24)
                       WHEN '${queryTimeType}' = 'week'
                           THEN now() - toIntervalSecond(rand() % ${time} * 60 * 60 * 24 * 7)
                       WHEN '${queryTimeType}' = 'month'
                           THEN now() - toIntervalSecond(rand() % ${time} * 60 * 60 * 24 * 30)
                       WHEN '${queryTimeType}' = 'year'
                           THEN now() - toIntervalSecond(rand() % ${time} * 60 * 60 * 24 * 365)
                       END
                                                  as createAt
        `;
        if (instant) {
            query += `FROM numbers(${number})`
        }
        await this.iboio.query(query).subscribe({
            error: (err) => console.log(err),
        })
    }


    @Cron('*/1 * * * * *')
    async DataGenerator() {
        const sensorArray1 = ['chemical', 'temperature', 'humidity', 'light', 'soil', 'water', 'air']
        await this.SensorDataGenerator(false, 1, false, sensorArray1, 0, 100, 1, 'second', true, 5)
        await this.SensorDataGenerator(false, 2, false, sensorArray1, 0, 100, 1, 'second', true, 5)
        await this.SensorDataGenerator(false, 5, false, sensorArray1, 0, 100, 1, 'second', true, 5)


        // if you want to generate data for specific room, set specificRoom to true and roomId
        // if you want to generate data for random room, set specificRoom to false and roomId to max room number
        // if you want to generate data for specific sensor, set sensor to sensor name
        // if you want to generate data for random sensor, SpecificSensor set false and set sensor to sensor name array
        // if you want to continuity data, set instant to false and keep going coding
        // if you want to specific sensor, set SpecificSensor to true and sensor to sensor name
        // important: if you wanna continuity data, work on this function
    }

    @Cron('*/5 * * * * *')
    async InstantDataGenerator() {
        const sensorArray1 = ['chemical', 'temperature', 'humidity', 'light', 'soil', 'water', 'air']
        // if you want to generate data for specific room, set specificRoom to true and roomId
        // if you want to generate data for random room, set specificRoom to false and roomId to max room number
        // if you want to generate data for specific sensor, set sensor to sensor name
        // if you want to generate data for random sensor, SpecificSensor set false and set sensor to sensor name array
        // if you want to specific sensor, set SpecificSensor to true and sensor to sensor name
        // if you want to instant data, set instant to true and number to how many data you want to generate
        // important: if you wanna instant data, work on this function
    }
}