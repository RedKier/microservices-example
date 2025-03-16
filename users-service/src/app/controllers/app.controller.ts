import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHealth();
  }
}
