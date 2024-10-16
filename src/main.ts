import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  const mqttService = app.connectMicroservice({
    name: 'MQTT_SERVICE',
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

}
bootstrap();
