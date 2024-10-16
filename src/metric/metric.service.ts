import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy, Ctx, MessagePattern, MqttContext, Payload} from "@nestjs/microservices";

@Injectable()
export class MetricService {
    constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {
    }

    testMqtt() {
        this.client.emit('houseJob/1000000/1', '1');
    }
    close(){
        this.client.emit('houseJob/1000000/1', '0');
    }
    lampControl(id: string, roomId: string, lampId: string, status: string) {
        console.log(typeof status)
        this.client.emit(`houseJob/${id}/${roomId}`, `${lampId},${status == "true" ? 1 : 0}`);
    }
}
