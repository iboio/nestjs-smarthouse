import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test3')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return 'Hello World!!!'
  }
  @Post('/temp')
  temp(@Body() data: any): string {
    console.log("temp:",data)
    return 'Hello World temp'
  }
  @Post('/hum')
  hum(@Body() data: any): string {
    console.log("hum:",data)
    return 'Hello World hum'
  }
}
