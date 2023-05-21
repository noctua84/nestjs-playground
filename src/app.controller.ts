import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sentry-test')
  getSentryTest(): string {
    if (process.env.NODE_ENV === 'development') {
      throw new InternalServerErrorException('Sentry test error');
    }

    return 'Sentry test endpoint is only available in development mode';
  }
}
