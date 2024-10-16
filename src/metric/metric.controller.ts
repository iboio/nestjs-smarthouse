import {Controller, Get, Post, Query} from "@nestjs/common";
import {Ctx, MessagePattern, MqttContext, Payload} from "@nestjs/microservices";
import {MetricService} from "./metric.service";

@Controller('/metric')
export class MetricController {
    constructor(private readonly metricService: MetricService) {
    }

    @MessagePattern('sensor_data')
    getNotifications(@Payload() data: string, @Ctx() context: MqttContext) {
        //console.log(`Topic: ${context.getTopic()}`);
        //console.log(`Message: ${JSON.stringify(data)}`);
    }

    @Get('/open')
    test() {
        this.metricService.testMqtt();
        return "siktir"
    }

    @Get('/close')
    close() {
        this.metricService.close();
        return "siktir"
    }

    @Post('/lampcontrol/')
    lampControl(
        @Query('userId') id: string,
        @Query('roomId') roomId: string,
        @Query('lampId') lampId: string,
        @Query('lampStatus') status: string
    ) {
        this.metricService.lampControl(id, roomId, lampId, status);

    }
}