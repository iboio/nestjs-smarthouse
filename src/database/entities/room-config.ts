import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import { Room } from "./room";
@Entity('room_config')

export class RoomConfig {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_id: number;

    @Column()
    name : string;

    @Column("simple-array",{array: true})
    value: string[];

    @ManyToOne(type => Room, room => room.roomConfig)
    @JoinColumn([
        { name: "room_id", referencedColumnName: "room_id" },
    ])
    room: Room;
}