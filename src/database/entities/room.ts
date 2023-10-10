import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./user";
import {RoomConfig} from "./room-config";
import {SensorData} from "./sensor-data";

@Entity('room')

export class Room {
    @Column()
    user_id: number;

    @PrimaryColumn()
    room_id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column("simple-array",{array: true})
    sensors: string[];

    @ManyToOne(type => User, user => user.room)
    @JoinColumn([
        {name: "user_id", referencedColumnName: "id"},
    ])
    user: User;

    @OneToMany(type => RoomConfig, roomConfig => roomConfig.room)
    @JoinColumn([
        { name: "room_id", referencedColumnName: "room_id" },
    ])
    roomConfig: RoomConfig[];


    @OneToMany(type => SensorData, sensorData => sensorData.room)
    @JoinColumn([
        { name: "room_id", referencedColumnName: "room_id" },
    ])
    sensorData: SensorData[];
}