import {Module} from "@nestjs/common";
import {MetricService} from "./metric.service";
import {MetricController} from "./metric.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
   imports: [ClientsModule.register([
      {
         name: 'MQTT_SERVICE',
         transport: Transport.MQTT,
         options: {
            url: 'mqtt://localhost:1883',
         },
      },
   ])],
   providers: [MetricService],
   controllers: [MetricController]
})
export class MetricModule {}