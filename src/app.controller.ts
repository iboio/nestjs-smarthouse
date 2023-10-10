import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test3')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }
}