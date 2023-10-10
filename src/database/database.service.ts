import {Injectable} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, In, Repository} from 'typeorm';
import {User} from "./entities/user";
import {Room} from "./entities/room";
import {NewUserDto} from "./dto/new.user.dto";
import {LoginUser} from "./dto/login.user";
import {SensorData} from "./entities/sensor-data";
import {ClickhouseService} from "./clickHouse/clickhouse.service";
import {SensorConfig} from "./entities/sensor-config";
import {RoomConfig} from "./entities/room-config";
import {filter} from "rxjs";

@Injectable()

export class DatabaseService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(SensorData)
        private readonly sensorDataRepository: Repository<SensorData>,
        @InjectRepository(SensorConfig)
        private readonly sensorConfigRepository: Repository<SensorConfig>,
        @InjectRepository(RoomConfig)
        private readonly roomConfigRepository: Repository<RoomConfig>,
        private readonly clickhouseService: ClickhouseService
    ) {
    }

    getAllPosts() {
        return this.userRepository.find({relations: ['id']});
    }

    findAll(): Promise<Room[]> {
        return this.dataSource.getRepository(Room).createQueryBuilder('room').leftJoinAndSelect('room.roomConfig', 'test').getMany();

    }

    test(): Promise<Room[]> {
        return this.roomRepository.find({relations: ['roomConfig']});
    }

    newUser(user: NewUserDto): Promise<User> {
        const newUser = new User();
        newUser.email = user.email;
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.password = user.password;
        return this.userRepository.save(newUser);
    }

    async loginUser(user: LoginUser): Promise<User> {
        const existsUser = await this.userRepository.findOne({where: {email: user.email, password: user.password}});

        if (!existsUser) {
            return null;
        }
        return existsUser;
    }

    async userData(user: LoginUser): Promise<User> {
        return this.userRepository.findOne({where: {email: user.email}, relations: ['room', 'room.roomConfig']})
    }

    async allRoomData(userId): Promise<any> {
        const rooms = await this.roomRepository.find({
            relations: {roomConfig: true},
            where: {user_id: userId},
            select: {
                room_id: true, name: true, type: true, roomConfig: {
                    name: true,
                    value: true,
                }
            },
        })

        const sensorData = await this.clickhouseService.GetRoomData(rooms.map((room) => room.room_id))
        const sensorConfig = await this.sensorConfigRepository.find({where: {room_id: In(rooms.map((room) => room.room_id))},})
        return {
            rooms: rooms,
            sensorData: sensorData,
            sensorConfig: sensorConfig
        };
    }

    async roomData(userId, roomId): Promise<any> {
        const b = await this.roomRepository.createQueryBuilder('room')
            .setFindOptions({relations: ['roomConfig']})
            .where('room.user_id = :userId', {userId: userId})
            .andWhere('room.room_id = :roomId', {roomId: roomId}).getOne()

        const c = await this.sensorDataRepository.createQueryBuilder('sensorData')
            .where('sensorData.room_id = :roomId', {roomId: roomId})
            .setFindOptions({select: ['type', 'name', 'value', 'createdAt']})
            .orderBy('sensorData.createdAt', 'DESC')
            .getMany()
        console.log(b, c)
        return []
    }

    async sensorData(roomId, sensorName): Promise<SensorData> {
        return await this.sensorDataRepository.findOne({
            where: {room_id: roomId, name: sensorName},
            relations: ['sensorData'],
            select: ['name', 'value'],
            order: {createdAt: 'DESC'},
        })
    }

    async sensorDataMultiple(roomId: number, sensorNames: string[]): Promise<SensorData[]> {
        return await this.sensorDataRepository.find({
            where: {room_id: roomId, name: In(sensorNames)},
            select: ['name', 'value']
        })
    }

    async sensorClickhouse(userId, roomId): Promise<any> {
        const room = await this.roomRepository.createQueryBuilder('room')
            .setFindOptions({relations: ['roomConfig']})
            .where('room.user_id = :userId', {userId: userId})
            .andWhere('room.room_id = :roomId', {roomId: roomId}).getOne()
        const sensorData = await this.clickhouseService.getSensorData(roomId)
        const sensorConfig = await this.sensorConfigRepository.find({where: {room_id: roomId},})
        const data = []
        const mappedSensorConfigs = sensorConfig.map((configData) => {
            let result = sensorData.filter((sensorData) => sensorData.type === configData.type)
            if (result.length > 0) {
                result = result[0]
            } else {
                result = {}
            }

            return {
                ...configData,
                sensorData: result
            }
        })
        return [room, mappedSensorConfigs]
    }

    sensorDataByType(roomId, type): Promise<any> {
        return this.clickhouseService.getSensorDataByType(roomId, type)
    }
}