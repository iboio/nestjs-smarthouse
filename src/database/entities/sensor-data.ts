import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import {Room} from "./room";
import {distinct} from "rxjs";
@Entity('sensor_data')

export class SensorData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    createdAt: Date;

    @ManyToOne(type => Room, room => room.sensorData)
    @JoinColumn([
        {name: "room_id", referencedColumnName: "room_id"},
    ])
    room: Room;
}