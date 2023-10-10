import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('sensor_config')
export class SensorConfig {
    @PrimaryColumn()
    id: number;

    @Column()
    room_id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
