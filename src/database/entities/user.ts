import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {Room} from "./room";
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    blocked: boolean;

    @Column()
    userRole: string;

    @OneToMany(type => Room, room => room.user)
    @JoinColumn([
        { name: "id", referencedColumnName: "user_id" },
    ])
    room: Room[];
}
